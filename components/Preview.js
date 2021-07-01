import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

export default function MyPreview(props) {

  return (
      <Text style={styles.preview}>
          {props.value}
      </Text>
      
  );
};

const styles = StyleSheet.create({
  preview: {
    width:'40%',
    backgroundColor: '#d188b5',
  },
});