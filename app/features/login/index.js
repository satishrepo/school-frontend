import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {CommonActions} from '@react-navigation/native';

const Login = (props) => {
    const {navigation, loginRequest, loginResponse, userLogin} = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // because redirection happend on navigation level
    useEffect(() => {
        if (loginResponse && loginResponse.status) {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{name: 'Class'}]
                })
            );
        }
    }, [loginResponse]);

    const login = () => {
        if (email && password) {
            userLogin({email, password});
        }
    };

    return (
        <View style={{padding: 10}}>
            <TextInput
                mode="flat"
                onChangeText={(text) => setEmail(text)}
                value={email}
                label="Email"
                style={{marginBottom: 10}}
            />
            <TextInput
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry
                label="Password"
                style={{marginBottom: 10}}
            />
            <Button
                raised
                icon="camera"
                mode="contained"
                onPress={() => login()}
                disabled={loginRequest}
            >
                Login
            </Button>
        </View>
    );
};

export default Login;
