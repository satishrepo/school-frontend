import React, {useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
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
        // width: '47%',
        height: 150,
        // marginBottom: '5%',
        borderRadius: 5,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    surfaceText: {
        fontSize: 20,
        fontWeight: '900',
        color: Colors.indigo300
    },
    icon: {
        marginTop: 20,
        marginBottom: 5,
        color: Colors.blue300
    },
    touchArea: {
        width: '47%',
        marginBottom: '5%'
    }
});

const Home = (props) => {
    console.log('home props', props);

    const {navigation} = props;

    const gotTo = (tab, screen) => {
        navigation.navigate(tab, {screen});
    };
    return (
        <SafeAreaView>
            <View>
                <Text style={styles.welcomeText}>
                    Hey! Welcome to home page
                </Text>
            </View>
            <View style={styles.surfaceCont}>
                <TouchableOpacity
                    style={styles.touchArea}
                    onPress={() => gotTo('Attendance', 'RecentAttendance')}
                >
                    <Surface style={styles.surface}>
                        <Icon
                            name="users"
                            size={75}
                            style={[styles.icon, {color: Colors.red300}]}
                        />
                        <Text style={styles.surfaceText}>Attendance</Text>
                    </Surface>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.touchArea}
                    onPress={() => gotTo('Attendance', 'RecentAttendance')}
                >
                    <Surface style={styles.surface}>
                        <Icon
                            name="check-square-o"
                            size={75}
                            style={styles.icon}
                        />
                        <Text style={styles.surfaceText}>Notes</Text>
                    </Surface>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.touchArea}
                    onPress={() => gotTo('Attendance', 'RecentAttendance')}
                >
                    <Surface style={styles.surface}>
                        <Text style={styles.surfaceText}>Notes</Text>
                    </Surface>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.touchArea}
                    onPress={() => gotTo('Attendance', 'RecentAttendance')}
                >
                    <Surface style={styles.surface}>
                        <Text style={styles.surfaceText}>Notes</Text>
                    </Surface>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Home;
