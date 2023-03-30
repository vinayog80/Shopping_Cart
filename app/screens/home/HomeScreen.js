import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, TouchableOpacity, LogBox, Image, TextInput, Text, Dimensions, ScrollView, ActivityIndicator, FlatList, Alert } from 'react-native'
import { images, SIZES, SHADOWS, COLORS } from '../../constants/index';
import { useShoppingCartSource, useModalSource } from '../../hook/index';
import { ConfigUrl } from '../../config';
import { errorComponent } from '../../config/helpers';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";

LogBox.ignoreLogs(['VirtualizedLists should never be nested'])

function RenderHeader({ navigation, cartlength }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        width: '100%',
        marginVertical: 10 * 2
      }}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={images.profile}
          style={{ width: 40, height: 40 }}
          resizeMode='contain'
        />
        <Text style={{ marginTop: 15, fontSize: 16, fontWeight: '700', color: COLORS.black, marginLeft: 8 }}>{'hi John Doe!'}</Text>
      </View>

      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity
          style={{
            height: 40,
            width: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={navigation}
        >
          <Image
            source={images.shopBag}
            style={{
              width: 35,
              height: 35,
            }}
            resizeMode='contain'
          />
          <Text style={{ fontSize: 15, color: "#000", fontWeight: "700" }}>{(cartlength)}</Text>
        </TouchableOpacity>
      </View>
    </View >
  )
}

function RenderSortModal({ isSortModal, setIsSortModal, handleSortModal, transparent }) {
  return (
    <>
      <Modal
        style={{ justifyContent: 'flex-end', margin: 0 }}
        isVisible={isSortModal}
        animationIn={'bounceInUp'}
        animationOut={'bounceOutDown'}
        transparent={transparent}
        onBackdropPress={() => setIsSortModal(false)}
      >
        <View style={{ width: '100%', height: '70%', backgroundColor: '#fff', borderRadius: 30 }}>
          <TouchableOpacity style={{ alignSelf: 'center' }} activeOpacity={.8} onPress={() => setIsSortModal(false)}>
            <Image source={images.closeIcon} style={{ width: 40, height: 40, marginTop: 10 }} resizeMode='contain' />
          </TouchableOpacity>
        </View>

      </Modal>
    </>
  )
}

