import React, {useState, useEffect} from 'react';
// import { StyleSheet, View } from 'react-native';
import {useSelector} from 'react-redux';

import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import {BottomNavigation} from 'react-native-paper';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';

import * as storageSerivce from '../services/storage';

import Home from '../features/home';
import Login from '../store/login/container';
import Profile from '../features/profile';
import Subject from '../store/attendance/containers/subject';
import Time from '../store/attendance/containers/time';
import Class from '../store/attendance/containers/class';
import Presence from '../store/attendance/containers/presence';
import RecentAttendance from '../store/attendance/containers/recentAttendance';
import DrawerContent from '../components/drawerContent';

const Tab = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();
const AttendanceStack = createStackNavigator();
const AuthStack = createStackNavigator();

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="Home"
                component={Home}
                options={() => ({
                    headerTitle: 'Home'
                })}
            />
        </HomeStack.Navigator>
    );
};
const AttendanceStackScreen = () => {
    return (
        <AttendanceStack.Navigator>
            <AttendanceStack.Screen
                name="RecentAttendance"
                component={RecentAttendance}
                options={() => ({
                    headerTitle: "Today's Attendance"
                })}
            />
            <AttendanceStack.Screen
                name="Class"
                component={Class}
                options={() => ({
                    headerTitle: 'Choose Class'
                })}
            />
            <AttendanceStack.Screen name="Subject" component={Subject} />
            <AttendanceStack.Screen name="Time" component={Time} />
            <AttendanceStack.Screen name="Attendance" component={Presence} />
        </AttendanceStack.Navigator>
    );
};

const AuthStackScreen = () => {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name="Login"
                component={Login}
                options={{title: 'Login'}}
            />
        </AuthStack.Navigator>
    );
};

const Drawer = createDrawerNavigator();

const DrawerStackScreen = () => (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Tabs" component={TabStackScreen} />
        <Drawer.Screen name="AuthStack" component={AuthStackScreen} />
    </Drawer.Navigator>
);

const TabStackScreen = () => (
    <Tab.Navigator>
        <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons
                        name="home"
                        color={color}
                        size={26}
                    />
                )
            }}
        />
        <Tab.Screen
            name="Attendance"
            component={AttendanceStackScreen}
            options={{
                tabBarLabel: 'Attendance',
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons
                        name="account-group"
                        color={color}
                        size={26}
                    />
                )
            }}
        />
        <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons
                        name="account"
                        color={color}
                        size={26}
                    />
                )
            }}
        />
    </Tab.Navigator>
);

const NavConfig = () => {
    const loggedUser = useSelector((state) => state.loginReducer.loggedUser);
    const [savedUser, setSavedUser] = useState(null);

    useEffect(() => {
        (async () => {
            const user = await storageSerivce.get('loggedUser');
            setSavedUser(user);
            return user;
        })();
    }, []);

    useEffect(() => {
        if (loggedUser && loggedUser.user_id) {
            storageSerivce.save('loggedUser', loggedUser);
            storageSerivce.save('authToken', loggedUser.token);
        }
    }, [loggedUser]);

    const isLoggedIn = !!(savedUser || (loggedUser && loggedUser.user_id));

    return (
        <NavigationContainer>
            {isLoggedIn ? DrawerStackScreen() : AuthStackScreen()}
        </NavigationContainer>
    );
};

export default NavConfig;
