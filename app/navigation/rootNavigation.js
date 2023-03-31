import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProductDetails, Profile } from '../screens/home/index';
import Account from "../screens/account/Account";
import NotificationScreen from "../screens/Notification/NotificationScreen";
import { CartScreen } from "../screens/cart/CartScreen";
import TabBar from "./tabNavigation";
import { FavouriteScreen } from "../screens/home/FavouriteScreen";

const RootStack = createNativeStackNavigator();

export const RootNavigation = () => {
    return (
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{ headerShadowVisible: false, headerShown: false }}>
                <RootStack.Screen options={{ headerShown: false, gestureDirection: 'horizontal' }} name="HomeScreen" component={TabBar} />
                <RootStack.Screen options={{ headerShown: false, gestureDirection: 'horizontal' }} name="ProductDetails" component={ProductDetails} />
                <RootStack.Screen name="Profile" component={Profile} />
                <RootStack.Screen name="NotificationScreen" component={NotificationScreen} />
                <RootStack.Screen options={{ headerShown: false, gestureDirection: "horizontal" }} name="CartScreen" component={CartScreen} />
                <RootStack.Screen name="Account" component={Account} />
                <RootStack.Screen name="FavouriteScreen" component={FavouriteScreen} />
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

