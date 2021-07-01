// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FC, useEffect, useState} from 'react';
import { StyleSheet, TextInput, View, Dimensions} from 'react-native';
import MyTextArea from './components/TextArea';
import MyPreview from './components/Preview';
import MyPanel from './components/Panel';
// import './styles/style.css';

export default function App() {
  const [windowWidth, setWidth] = useState(100)
  const [windowHeight, setHeight] = useState(100)
  const [textInput, setTextInput] = useState('')

  useEffect(() => {
    let Width = Dimensions.get('window').width;
    let Height = Dimensions.get('window').height;
    setWidth(Width)
    setHeight(Height)
  }, []);
  

  function AppStyle(){
    return ({
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'stretch',
      width: windowWidth,
      height: windowHeight,
      backgroundColor: '#f3b4e0',
    })
  }


  function onChange(text){
    setTextInput(text)
  }
 
 
  return (
    <View style={AppStyle()}>
        <MyPanel
        value="panel"
        />
      <MyTextArea
        onChange={text => onChange(text)}
      />
        <MyPreview
        value={textInput}
        />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     alignItems: 'stretch',
//     // width: '100%',
//     // height: '100%',
//     backgroundColor: 'black',
//     // alignItems: 'center',
//     // justifyContent: 'center',
//   },
// });
