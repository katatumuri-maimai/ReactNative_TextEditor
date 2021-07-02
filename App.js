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
  const [data, setData] = useState([])
  const [dataKey, setDataKey] = useState('')

  useEffect(() => {
    let Width = Dimensions.get('window').width;
    let Height = Dimensions.get('window').height;
    setWidth(Width)
    setHeight(Height)
  }, []);

  useEffect(() => {
    S.GetAllData().then(e => {
      setData(e)
    })
  }, []);

  function AppStyle() {
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
  
  function saveFileData(){
    const firstRowEndPos = textInput.split('\n');
    const filetitle = firstRowEndPos.filter(Boolean)[0]
    S.saveFileData(S.fileData(dataKey,filetitle, textInput))
  }

  function createNewFile() {
    S.loadFileData({
      key: 'mdfile',
      id: 'id'
    })
  }

  function fileListOnPress(key, text) {
    setTextInput(text)
    setDataKey(key)
  }


  function onChange(text){
    setTextInput(text)
  }

  function reload(){
    App.reload()
  }

 
  return (
    <View style={AppStyle()}>
      <MenuBar/>

      <View style={styles.appWrap}>
    
      <StatusBar hidden={true}/>
        <MyPanel
          saveFileData={saveFileData}
          reload={reload}
          createNewFile={createNewFile}
          data={data}
          fileListOnPress={fileListOnPress}

        />
      <MyTextArea
          onChange={text => onChange(text)}
          value={textInput}
      />
        <MyPreview
        value={textInput}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  appWrap: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    height: '100%',
  },
  
});
