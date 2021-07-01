import React, { Component } from 'react';
import { StyleSheet, Text, TextInput} from 'react-native';

export default function MyTextArea(props) {
  const [value, onChangeText] = React.useState(props.value);

  function onChange(text){
    onChangeText(text)
    return props.onChange(text)
  }

  return (
    <TextInput
      style={styles.container}
      multiline={true}
      numberOfLines={4}
      onChangeText={text => onChange(text)}
      placeholder="Hello World!"
      value={value} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#FFFFFF',
    height: '100%'
  },
});