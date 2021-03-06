import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Button, Paragraph, Dialog, Portal} from 'react-native-paper';

const DialogBox = (props) => {
    const {data, showConfirm, reply} = props;

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(showConfirm);
    }, [showConfirm]);

    const hideDialog = (result) => {
        setVisible(false);
        reply(result);
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
                        <Button onPress={() => hideDialog(false)}>
                            Cancel
                        </Button>
                        <Button onPress={() => hideDialog(true)}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

export default DialogBox;
