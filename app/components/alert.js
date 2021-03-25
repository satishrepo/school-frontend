import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Button, Paragraph, Dialog, Portal} from 'react-native-paper';

const Alert = (props) => {
    const {data, showAlert, reply} = props;

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(showAlert);
    }, [showAlert]);

    const hideDialog = () => {
        setVisible(false);
        reply();
    };

    return (
        <View>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>{data.title}</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>{data.content}</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        {/* <Button onPress={() => hideDialog(false)}>
                            Cancel
                        </Button> */}
                        <Button onPress={() => hideDialog()}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

export default Alert;
