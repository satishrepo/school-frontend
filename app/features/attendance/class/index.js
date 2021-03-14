import React, { useState, useEffect, useLayoutEffect } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, Button } from "react-native";
import { withTheme } from "react-native-paper"

const Item = ({ item, onPress, style, status }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.status}>{status}</Text>
  </TouchableOpacity>
);

const Class = (props) => {
  
  const { navigation, theme } = props
  const [selectedId, setSelectedId] = useState(null);
  const [classList, setClassList] = useState([]);

  useEffect(() => {
    console.log(props)
    if (!props.fetchClassesResponse) {
      props.getClasses()
    }
    if(props.selectedClass) {
      setSelectedId(props.selectedClass)
    }
  }, [])

  useEffect(() => {
    if (props.fetchClassesResponse) {
      setClassList(props.fetchClassesResponse)
    }
  }, [props.fetchClasses])

  const selectClass = (item) => {
    setSelectedId(item.id)
    props.setClassName(item.id)
  }

  const renderItem = ({ item }) => {
      let backgroundColor = item.id === selectedId ? "#3498db" : "#ffffff";
      let status = ''
      if (
        props.recentAttendances && 
        props.recentAttendances[item.id] && 
        props.recentAttendances[item.id].attendanceId) {
          status = 'Submitted'
          backgroundColor = theme.colors.green
      } else if (
        props.recentAttendances && 
        props.recentAttendances[item.id] && 
        props.recentAttendances[item.id].attendanceData) {
          status = 'Saved'
      }
      
      return (
          <Item
              item={item}
              onPress={() => selectClass(item)}
              style={{ backgroundColor }}
              status={status}
          />
      );
  };

  const goTo = (screen) => {
      navigation.navigate(screen, {'selectedClass': props.selectedClass});
  }

  useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity 
          style={{marginRight: 20}}
          >
              <Button 
                  onPress={() => goTo('Time')} 
                  title={"NEXT"}
                  disabled={!props.selectedClass}
              />
          </TouchableOpacity>
        )
      });
  }, [navigation, props.selectedClass]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={classList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5
  },
  title: {
    fontSize: 20,
  },
  status: {
    fontSize: 10
  },
});

export default withTheme(Class);