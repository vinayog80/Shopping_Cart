
//  RootStackScreen = () => (
//     <RootStack.Navigator
//       screenOptions={{
//         headerShown: false,
//         animationEnabled: false,
//       }}>
//       <RootStack.Screen name="Main" component={this.MainStackScreen} />
//       <RootStack.Screen
//         name="ProductView"
//         component={this.ProductStackScreen}
//       />
//       <RootStack.Screen name="Login" component={LoginScreen} />
//       <RootStack.Screen name="Register" component={RegisterScreen} />
//       <RootStack.Screen name="OTP" component={OTPScreen} />
//       <RootStack.Screen
//         name="ForgetPassword"
//         component={ForgotPasswordScreen}
//       />
//       <RootStack.Screen name="HomeScreen" children={this.createDrawer} />
//     </RootStack.Navigator>
//   );