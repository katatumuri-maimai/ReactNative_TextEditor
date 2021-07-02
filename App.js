// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FC, useEffect, useState} from 'react';
import { StyleSheet, Text, View, Dimensions, StatusBar} from 'react-native';
import MyTextArea from './components/TextArea';
import MyPreview from './components/Preview';
import MyPanel from './components/Panel';
import MenuBar from './components/MenuBar';
import *as S from './components/Storage';

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
  
  function saveFileData(){
    const firstRowEndPos = textInput.split('\n');
    const filetitle = firstRowEndPos.filter(Boolean)[0]
    S.saveFileData(S.fileData(filetitle, textInput))
  }

  function loadFileData(){
    S.loadFileData({
      key: 'mdfile',
      id: 'id'})
  }

  function GetAllData() {
    const [data, setData] = useState('')
    let fileList = []

    useEffect(() => {
      S.GetAllData().then(e => {
        setData(e)
      })
    }, []);
    // console.log(data);

    if(!data){
      return (<Text>loading…🐌</Text>)
    }

    console.log(data);

    return (
      <Text>
        {data.map(e=>{
        console.log(e.name);
          return <Text>{e.name}</Text>
      })}
      </Text>
    )
  }

  function AppStyle(){
    return ({
      flex: 1,
      flexDirection: 'column',
      flexWrap: 'wrap',
      alignItems: 'stretch',
      width: windowWidth,
      height: windowHeight,
      backgroundColor: '#f3b4e0',
      textAlign: 'left'
    })
  }
  


  function onChange(text){
    setTextInput(text)
  }

 
  return (
    <View style={AppStyle()}>
      <MenuBar/>

      <View style={styles.appArap}>
    
      <StatusBar hidden={true}/>
        <MyPanel
          saveFileData={saveFileData}
          loadFileData={loadFileData}
        />
      <MyTextArea
        onChange={text => onChange(text)}
      />
        <MyPreview
        value={textInput}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appArap: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    height: '100%',
  },
  
});
