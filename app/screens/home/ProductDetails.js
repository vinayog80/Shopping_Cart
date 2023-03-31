import React from 'react'
import { SafeAreaView, Text, StyleSheet, View, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native'
import { COLORS, SHADOWS, images } from '../../constants';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';

export default function ProductDetails({ route, navigation }) {
    const { data, handleAddToCart, handleAddToFavourite, selectedFavourite } = route.params;
    return (
        <SafeAreaView style={{ flex: 1, height: '100%' }}>
            <ScrollView showsHorizontalScrollIndicator={false}>
                <View style={styles.mainContent}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
                        <TouchableOpacity
                            onPress={() => handleAddToFavourite(data)}
                            activeOpacity={.8}
                            style={{ marginTop: 10 }}
                        >
                            <AntDesign
                                name={selectedFavourite ? 'heart' : 'hearto'}
                                size={25} color={selectedFavourite ? 'red' : 'black'}
                            />
                        </TouchableOpacity>
                    </View>
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
                <TouchableOpacity onPress={() => handleAddToCart(data)} style={styles.addToCartBtn}>
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
