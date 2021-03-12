import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
// import { StyleSheet } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
// import store from './app/store/configureStore';

import { store, persistor } from './app/store/configureStore';
import { PersistGate } from 'redux-persist/integration/react'

import NavConfig from './app/navigation';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#54C7EC',
    accent: '#f1c40f',
    darkBlue: '#05627f',
    green: '#00C171',
    darkGreen: '#035835',
    red: '#F2453A',
    darkRed: '#a50404'
  },
};


export default function App() {
 
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <NavConfig />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );

}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
