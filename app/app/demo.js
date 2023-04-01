import React, { useState, useEffect } from "react";
import { Dimensions, SafeAreaView, View, Image, ActivityIndicator, TextInput, Alert, Text, Button, ScrollView, Modal, TouchableOpacity } from "react-native";

const { width } = Dimensions.get('window')

const CONFIG = `https://jsonplaceholder.typicode.com/users`;
const BINICON = require('../src/assets/images/cartScreen/delete.png');
const UPDATEICON = require('../src/assets/images/cartScreen/updateICON.png');

export const JobSearch = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [data, setData] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [postId, setPostId] = useState(0);
    const [loading, setloading] = useState(false);

    const fetchUsers = async () => {
        setloading(true)
        try {
            if (name && email == '') {
                Alert.alert("fill the inpus")
            }
            else {
                const response = await fetch(CONFIG);
                const data = await response.json();
                setData(data);
                console.log(data)
                setloading(false)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);


    const handlePostUsers = async () => {
        try {
            if (name && email == '') {
                Alert.alert('please fill')
            }
            else {
                const response = await fetch(CONFIG, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "name": name,
                        "email": email
                    })
                })
                let newAddedData = await response.json();
                if (response.ok) {
                    setData((data) => [...data, newAddedData]);
                    setIsVisible(false);
                    setName('')
                    setEmail('')
                }
                else {
                    Alert.alert('failed to post the users')
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleDelete = async (id) => {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/users${id}`, {
                method: 'DELETE',
            });
            const deletedUser = data.filter((item) => item.id != id);
            setData(deletedUser);
        } catch (error) {
            console.log(error);
        }
    }

    const handleEditUser = async (postId, name, email) => {
        fetch(CONFIG + `/${postId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                "name": name,
                "email": email,
            })
        }).then((response) => response.json())
            .then((resJSON) => {
                console.log('updated', resJSON);
                fetchUsers();
                setPostId(0);
                setName('')
                setEmail('')
                setIsVisible(false);
            }).catch(e => { console.log(e) })
    }

    const handleOpenPostModel = () => setIsVisible(!isVisible)

    const handleCloseModal = () => setIsVisible(false);

    const handleOpenEditPopUp = (id, name, email) => {
        setIsVisible(true);
        setPostId(id);
        setName(name);
        setEmail(email);
    }

    if (loading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: "center" }}>
                <ActivityIndicator size={25} color={"#000"} />
            </View>
        )
    }

    return (
        <SafeAreaView style={{ width: width }}>
            <View style={{ flexDirection: 'row', alignSelf: "center", marginTop: 50 }}>

                <Button title="add user" onPress={() => handleOpenPostModel()} />
            </View>
            <ScrollView
                contentContainerStyle={{ paddingBottom: 20, flexGrow: 1, height: Dimensions.get('screen').height + 500 }}
                showsVerticalScrollIndicator={false}
                style={{ marginTop: 20, alignSelf: 'center' }}
            >
                {
                    data.map((item, index) => (
                        <View key={index} style={{ width: 300, height: 70, borderRadius: 10, flexDirection: 'row', backgroundColor: "orange", marginBottom: 20 }}>
                            <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: 15, marginRight: 10 }}>
                                <Text style={{ marginRight: 20, fontSize: 14, color: "#000", fontWeight: '600' }}>{item.name}</Text>
                                <Text style={{ fontSize: 14, color: "#000", fontWeight: '600', textAlign: 'center' }}>{item.email}</Text>
                            </View>
                            <View style={{ marginTop: 20, flexDirection: 'row' }}>
                                <TouchableOpacity style={{ marginRight: 10 }} activeOpacity={.7} onPress={() => handleOpenEditPopUp(item.id, item.name, item.email)}>
                                    <Image source={UPDATEICON} style={{ width: 35, height: 35 }} resizeMode='contain' />
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={.7} onPress={() => handleDelete(item.id)}>
                                    <Image source={BINICON} style={{ width: 35, height: 35 }} resizeMode='contain' />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                }
            </ScrollView>

            <Modal
                visible={isVisible}
                animationType="slide"
                transparent={true}
            >
                <View style={{ width: '100%', height: Dimensions.get('window').height, backgroundColor: "rgba(0,0,0,0.4)" }}>
                    <View style={{ width: '100%', height: '70%', borderTopLeftRadius: 15, borderTopRightRadius: 15, alignItems: "center", backgroundColor: "#fff", position: 'absolute', bottom: -50, left: 0, right: 0 }}>
                        <TouchableOpacity
                            activeOpacity={.7}
                            style={{ marginTop: 10, width: 30 * 4, height: 48, borderRadius: 10, backgroundColor: '#4D47C3', alignSelf: "center", marginLeft: 20, alignItems: 'center', justifyContent: "center" }}
                            onPress={() => handleCloseModal()} >
                            <Text style={{ color: "#fff", fontWeight: '700', textAlign: 'center' }}>{'CLOSE'}</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: "column", marginVertical: '5%' }}>
                            <TextInput placeholder='Name' value={name} onChangeText={(event) => setName(event)} style={{ width: 300, borderBottomWidth: 1, borderColor: "#000" }} />
                            <TextInput placeholder='Email' value={email} onChangeText={(event) => setEmail(event)} style={{ width: 300, borderBottomWidth: 1, borderColor: "#000" }} />



                            {postId && name && email ? (<TouchableOpacity
                                activeOpacity={.7}
                                style={{ marginTop: 30, width: 30 * 5, height: 55, borderRadius: 10, backgroundColor: '#4D47C3', alignSelf: "center", marginLeft: 20, alignItems: 'center', justifyContent: "center" }}
                                onPress={() => handleEditUser(postId, name, email)} >
                                <Text style={{ color: "#fff", fontWeight: '700', textAlign: 'center' }}>{'UPDATE USER'}</Text>
                            </TouchableOpacity>) : (<TouchableOpacity
                                activeOpacity={.7}
                                style={{ marginTop: 30, width: 30 * 5, height: 55, borderRadius: 10, backgroundColor: '#4D47C3', alignSelf: "center", marginLeft: 20, alignItems: 'center', justifyContent: "center" }}
                                onPress={() => handlePostUsers()} >
                                <Text style={{ color: "#fff", fontWeight: '700', textAlign: 'center' }}>{'POST USER'}</Text>
                            </TouchableOpacity>)}
                        </View>
                    </View></View>
            </Modal>

        </SafeAreaView >
    )
}

