import React from "react";
import { Image, Text, View } from "react-native";
import { COLORS, images } from "../constants/index";

export const errorComponent = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image
                source={images.error}
                style={{ width: 120, height: 120 }}
                resizeMode='contain'
            />
            <Text style={{ color: COLORS.black, fontSize: 16 }}>Oops! please try again.</Text>
        </View>
    )
}


export const warningComponent = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image
                source={images.warning}
                style={{ width: 120, height: 120 }}
                resizeMode='contain'
            />
            <Text style={{ color: COLORS.black, fontSize: 16 }}>Oops! warning</Text>
        </View>
    )
}

