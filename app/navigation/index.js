import React, {useState, useEffect} from 'react';
// import { StyleSheet, View } from 'react-native';
import {useSelector} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {BottomNavigation} from 'react-native-paper';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// const Drawer = createDrawerNavigator();

import {save, get} from '../services/storage';

import Login from '../store/login/container';
import Profile from '../features/profile';
import Time from '../store/attendance/containers/time';
import Class from '../store/attendance/containers/class';
import Presence from '../store/attendance/containers/presence';

const Stack = createStackNavigator();

const AttendanceStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Class"
                    component={Class}
                    options={() => ({
                        headerTitle: 'Choose Class'
                    })}
                />
                <Stack.Screen name="Time" component={Time} />
                <Stack.Screen name="Attendance" component={Presence} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const AuthStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{title: 'Login'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const NavConfig = () => {
    const loggedUser = useSelector((state) => state.loginReducer.loggedUser);
    const [index, setIndex] = useState(0);
    const [savedUser, setSavedUser] = useState(null);

    useEffect(() => {
        (async () => {
            const user = await get('loggedUser');
            setSavedUser(user);
        })();
    }, []);

    useEffect(() => {
        if (loggedUser && loggedUser.user_id) {
            save('loggedUser', loggedUser);
            save('authToken', loggedUser.token);
        }
    }, [loggedUser]);

    const isLoggedIn = !!(savedUser || (loggedUser && loggedUser.user_id));

    const [routes] = useState([
        {key: 'attendance', title: 'Attendance', icon: 'album'},
        {key: 'profile', title: 'Profile', icon: 'history'}
    ]);

    const renderScene = BottomNavigation.SceneMap({
        attendance: AttendanceStack,
        profile: Profile
    });

    return isLoggedIn ? (
        <BottomNavigation
            navigationState={{index, routes}}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    ) : (
        AuthStack()
    );
};

export default NavConfig;
