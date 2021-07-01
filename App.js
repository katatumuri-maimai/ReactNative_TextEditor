// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FC, useEffect } from 'react';
import { StyleSheet, TextInput, View, Dimensions} from 'react-native';
import MyTextArea from './components/TextArea';
import MyPreview from './components/Preview';
import MyPanel from './components/Panel';
// import './styles/style.css';

export default function App() {

  useEffect(() => {
    Dimensions.addEventListener("change", ({ window }) => {
      console.log('画面サイズが変わりました')

    });
    return () => {
      Dimensions.removeEventListener("change", ({ window }) => {
        console.log("イベントを削除しました");
      });
    };
  }, []);

  function onLayout(){
    console.log(Dimensions.get('window').width);
  };


 
  return (
    <View style={styles.container} onLayout={onLayout()}>
        <MyPanel
        value="panel"
        />
        <TextInput
          placeholder="Hello World!"
        />
        <MyPreview
          value="ぷれびゅ～"
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'stretch',
    // width: '100%',
    backgroundColor: 'black',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
