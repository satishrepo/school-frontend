import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
    FlatList,
    // Text,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    Button
} from 'react-native';
import {withTheme, List} from 'react-native-paper';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 20
    },
    status: {
        fontSize: 10
    }
});

const Item = ({item, onPress, style}) => (
    // <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    //     <Text style={styles.title}>{item.title}</Text>
    //     <Text style={styles.status}>{status}</Text>
    // </TouchableOpacity>
    <List.Item
        key={item.title}
        style={[styles.item, style]}
        title={item.title}
        description={item.title}
        onPress={onPress}
        left={(prop) => <List.Icon {...prop} icon="text-subject" />}
    />
);

const Subject = (props) => {
    console.log('props', props);
    const {
        navigation,
        // theme,
        fetchSubjects,
        fetchSubjectsResponse,
        selectedSubject,
        getSubjects,
        setSubject
    } = props;
    const [selectedId, setSelectedId] = useState(null);
    const [subjectList, setSubjectList] = useState([]);

    useEffect(() => {
        if (!fetchSubjectsResponse) {
            getSubjects();
        }
        if (selectedSubject) {
            setSelectedId(selectedSubject);
        }
    }, []);

    useEffect(() => {
        if (fetchSubjectsResponse) {
            setSubjectList(fetchSubjectsResponse);
        }
    }, [fetchSubjects, fetchSubjectsResponse]);

    const selectSubject = (item) => {
        setSelectedId(item.id);
        setSubject(item.id);
    };

    const renderItem = ({item}) => {
        const backgroundColor = item.id === selectedId ? '#3498db' : '#ffffff';

        return (
            <Item
                item={item}
                onPress={() => selectSubject(item)}
                style={{backgroundColor}}
            />
        );
    };

    const goTo = (screen) => {
        navigation.navigate(screen);
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{marginRight: 20}}>
                    <Button
                        onPress={() => goTo('Attendance')}
                        title="NEXT"
                        disabled={!selectedSubject}
                    />
                </TouchableOpacity>
            )
        });
    }, [navigation, selectedSubject]);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={subjectList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                extraData={selectedId}
            />
        </SafeAreaView>
    );
};

export default withTheme(Subject);
