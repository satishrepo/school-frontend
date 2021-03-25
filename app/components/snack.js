import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Snackbar, Portal} from 'react-native-paper';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    }
});

const Snack = (props) => {
    const {data, showAlert, reply} = props;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(showAlert);
    }, [showAlert]);

    const onDismissSnackBar = () => {
        setVisible(false);
        reply();
    };

    const onToggleSnackBar = () => setVisible(!visible);

    return (
        <View style={styles.container}>
            <Portal>
                <Button onPress={onToggleSnackBar}>
                    {visible ? 'Hide' : 'Show'}
                </Button>
                <Snackbar
                    visible={visible}
                    onDismiss={onDismissSnackBar}
                    action={{
                        label: data.buttonLabel,
                        onPress: () => onDismissSnackBar()
                    }}
                >
                    {data.text}
                </Snackbar>
            </Portal>
        </View>
    );
};

export default Snack;
