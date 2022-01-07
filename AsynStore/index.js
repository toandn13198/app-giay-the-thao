import AsyncStorage from '@react-native-async-storage/async-storage';

export const addStoreCart = async (value) => {
    try {
    const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@CART', jsonValue)
      console.log('da ghi nho vao storage')
    } catch (e) {
      console.log(e)
    }
  }

export const getStoreCart = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@CART')
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch(e) {
      console.log('loi-----------------------------------------------')
    }
  }
