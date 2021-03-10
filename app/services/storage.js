import AsyncStorage from '@react-native-async-storage/async-storage';

export const save = async (key, value) => {
    try {
        if (typeof value === 'string') {
            await AsyncStorage.setItem(key, value)
        } else if (typeof value === 'object') {
            let stringValue = JSON.stringify(value)
            await AsyncStorage.setItem(key, stringValue)
        }
    } catch (e) {
      console.log('Asyn Storage save error: ', e)
    }
}

export const get = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      if(value !== null) {
        if (typeof value === 'string') {
            return value
        } else if (typeof value === 'object') {
            return jsonValue != null ? JSON.parse(value) : null;
        }
      }
    } catch(e) {
        console.log('Asyn Storage fetch error: ', e)
    }
}