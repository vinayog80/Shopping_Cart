import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ImageBackground, Image, StyleSheet, RefreshControl, ScrollView, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, SHADOWS, images } from '../../constants';
import { useNavigation } from '@react-navigation/native';

const EmptyCartComponent = ({ navigation }) => {
    return (
        <View style={{ alignSelf: 'center' }}>
            <Text style={{ textAlign: 'center', color: COLORS.black, fontWeight: 'bold', fontSize: 16 }}>your cart is Empty!</Text>
            <TouchableOpacity onPress={navigation} activeOpacity={.8} style={{ alignSelf: 'center', marginTop: 20, width: 200, height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 7, backgroundColor: COLORS.primary }}>
                <Text style={{ color: COLORS.white, fontWeight: '600', }}>{'Add Products'}</Text>
            </TouchableOpacity>
        </View>
    )
}

export const CartScreen = () => {
    const [basket, setBasket] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [total, setTotal] = useState(0);
    const [singleProductPrice, setSingleProductPrice] = useState(0);
    const navigation = useNavigation();

    useEffect(() => {
        handleRetriveAddedProduct();
        totalAmount();
    }, [])

    const handleRetriveAddedProduct = async () => {
        const value = JSON.parse(await AsyncStorage.getItem('@product'));
        setBasket(value);
    }

    const handleRefreshControl = async () => {
        setIsRefreshing(true);
        try {
            let value = JSON.parse(await AsyncStorage.getItem('@product'))
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
        JSON.parse(await AsyncStorage.getItem('@product'))
        let temp = [...basket];
        const index = temp.find((item) => item.id === itemId);
        if (index) temp.splice(index, 1)
        setBasket(temp);
        await AsyncStorage.setItem('@product', JSON.stringify(temp))
    }

    const incrementQty = async (id) => {
        let addQty = basket.map((item) => (item.id == id) ? { ...item, qty: item.qty + 1 } : item);
        let updatedSingleProductPrice = basket.reduce((acc, item) => acc + item.price * item.qty, 0);
        let updateTotalProductPrice = basket.reduce((acc, item) => acc + item.price * item.qty, 0);
        setTotal(updateTotalProductPrice);
        setSingleProductPrice(updatedSingleProductPrice);
        setBasket(addQty);
    }

    const decrementQty = async (id) => {
        let tempDecQty = basket.map((item) => item.id == id ? { ...item, qty: item.qty - 1 } : item);
        let updatedSingleProductPrice = basket.reduce((acc, item) => acc + item.price * item.qty, 0);
        let updateTotalProductPrice = basket.reduce((acc, item) => acc + item.price * item.qty, 0)
        setTotal(updateTotalProductPrice);
        setSingleProductPrice(updatedSingleProductPrice);
        setBasket(tempDecQty);
    }

    const totalAmount = async () => {
        const value = JSON.parse(await AsyncStorage.getItem('@product'))
        const total = value.map(data => data.price * data.qty).reduce((a, b) => a + b, 0)
        console.log('total', total)
        setTotal(total);
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
                {basket.length <= 0 ? (<EmptyCartComponent navigation={() => navigation.navigate('HomeScreen')} />) :
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
                                            height: 160,
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
                                                <Text style={{ color: COLORS.black, fontSize: 14, fontWeight: '600', marginBottom: 5 }}>{item.title.slice(0, 25)}</Text>
                                            </View>
                                            {/* qty */}

                                            <View style={styles.itemQTYContainer}>
                                                <TouchableOpacity
                                                    onPress={() => decrementQty(item.id)}
                                                    disabled={item.qty == 1 ? true : false}
                                                    style={styles.removeQTYSTYLE}
                                                >
                                                    <Image
                                                        style={{ width: 20, height: 20, }}
                                                        source={item.qty == 1 && item.qty >= 1 ? images.disabledDecIMG : images.removeQTYIMG}
                                                        resizeMode="contain"
                                                    />
                                                </TouchableOpacity>
                                                <View style={{ width: 1, height: 45, backgroundColor: "#000", opacity: 0.08 }} />
                                                <View style={{ width: 50, alignItems: "center", justifyContent: "center" }} >
                                                    <Text style={{ textAlign: "center" }}>{item.qty}</Text>
                                                </View>
                                                <View style={{ width: 1, height: 45, backgroundColor: "#000", opacity: 0.08 }} />
                                                <TouchableOpacity onPress={() => incrementQty(item.id)} style={styles.addQTYSTYLE}>
                                                    <Image source={images.addQTYIMG} style={{ width: 20, height: 20, }} resizeMode="contain" />
                                                </TouchableOpacity>
                                            </View>

                                        </View>

                                        <View>
                                            <Text style={{ fontSize: 14, color: COLORS.black, fontWeight: '700' }}>{`$ ` + item.price * item.qty.toFixed(2)}</Text>
                                        </View>

                                        <TouchableOpacity onPress={() => handleDeleteProduct(item.id)}>
                                            <Image source={images.closeIcon} style={{ width: 35, height: 35 }} resizeMode='contain' />
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                        {basket.length && (
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ color: COLORS.dark, fontWeight: '600' }}>
                                    Price Details ({basket.length == 1 ? `${basket.length} item` : `${basket.length} items`})
                                </Text>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                    <View>
                                        <Text style={{ fontSize: 15, color: COLORS.black, fontWeight: '600' }}>Total Amount : </Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontWeight: 'bold', color: COLORS.dark, fontSize: 16 }}>$ {total.toFixed(0)}</Text>
                                    </View>
                                </View>
                            </View>)}
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
