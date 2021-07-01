import React, { Component } from 'react';
import { StyleSheet, Text} from 'react-native';

export default function MyPanel(props) {
  // const [value, onChangeText] = React.useState(props.value);

  return (
      <Text style={styles.panel}>
        {props.value}
      </Text>
      
  );
};

const styles = StyleSheet.create({
  panel:{
    flex: 1,
    backgroundColor: '#be5186',
    height: '100%'
  }
});