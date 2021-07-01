import React, { Component } from 'react';
import { StyleSheet, Text} from 'react-native';

export default function MyPanel(props) {
  // const [value, onChangeText] = React.useState(props.value);

  return (
      <Text style={styles.panel}>
      </Text>
      
  );
};

const styles = StyleSheet.create({
  panel:{
    flex: 1,
    backgroundColor: '#be5186',
    height: '100%',
    padding: 20,
    paddingTop: 20,
  }
});