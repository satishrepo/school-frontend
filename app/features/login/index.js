import React, { useState, useEffect } from 'react';
import http from '../../services/http';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';
import { save, fetch } from '../../services/storage';

const loginService = (props) => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // this is not taking action right now, 
    // because redirection happend on navigation level
    useEffect( () => {
        
        if (props.loginResponse && props.loginResponse.status) {

            // console.log('login success',  props.loginResponse)
            
            // save('authToken', props.loginResponse.token)
            // save('loggedUser', props.loginResponse)

            props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    { name: 'Class' }
                  ],
                })
            );
        }

    }, [props.loginResponse])

    const login = () => {
        console.log(email, password)
        
        if(email && password) {
            props.userLogin({email, password})
        }
    }

    return (
            <View style={{padding: 10}}>
                <TextInput 
                    mode="flat"
                    onChangeText={email => setEmail(email)}
                    value={email} 
                    label="Email"
                    style={{marginBottom: 10 }}
                />
                <TextInput 
                    onChangeText={password => setPassword(password)}
                    value={password} 
                    secureTextEntry={true}
                    label="Password"
                    style={{marginBottom: 10 }}
                />
                <Button raised icon="camera" mode="contained" onPress={() =>login()} disabled={props.loginRequest}>
                    Login
                </Button>
                {/* <Button 
                    title="Login"
                    onPress={() => login()} 
                    style={{ margin: 10 }}
                /> */}
                
            </View>
    )
}

export default loginService;