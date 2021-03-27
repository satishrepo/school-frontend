import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {Colors, Surface} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    welcomeText: {
        fontSize: 20,
        textAlign: 'center',
        color: Colors.deepPurple500,
        padding: 20
    },
    surfaceCont: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 20
    },
    surface: {
        elevation: 20,
        width: '47%',
        // paddingBottom: '18%',
        // paddingTop: '5%',
        height: 150,
        marginBottom: '5%',
        borderRadius: 5,
        textAlign: 'center'
    },
    surfaceText: {
        fontSize: 20,
        fontWeight: 900,
        color: Colors.indigo300
    },
    icon: {
        marginTop: 20,
        marginBottom: 5,
        boxShadow: 2,
        color: Colors.blue300
    }
});

const Home = () => {
    return (
        <SafeAreaView>
            <View>
                <Text style={styles.welcomeText}>
                    Hey! Welcome to home page
                </Text>
            </View>
            <View style={styles.surfaceCont}>
                <Surface style={styles.surface}>
                    <Icon
                        name="users"
                        size={75}
                        style={[styles.icon, {color: Colors.red300}]}
                    />
                    <Text style={styles.surfaceText}>Attendance</Text>
                </Surface>
                <Surface style={styles.surface}>
                    <Icon name="check-square-o" size={75} style={styles.icon} />
                    <Text style={styles.surfaceText}>Notes</Text>
                </Surface>
                <Surface style={styles.surface}>
                    <Text style={styles.surfaceText}>Notes</Text>
                </Surface>
                <Surface style={styles.surface}>
                    <Text style={styles.surfaceText}>Notes</Text>
                </Surface>
                <Surface style={styles.surface}>
                    <Text style={styles.surfaceText}>Notes</Text>
                </Surface>
            </View>
        </SafeAreaView>
    );
};

export default Home;
