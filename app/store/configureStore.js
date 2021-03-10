import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: ['attendanceReducer']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(
	persistedReducer,
	{},
	compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : (f) => f)
)
let persistor = persistStore(store)

export { store, persistor }

/* 
// without persit-redux
export default createStore(
	rootReducer,
	{},
	compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : (f) => f)
); */