export const HomeScreen = () => {
  const navigation = useNavigation();
  const { shopData, error, isLoading, setShopData } = useShoppingCartSource(ConfigUrl);
  const { isSortModal, setIsSortModal, handleSortModal } = useModalSource();
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([])
  const [cartlength, setCartlength] = useState([]);
  const [selected, setSelected] = useState(false);

  const lowToHighPrice = () => {
    const arr = shopData;
    for (let index = 1; index <= arr.length - 1; index++) {
      let io = arr[index];
      let j = index - 1;
      while (j >= 0 && arr[j].price > io.price) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = io;
    }
    console.log("low to hight price :", arr);
  }

  const handleClearQuery = () => {
    setSearchQuery('');
  }

  const handleSearchQuery = (event) => {
    let searchdb = shopData.filter((item) => {
      return item.title ? item.title.toLowerCase().includes(event.toLowerCase()) : errorComponent();
    });
    setShopData(searchdb);
    setSearchQuery(event);
  }

  const getCartFromAsync = async () => {
    try {
      let value = JSON.parse(await AsyncStorage.getItem('@product'));
      if (value != null) {
        setCartlength(value);
        setCart(value)
      }
      else return null;
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddToCart = (item) => {
    const check = cart.some(cartItem => cartItem.id == item.id);
    if (!check) {
      let temp = [...cart, { ...item, qty: 1 }];
      setCart(temp)
      let value = AsyncStorage.setItem('@product', JSON.stringify(temp));
      console.log('saved', value);
      console.log('item : ', temp)
    }
    else return Alert.alert('item already added to cart!');
    getCartFromAsync();
  }

  useEffect(() => {
    getCartFromAsync();
    lowToHighPrice();
  }, [])

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={30} color={COLORS.black} />
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightGray }}>
      <ScrollView
        horizontal={false}
        decelerationRate={6}
        showsVerticalScrollIndicator={false}
      >
        <RenderHeader
          navigation={() => navigation.navigate('CartScreen')}
          cartlength={cartlength.length}
        />
        <View style={{
          marginTop: SIZES.large2vina,
          marginBottom: SIZES.large2,
          alignSelf: 'center'
        }}>
          <View
            style={{
              width: "90%",
              borderRadius: SIZES.font,
              backgroundColor: COLORS.white,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: SIZES.font,
              paddingVertical: SIZES.base,
              ...SHADOWS.medium
            }}
          >
            <Image source={images.search} style={{ width: 20, height: 20, marginRight: 10 }} resizeMode='contain' />
            <TextInput
              placeholder="Search"
              style={{ flex: 1 }}
              value={searchQuery}
              onChangeText={(event) => handleSearchQuery(event)}
            />
            {searchQuery.length <= 0 ? (<TouchableOpacity
              activeOpacity={.7} onPress={() => handleSortModal()}>
              <Image
                source={images.sort}
                style={{ width: 20, height: 20, marginRight: SIZES.base }}
              /></TouchableOpacity>) : (
              <TouchableOpacity onPress={() => handleClearQuery()}>
                <Image
                  source={images.closeIcon}
                  style={{ width: 28, height: 28 }}
                  resizeMode='contain'
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={{ marginTop: 20 }}>

          <View style={{ marginLeft: 25, marginBottom: 20 }}>
            <Text style={{ color: COLORS.black, fontSize: 18, fontWeight: 'bold' }}>{'Popular'}</Text>
          </View>


          {!shopData.length ? (errorComponent()) : (<FlatList
            data={shopData}
            keyExtractor={(item) => item.id}
            style={{ alignSelf: 'center' }}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
            numColumns={2}
            scrollEnabled={true}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('ProductDetails', {
                    data: item,
                  })}
                  style={{
                    width: 168,
                    height: 320,
                    backgroundColor: COLORS.white,
                    borderRadius: 10,
                    marginBottom: 20,
                    marginHorizontal: 10,
                    paddingHorizontal: 20,
                    ...SHADOWS.dark,
                    alignItems: 'center',
                    flexDirection: 'column'
                  }}
                  key={index}
                  activeOpacity={.7}
                >
                  <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 13 }}>
                    <Image source={{ uri: item.image }} resizeMode='contain' style={{ width: 60, height: 60 }} />
                  </View>
                  <Text style={{ fontSize: 14, fontWeight: '700', color: COLORS.black, marginBottom: 20, alignSelf: 'flex-start', }}>{item.title}</Text>
                  <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginBottom: 7 }}>
                    <Image source={images.ratingStar} style={{ width: 13, height: 13, marginRight: 10 }} resizeMode='contain' />
                    <Text style={{ color: COLORS.black, fontWeight: '600' }}>{item.rating?.rate} <Text>({item.rating?.rate.toFixed(0)}k rating)</Text></Text>
                  </View>
                  <Text style={{ color: COLORS.primary, fontSize: 18, fontWeight: '700', alignSelf: 'flex-start', marginBottom: 7 }}>{`$ ` + item.price}</Text>
                  <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                    <Image source={images.fire2} style={{ width: 25, height: 25 }} />
                    <Text>{item.rating?.count}</Text>
                    <TouchableOpacity onPress={() => handleAddToCart(item)} style={{ marginLeft: 20, alignSelf: 'flex-end', marginLeft: 30 }} activeOpacity={.7}>
                      <Image source={images.bag} style={{ width: 30, height: 30 }} resizeMode='contain' />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )
            }}
          />)}
        </View>
        {<RenderSortModal
          isSortModal={isSortModal}
          setIsSortModal={setIsSortModal}
          handleSortModal={handleSortModal}
          transparent={true}
        />}
      </ScrollView>
    </SafeAreaView>
  );
}
