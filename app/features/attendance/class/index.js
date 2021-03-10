import React, { useState, useEffect, useLayoutEffect } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, Button } from "react-native";

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);

const Class = (props) => {
  
  const { navigation } = props
  const [selectedId, setSelectedId] = useState(null);
  const [classList, setClassList] = useState([]);

  useEffect(() => {
    if (!props.fetchClassesResponse) {
      props.getClasses()
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
      const backgroundColor = item.id === selectedId ? "#3498db" : "#ffffff";

      return (
          <Item
              item={item}
              onPress={() => selectClass(item)}
              style={{ backgroundColor }}
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
    fontSize: 32,
  },
});

export default Class;