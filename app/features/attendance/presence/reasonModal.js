import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {
    withTheme,
    Modal,
    Portal,
    Text,
    Button,
    TextInput,
    Chip
} from 'react-native-paper';

const styles = StyleSheet.create({
    chipCont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingTop: 10,
        paddingBottom: 10,
        flexWrap: 'wrap',
        width: '100%'
    },
    chip: {
        color: 'green',
        margin: 5
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 18
    },
    buttonCont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    saveButton: {
        width: '30%',
        marginTop: 10,
        marginLeft: 10
    }
});

const ReasonModal = (props) => {
    const {item, viewReason, onUpdate, onCancel, readOnly} = props;
    const initReason = {
        reason: '',
        note: ''
    };
    const {theme, modalData} = props;
    const [visible, setVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState(item);
    const [absentReasonObj, setAbsentReasonObj] = useState(initReason);

    useEffect(() => {
        setCurrentItem(item);

        if (modalData.type === 'ATTENDANCE' && item.absentReason) {
            setAbsentReasonObj(item.absentReason);
        } else if (modalData.type === 'HOMEWORK' && item.homeworkReason) {
            setAbsentReasonObj(item.homeworkReason);
        }
    }, [item, item.rollNo]);

    const showModal = () => setVisible(true);

    const saveModalData = () => {
        const itemCopy = {...currentItem};

        if (modalData.type === 'ATTENDANCE') {
            itemCopy.absentReason = absentReasonObj;
        } else if (modalData.type === 'HOMEWORK') {
            itemCopy.homeworkReason = absentReasonObj;
        }

        const updatedItem = {
            index: currentItem.index,
            item: itemCopy
        };

        onUpdate(updatedItem);
        setVisible(false);
        setCurrentItem(null);
    };

    useEffect(() => {
        let show = false;

        if (modalData.type === 'ATTENDANCE') {
            show = !!((currentItem && !currentItem.isPresent) || viewReason);
        } else if (modalData.type === 'HOMEWORK') {
            show = !!(currentItem && !currentItem.isHomework);
        }

        if (show) {
            showModal();
        } else {
            saveModalData();
        }
    }, [currentItem]);

    const cancelModel = () => {
        setVisible(false);

        const cancelObj = {
            index: currentItem.index,
            viewReason
        };

        onCancel(cancelObj, modalData.type);
    };

    const onChangeReason = (text, field) => {
        setAbsentReasonObj({...absentReasonObj, [field]: text});
    };

    const containerStyle = {backgroundColor: 'white', padding: 20};

    return (
        <View>
            <Portal>
                <Modal
                    dismissable={false}
                    visible={visible}
                    contentContainerStyle={containerStyle}
                >
                    <Text style={styles.heading}>{modalData.title}</Text>

                    <View style={styles.chipCont}>
                        {modalData.reasons.map((reasonItem) => (
                            <Chip
                                mode="outlined"
                                style={[styles.chip]}
                                selected={reasonItem === absentReasonObj.reason}
                                key={reasonItem}
                                onPress={() =>
                                    onChangeReason(reasonItem, 'reason')
                                }
                            >
                                {reasonItem}
                            </Chip>
                        ))}
                    </View>
                    <TextInput
                        label="Note"
                        value={absentReasonObj.note}
                        multiline
                        onChangeText={(text) => onChangeReason(text, 'note')}
                    />
                    {readOnly ? (
                        <Button
                            style={styles.saveButton}
                            // icon="content-save-outline"
                            mode="contained"
                            color={theme.colors.accent}
                            onPress={cancelModel}
                        >
                            Back
                        </Button>
                    ) : (
                        <Text />
                    )}
                    {!readOnly ? (
                        <View style={styles.buttonCont}>
                            <Button
                                style={styles.saveButton}
                                // icon="content-save-outline"
                                mode="contained"
                                color={theme.colors.gray}
                                // disabled={!absentReasonObj.reason && !absentReasonObj.note}
                                onPress={cancelModel}
                            >
                                Cancel
                            </Button>
                            <Button
                                style={styles.saveButton}
                                // icon="content-save-outline"
                                mode="contained"
                                color={theme.colors.primary}
                                disabled={
                                    !absentReasonObj.reason &&
                                    !absentReasonObj.note
                                }
                                onPress={saveModalData}
                            >
                                Save
                            </Button>
                        </View>
                    ) : (
                        <Text />
                    )}
                </Modal>
            </Portal>
        </View>
    );
};

export default withTheme(ReasonModal);
