import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import Markdown from 'react-native-markdown-display';

export default function MyPreview(props) {

  return (
      <Text style={styles.preview}>
      <Markdown style={bodyStyle}>
          {props.value}
      </Markdown>
      </Text>
      
  );
};

const styles = StyleSheet.create({
  preview: {
    flex:2,
    backgroundColor: '#d188b5',
    height: '100%',
  }
});

const bodyStyle = {
  body: {
    padding: 20,
    paddingTop: 10,
  }
}