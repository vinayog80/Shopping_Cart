import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, TouchableOpacity, LogBox, Image, TextInput, Text, ScrollView, ActivityIndicator, FlatList, Alert, ToastAndroid } from 'react-native'
import { images, SIZES, SHADOWS, COLORS } from '../../constants/index';
import { useShoppingCartSource, useModalSource } from '../../hook/index';
import { ConfigUrl } from '../../config';
import { errorComponent } from '../../config/helpers';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";

LogBox.ignoreLogs(['VirtualizedLists should never be nested'])

function RenderHeader({ navigation, cartlength, navigateToFavourite }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        width: '100%',
        marginVertical: 10 * 2
      }}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={images.profile}
          style={{ width: 40, height: 40 }}
          resizeMode='contain'
        />
        <Text style={{ marginTop: 15, fontSize: 16, fontWeight: '700', color: COLORS.black, marginLeft: 5 }}>{'hi John Doe!'}</Text>
      </View>

      <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
        <Text style={{ fontSize: 15, color: "#000", fontWeight: "700" }}>{(cartlength)}</Text>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={navigation}
        >
          <Image
            source={images.shopBag}
            style={{
              width: 30,
              height: 30,
            }}
            resizeMode='contain'
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={.9}
          onPress={navigateToFavourite}
        >
          <Image source={images.heartOutline} style={{ marginLeft: 15, width: 30, height: 30 }} resizeMode='contain' />
        </TouchableOpacity>
      </View>
    </View >
  )
}

