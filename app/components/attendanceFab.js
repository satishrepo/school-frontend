import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Colors, FAB, Portal, Provider} from 'react-native-paper';

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: Colors.blue500
    }
});

const AttendanceFab = (props) => {
    const {onPress} = props;
    return (
        <Provider>
            <Portal>
                <FAB
                    style={styles.fab}
                    small
                    icon="plus"
                    onPress={onPress}
                    // accessibilityLabel="abc"
                    // label="xyz"
                    animated
                />
            </Portal>
        </Provider>
    );
};

export default AttendanceFab;
