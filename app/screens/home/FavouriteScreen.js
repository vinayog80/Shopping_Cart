import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ImageBackground, Image, StyleSheet, RefreshControl, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, SHADOWS, images } from '../../constants';

export const FavouriteScreen = ({ route, navigation }) => {
    const [basket, setBasket] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { selectedFavourite } = route.params;

    useEffect(() => {
        handleRetriveAddedFavourite();
    }, [])

    const handleRetriveAddedFavourite = async () => {
        const value = JSON.parse(await AsyncStorage.getItem('@favProduct'));
        setBasket(value);
    }

    const handleRefreshControl = async () => {
        setIsRefreshing(true);
        try {
            let value = JSON.parse(await AsyncStorage.getItem('@favProduct'))
            if (value !== null)
                setTimeout(() => {
                    setBasket(value);
                    setIsRefreshing(false);
                }, 1000)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteProduct = async (itemId) => {
        JSON.parse(await AsyncStorage.getItem('@favProduct'))
        let temp = [...basket];
        const index = temp.find((item) => item.id === itemId);
        if (index) temp.splice(index, 1)
        setBasket(temp);
        await AsyncStorage.setItem('@favProduct', JSON.stringify(temp))
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.lightGray }}>
            <TouchableOpacity
                activeOpacity={.8}
                style={{ alignSelf: 'flex-start', marginBottom: 10 }}
                onPress={() => navigation.goBack()}
            >
                <ImageBackground
                    source={images.ellipse}
                    style={{ width: 52, height: 52, alignItems: 'center', justifyContent: 'center', ...SHADOWS.dark }}>
                    <Image source={images.leftChevron} />
                </ImageBackground>
            </TouchableOpacity>
            <View style={{ alignSelf: 'center', marginTop: 10 }}>
                {basket.length <= 0 ? (<View style={{ alignSelf: 'center' }}><Text style={{ textAlign: 'center', color: COLORS.black, fontWeight: 'bold', fontSize: 16 }}>you havent added any <Image source={images.heartFilled} style={{ width: 35, height: 25 }} resizeMode='contain' /> yet!</Text>
                    <TouchableOpacity activeOpacity={.8} style={{ alignSelf: 'center', marginTop: 20, width: 200, height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 7, backgroundColor: COLORS.primary }} onPress={() => navigation.navigate('HomeScreen')}>
                        <Text style={{ color: COLORS.white, fontWeight: '600', }}>{'Go to Products'}</Text>
                    </TouchableOpacity>
                </View>) :
                    (<ScrollView
                        decelerationRate={5}
                        contentContainerStyle={{ paddingBottom: 100 }}
                        showsVerticalScrollIndicator={false}
                        horizontal={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={isRefreshing}
                                onRefresh={() => handleRefreshControl()}
                            />}>
                        {basket.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    activeOpacity={.9}
                                    key={index}>
                                    <View
                                        style={{
                                            borderRadius: 15,
                                            width: 360,
                                            height: 140,
                                            backgroundColor: "#fff", elevation: 3,
                                            marginBottom: 21,
                                            borderColor: "#FFF3E5",
                                            borderWidth: 1.1,
                                            ...SHADOWS.dark,
                                            paddingHorizontal: 15,
                                            paddingBottom: 20,
                                            paddingTop: 10,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <View>
                                                <Image source={{ uri: item.image }} style={{ width: 60, height: 60, marginBottom: 5 }} resizeMode='contain' />
                                            </View>
                                            {/* product title */}
                                            <View>
                                                <Text style={{ color: COLORS.black, fontSize: 14, fontWeight: '600', }}>{item.title.slice(0, 25)}</Text>
                                            </View>
                                        </View>

                                        <View>
                                            <Image source={images.heartFilled} style={{ width: 30, height: 25, marginTop: 5 }} resizeMode='contain' />
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 14, color: COLORS.black, fontWeight: '700', marginTop: 10 }}>{`$ ` + item.price}</Text>
                                        </View>


                                        <TouchableOpacity onPress={() => handleDeleteProduct(item.id)}>
                                            <Image source={images.closeIcon} style={{ width: 35, height: 35 }} resizeMode='contain' />
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>)}
            </View>

        </View >
    )
}



const styles = StyleSheet.create({
    itemQTYContainer: {
        marginTop: 4,
        flexDirection: 'row',
        borderRadius: 5,
        width: 109,
        backgroundColor: "#FFE5E5",
        height: 38,
        justifyContent: "center",
        shadowColor: '#FFE5E5',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 15,
    },
    removeQTYSTYLE: {
        width: 10,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 5
    },
    addQTYSTYLE: {
        alignItems: "center",
        justifyContent: "center"
    },
});
