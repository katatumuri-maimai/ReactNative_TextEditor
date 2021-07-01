import React, { Component } from 'react';
import { View, StyleSheet, Text, Button, Pressable,SafeAreaView} from 'react-native';

export default function MenuBar(props) {

  return (
    <SafeAreaView style={styles.menuBar}>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>閉じたい</Text>
    </Pressable>
      <Text>🐌SimpleMarkdown</Text>
    </SafeAreaView>
      
  );
};

const styles = StyleSheet.create({
  menuBar: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#35071e'
  },
  button: {
    backgroundColor: '#FFFFFF',
    width: 70,
    height: 20,

  },
  buttonText: {
    color: '#35071e'
  }
});