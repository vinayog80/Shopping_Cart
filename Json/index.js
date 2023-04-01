import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View, TextInput, Image } from "react-native";
import { COLORS, SHADOWS, images } from "../app/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseURL = `http://10.0.2.2:3000/users`;

export const JsonServer = () => {
    const [db, setdb] = React.useState([]);
    const [userInput, setUserInput] = React.useState('');
    const [userDesignation, setUserDesignation] = React.useState('');
    const [postId, setPostId] = React.useState(0);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isAgentLoggedIn, setIsAgentLoggedIn] = React.useState(false);

    const renderAPI = async () => {
        try {
            let response = await fetch(baseURL);
            let data = await response.json();
            setdb(data);
        } catch (error) {
            console.log(error)
        }
    }

    const postUser = async () => {
        try {
            const JsonObJ = {
                "name": userInput,
                "designation": userDesignation
            }
            const response = await fetch(baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(JsonObJ)
            });
            const newData = await response.json()
            AsyncStorage.setItem('@name', userInput);
            setdb((db) => [...db, newData]);
            setUserInput('');
            setUserDesignation('')
        } catch (error) {
            console.log(error);
        }
    }
    const getUserNameFromAsyncStorage = async () => {
        const token = await AsyncStorage.getItem('@name');
        if (token) {
            console.log('retrived Token : ', token);
            setIsAgentLoggedIn(true);
        }
        else console.log('user not retirved');
    }
    const handleDelete = async (id) => {
        try {
            await fetch(baseURL + `${id}`, {
                method: 'DELETE',
            });
            const deletedUser = db.filter((item) => item.id != id);
            const removed = AsyncStorage.removeItem('@name');
            console.log('removed user from storage :', removed)
            setdb(deletedUser);
        } catch (error) {
            console.log(error);
        }
    }
    const handleEdit = (id, name, designation) => {
        setUserInput(name);
        setUserDesignation(designation);
        setPostId(id);
    }


    const updateUser = (postId, userInput, userDesignation) => {
        fetch(baseURL + `/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": userInput,
                "designation": userDesignation
            })
        }).then((response) => response.json()).then((data) => {
            renderAPI();
            setPostId(0);
            setUserInput('');
            setUserDesignation('')
        }).catch((error) => console.log(error));
    }

    // search functionality with api
    const handleSearchQuery = async (event) => {
        const response = await fetch(`http://10.0.2.2:3000/users?q=${event}`);
        setSearchQuery(event)
        const data = await response.json();
        setdb(data);
    }

    React.useEffect(() => {
        renderAPI();
        getUserNameFromAsyncStorage();
    }, [])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text>pop</Text>

                <View>
                    <TouchableOpacity>
                        <TextInput placeholder="Search" style={{ width: 280, height: 40, borderWidth: 1, marginBottom: 20, marginTop: 5, borderRadius: 10 }} value={searchQuery} onChangeText={(event) => handleSearchQuery(event)} />
                    </TouchableOpacity>
                </View>

                <TextInput placeholder="enter name" style={{ width: 280, height: 40, borderWidth: 1, }} value={userInput} onChangeText={(event) => setUserInput(event)} />
                <TextInput placeholder="enter designation" style={{ width: 280, height: 40, marginTop: 10, borderWidth: 1, }} value={userDesignation} onChangeText={(event) => setUserDesignation(event)} />


                {
                    db.length ? db.map((item, index) => {
                        return (
                            <TouchableOpacity
                                style={{
                                    width: 300,
                                    marginBottom: 10,
                                    height: 50,
                                    backgroundColor: COLORS.green,
                                    alignItems: 'center',
                                    borderRadius: 10,
                                    ...SHADOWS.dark,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    paddingHorizontal: 10,
                                }} key={index}>
                                <Text style={{ marginLeft: 10, color: COLORS.white, fontWeight: 'bold', marginRight: 10 }}>{item.name}</Text>
                                <Text>{item.designation}</Text>
                                <TouchableOpacity onPress={() => handleEdit(item.id, item.name, item.designation)}>
                                    <Image source={images.radioBtn1} style={{ width: 25, height: 25 }} resizeMode="contain" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                    <Image source={images.closeIcon} style={{ width: 25, height: 25 }} resizeMode="contain" />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )
                    }) : []
                }
            </View>


            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
                {postId && userInput && userDesignation ? (<TouchableOpacity onPress={() => updateUser(postId, userInput, userDesignation)} style={{ backgroundColor: COLORS.emerald, width: 200, height: 45, alignItems: 'center', justifyContent: 'center', borderRadius: 8, }}>
                    <Text>UPDATE</Text>
                </TouchableOpacity>) : (<TouchableOpacity onPress={() => postUser()} style={{ backgroundColor: COLORS.emerald, width: 200, height: 45, alignItems: 'center', justifyContent: 'center', borderRadius: 8, }}>
                    <Text>POST</Text>
                </TouchableOpacity>)}
            </View>
        </SafeAreaView>
    )
}
