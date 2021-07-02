// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FC, useEffect, useState,useCallback} from 'react';
import { StyleSheet, Text, View, Dimensions, StatusBar, Modal, Pressable} from 'react-native';
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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const [dataKey, setDataKey] = useState(null)


  useEffect(() => {
    let Width = Dimensions.get('window').width;
    let Height = Dimensions.get('window').height;
    setWidth(Width)
    setHeight(Height)
    getAllData()
  }, []);

  function getAllData(){
    S.GetAllData().then(e => {
        setData(e)
      })
  }

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
    setIsModalOpen(true)
    if (!textInput === false) {
    const firstRowEndPos = textInput.split('\n');
    const filetitle = firstRowEndPos.filter(Boolean)[0].replace(/^#*/,'')
    let key = dataKey

    if (!key){
      key = 'SimpleMD' + data.length + 1
    }
      S.saveFileData(S.fileData(key, filetitle, textInput))
      getAllData()
      setIsSubmit(true)
    }else{
      console.log('テキストが入力されていません');
      setIsSubmit(false)
  }}
    

  function createNewFile() {
    setTextInput("")
    setDataKey(null)
  }

  function fileListOnPress(key, text) {
    setTextInput(text)
    setDataKey(key)
  }


  function onChange(text){
    setTextInput(text)
  }
  function closeModal(){
    setIsModalOpen(false)
  }


 
  return (
    <View style={AppStyle()}>
      <MenuBar/>
      <Modal
        animationType={'slide'}
        presentationStyle={false}
        transparent={true}
        visible={isModalOpen}
        onRequestClose={()=>{
          console.log('とじるんるん');
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modal}>
            <Text>{isSubmit?"保存できました！":"保存できませんでした！"}</Text>
            <Pressable
            style={styles.modalBtn}
            onPress={closeModal}
            >
              <Text style={styles.modalText}>閉じる</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.appWrap}>
    
      <StatusBar hidden={true}/>
        <MyPanel
          saveFileData={saveFileData}
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
    width:300,
    height:200,
    backgroundColor:'#FFFFFF',
    borderRadius: 10,
    shadowColor: 'black',
    elevation: 30,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  modalBtn:{
    backgroundColor: '#db6bbc',
    width:100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop:20,
    marginBottom:-10,
    borderRadius: 20,
  },
  modalText:{
    color:'#FFFFFF'
  }
  
});