function RenderSortModal({
  isSortModal,
  setIsSortModal,
  handleSortModal,
  transparent,
  islowSortSelected,
  isHightSortSelected,
  isSortAscendingSelected,
  isSortDescendingSelected,
  handleSortBylowToHighPrice,
  handleSortByHighToLowPrice,
  handleSortByAscendingOrder,
  handleSortByDescendingOrder
}) {
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
        <View style={{ width: '100%', height: '70%', backgroundColor: COLORS.white, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
          <TouchableOpacity style={{ alignSelf: 'center' }} activeOpacity={.8} onPress={() => setIsSortModal(false)}>
            <Image source={images.closeIcon} style={{ width: 40, height: 40, marginTop: 10 }} resizeMode='contain' />
          </TouchableOpacity>
          <View style={{ marginTop: 20, flexDirection: 'column', marginVertical: 10, alignSelf: 'center' }}>
            <TouchableOpacity
              onPress={handleSortBylowToHighPrice}
              activeOpacity={.8}
              style={{
                borderWidth: islowSortSelected ? 1 : 0,
                paddingHorizontal: 40,
                borderRadius: 8,
                alignItems: 'center',
                marginBottom: 20,
                width: 320,
                height: 65,
                backgroundColor: islowSortSelected ? COLORS.itemGray : COLORS.lightGray,
                ...SHADOWS.medium,
                paddingHorizontal: 40,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <Image
                source={islowSortSelected ? images.radioBtn2 : images.radioBtn1}
                style={{ width: 30, height: 30, }}
                resizeMode='contain'
              />
              <Text style={{ textAlign: 'right', color: COLORS.black, fontWeight: '600' }}>{'low to high price'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSortByHighToLowPrice}
              activeOpacity={.8}
              style={{
                borderWidth: isHightSortSelected ? 1 : 0,
                paddingHorizontal: 40,
                borderRadius: 8,
                alignItems: 'center',
                marginBottom: 20,
                width: 320,
                height: 65,
                backgroundColor: isHightSortSelected ? COLORS.itemGray : COLORS.lightGray,
                ...SHADOWS.dark,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <Image
                source={isHightSortSelected ? images.radioBtn2 : images.radioBtn1}
                style={{ width: 30, height: 30 }}
                resizeMode='contain'
              />
              <Text style={{ textAlign: 'right', color: COLORS.black, fontWeight: '600' }}>{'high to low price'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSortByAscendingOrder}
              activeOpacity={.8}
              style={{
                borderWidth: isSortAscendingSelected ? 1 : 0,
                paddingHorizontal: 40,
                borderRadius: 8,
                alignItems: 'center',
                width: 320,
                marginBottom: 20,
                height: 65,
                backgroundColor: isSortAscendingSelected ? COLORS.itemGray : COLORS.lightGray,
                ...SHADOWS.dark,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <Image
                source={isSortAscendingSelected ? images.radioBtn2 : images.radioBtn1}
                style={{ width: 30, height: 30 }}
                resizeMode='contain'
              />
              <Text style={{ textAlign: 'right', color: COLORS.black, fontWeight: '600' }}>{'sort by ascending'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSortByDescendingOrder}
              activeOpacity={.8}
              style={{
                borderWidth: isSortDescendingSelected ? 1 : 0,
                paddingHorizontal: 40,
                borderRadius: 8,
                alignItems: 'center',
                width: 320,
                marginBottom: 20,
                height: 65,
                backgroundColor: isSortDescendingSelected ? COLORS.itemGray : COLORS.lightGray,
                ...SHADOWS.dark,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <Image
                source={isSortDescendingSelected ? images.radioBtn2 : images.radioBtn1}
                style={{ width: 30, height: 30 }}
                resizeMode='contain'
              />
              <Text style={{ textAlign: 'right', color: COLORS.black, fontWeight: '600' }}>{'sort by descending'}</Text>
            </TouchableOpacity>
          </View>
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
  const [favourites, setfavourites] = useState([]);
  const [selectedFavourite, setSelectedFavourite] = useState(false);
  const [islowSortSelected, setIsLowSelected] = useState(false);
  const [isHightSortSelected, setISHighSortSelected] = useState(false);
  const [isSortAscendingSelected, setIsSortAscendingSelected] = useState(false);
  const [isSortDescendingSelected, setIsSortDescendingSelected] = useState(false);

  const handleSortBylowToHighPrice = () => {
    setIsLowSelected(!islowSortSelected);
    setISHighSortSelected(false)
    setIsSortAscendingSelected(false)
    setIsSortDescendingSelected(false);

    let arr = shopData;
    for (let index = 0; index <= arr.length - 1; index++) {
      for (let j = index + 1; j <= arr.length - 1; j++) {
        if (arr[index].price > arr[j].price) {
          let temp = arr[index];
          arr[index] = arr[j];
          arr[j] = temp;
        }
      }
    }
    if (islowSortSelected) setShopData(arr);
    else setShopData(shopData);
  }
  const handleSortByHighToLowPrice = () => {
    setISHighSortSelected(!isHightSortSelected);
    setIsLowSelected(false);
    setIsSortAscendingSelected(false);
    setIsSortDescendingSelected(false);

    let arr = shopData;
    for (let index = 0; index <= arr.length - 1; index++) {
      for (let j = index + 1; j <= arr.length - 1; j++) {
        if (arr[index].price < arr[j].price) {
          let temp = arr[index];
          arr[index] = arr[j];
          arr[j] = temp;
        }
      }
    }
    if (isHightSortSelected) setShopData(arr);
    else setShopData(shopData)
  }
  const handleSortByAscendingOrder = () => {
    setIsSortAscendingSelected(!isSortAscendingSelected);
    setIsLowSelected(false);
    setISHighSortSelected(false);
    setIsSortDescendingSelected(false);

    let words = shopData;
    let wordlen = words.length;
    let end = wordlen - 1;

    for (let index = 0; index <= wordlen; index++) {
      for (let j = 0; j < end; j++) {
        if (words[j].title.localeCompare(words[j + 1].title) > 0) {
          let temp = words[j]
          words[j] = words[j + 1];
          words[j + 1] = temp;
        }
      }
      end - end - 1;
    }
    if (isSortAscendingSelected) setShopData(words);
    else setShopData(shopData);
  }
  const handleSortByDescendingOrder = () => {
    setIsSortDescendingSelected(!isSortDescendingSelected);
    setIsLowSelected(false);
    setISHighSortSelected(false);
    setIsSortAscendingSelected(false);

    let sortedArr = shopData;
    let right = sortedArr.length - 1;
    for (let i = 0; i <= right; i++) {
      for (let j = 0; j < right; j++) {
        if (sortedArr[j + 1].title.localeCompare(sortedArr[j].title) > 0) {
          let store = sortedArr[j + 1];
          sortedArr[j + 1] = sortedArr[j];
          sortedArr[j] = store;
        }
      }
      right - right - 1;
    }
    if (isSortDescendingSelected) setShopData(sortedArr);
    else setShopData(shopData);
  }

  const handleClearQuery = () => {
    setSearchQuery('');
    setShopData(shopData)
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

  const getFavouriteFromAsync = async () => {
    try {
      let value = JSON.parse(await AsyncStorage.getItem('@favProduct'));
      if (value != null) {
        setfavourites(value)
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
      ToastAndroid.show(
        'Item Added Successfully to cart',
        ToastAndroid.SHORT,
      );
      AsyncStorage.setItem('@product', JSON.stringify(temp));
    }
    else return Alert.alert('item already added to cart!');
    getCartFromAsync();
  }

  const handleAddToFavourite = (item) => {
    const temp = favourites.some(cartItem => cartItem.id == item.id);
    if (!temp) {
      let favouriteItem = [...favourites, { ...item }];
      setfavourites(favouriteItem)
      setSelectedFavourite(true);
      AsyncStorage.setItem('@favProduct', JSON.stringify(favouriteItem));
      ToastAndroid.show(
        'Added to favourites',
        ToastAndroid.SHORT,
      );
      console.log(favouriteItem)
    }
    else return Alert.alert('already added to favourites !');
    getFavouriteFromAsync();
  }


  useEffect(() => {
    getCartFromAsync();
    getFavouriteFromAsync();
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
          navigateToFavourite={() => navigation.navigate('FavouriteScreen', { selectedFavourite: selectedFavourite })}
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
                    handleAddToCart,
                    handleAddToFavourite,
                    selectedFavourite
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
          islowSortSelected={islowSortSelected}
          isHightSortSelected={isHightSortSelected}
          handleSortBylowToHighPrice={() => handleSortBylowToHighPrice()}
          handleSortByHighToLowPrice={() => handleSortByHighToLowPrice()}
          isSortAscendingSelected={isSortAscendingSelected}
          isSortDescendingSelected={isSortDescendingSelected}
          handleSortByAscendingOrder={() => handleSortByAscendingOrder()}
          handleSortByDescendingOrder={() => handleSortByDescendingOrder()}
        />}
      </ScrollView>
    </SafeAreaView>
  );
}
