import React, {useState} from 'react';
import http from '../../services/http';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

const Home = ({navigation}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleChange = (e) => {
        console.log(e)
    }

    const login = () => {
        console.log(email, password)

        if(email && password) {
            http.post('http://localhost:3000', {email, password})
            .then(response =>{
                navigation.navigate('Class')
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
        }
    }

    return (
        <View style={{padding: 10}}>
            {/* <Text>Hey! Welcome to home page</Text> */}
            <TextInput 
                onChangeText={email => setEmail(email)}
                value={email} 
                placeholder="Enter Email"
                placeholderTextColor="blue"
                style={{ height: 40, borderColor: 'black', borderBottomWidth: 1, marginBottom: 5 }}
            />
            <TextInput 
                onChangeText={password => setPassword(password)}
                value={password} 
                secureTextEntry={true}
                placeholder="Enter Password"
                placeholderTextColor="blue"
                style={{ height: 40, borderColor: 'black', borderBottomWidth: 1, marginBottom: 5 }}
            />
            <Button 
                title="Login"
                onPress={() => login()} 
                style={{ margin: 10 }}
            />
            {/* <Button 
                title="Visit Profile"
                onPress={() => navigation.navigate('Profile', {name: 'satish'})} 
            /> */}
            
        </View>
    )
}

export default Home;