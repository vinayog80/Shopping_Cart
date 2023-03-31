import React from 'react'
import { SafeAreaView, Text, StyleSheet, View, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native'
import { COLORS, SHADOWS, images } from '../../constants';

export default function ProductDetails({ route, navigation }) {
    const { data, handleAddToCart } = route.params;
    return (
        <SafeAreaView style={{ flex: 1, height: '100%' }}>
            <ScrollView showsHorizontalScrollIndicator={false}>
                <View style={styles.mainContent}>
                    <TouchableOpacity
                        activeOpacity={.8}
                        style={{ alignSelf: 'flex-start', marginBottom: 10 }}
                        onPress={() => navigation.goBack()}
                    >
                        <ImageBackground
                            source={images.ellipse}
                            style={{ width: 52, height: 52, alignItems: 'center', borderRadius: 50, justifyContent: 'center', backgroundColor: COLORS.white, ...SHADOWS.dark }}>
                            <Image source={images.leftChevron} />
                        </ImageBackground>
                    </TouchableOpacity>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.productImage}
                            source={{ uri: data.image }}
                        />
                    </View>

                    <View style={styles.titleSection}>
                        <Text style={[styles.heading]}>
                            {data.title}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: "column" }}>
                            <Text style={{
                                fontWeight: '600',
                                fontSize: 18,
                                lineHeight: 40,
                                color: "#161A1D",
                            }}>Quantity</Text>
                            <View style={{
                                flexDirection: 'row',
                                borderRadius: 5,
                                width: 156,
                                backgroundColor: "#fff",
                                height: 45,
                                justifyContent: "center",
                                shadowColor: '#FFE5E5',
                                shadowOffset: { width: 2, height: 2 },
                                shadowOpacity: 15,
                                shadowRadius: 2,
                            }}>
                                <TouchableOpacity style={{ width: 30, alignItems: "center", justifyContent: "center" }} activeOpacity={.7}>
                                    <Image style={{ width: 25, height: 25, marginRight: 20 }} source={images.removeQTYIMG} resizeMode="contain" />
                                </TouchableOpacity>
                                <View style={{ width: 1, height: 45, backgroundColor: "#000", opacity: 0.08 }} />
                                <View style={{ width: 50, alignItems: "center", justifyContent: "center" }} >
                                    <Text style={{ textAlign: "center" }}>{0}</Text>
                                </View>
                                <View style={{ width: 1, height: 45, backgroundColor: "#000", opacity: 0.08 }} />
                                <TouchableOpacity style={{ alignItems: "center", justifyContent: "center" }} activeOpacity={.7}>
                                    <Image source={images.addQTYIMG} style={{ width: 25, height: 25, marginLeft: 20 }} resizeMode="contain" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ marginTop: 35 }}>
                            <TouchableOpacity
                                activeOpacity={.8}
                                style={{ alignSelf: 'flex-start', marginBottom: 10 }}
                            >
                                <ImageBackground
                                    source={images.ellipse}
                                    style={{ width: 52, height: 52, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={images.heart} />
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{ paddingHorizontal: 20 }}>
                    <Text style={[styles.heading, styles.price]}>$ {data.price}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
                    <Text style={{}}>(30 Reviews)</Text>
                </View>

                <Text style={styles.description}>
                    {data.description}
                </Text>
                <Text style={{ paddingHorizontal: 20, marginTop: 20 }}>Category: {data.category}</Text>
                <TouchableOpacity onPress={handleAddToCart} style={styles.addToCartBtn}>
                    <Text
                        style={{
                            color: 'white',
                            textAlign: 'center',
                            fontWeight: 'bold',
                        }}>
                        Add To Cart
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    mainContent: { flex: 1, padding: 25, marginTop: 0 },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 350,
    },
    productImage: {
        width: '80%',
        height: '100%',
        resizeMode: 'cover',
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
    },
    review: {
        marginRight: 5,
    },
    titleSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
        alignItems: 'center',
    },
    description: {
        marginTop: 10,
        lineHeight: 20,
        paddingHorizontal: 20,
        fontWeight: '700',
        fontSize: 15
    },
    price: { color: 'green', marginBottom: 0 },
    backBtn: {
        width: 35,
        height: 35,
        backgroundColor: 'white',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        left: 15,
        top: 25,
        zIndex: 4,
    },
    addToCartBtn: {
        width: 260,
        height: 60,
        backgroundColor: COLORS.primary,
        borderRadius: 50,
        justifyContent: 'center',
        marginBottom: 100,
        marginTop: 30,
        ...SHADOWS.dark,
        alignSelf: 'center'
    },
});
