// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FC, useEffect, useState,useCallback} from 'react';
import { StyleSheet, Text, View, Dimensions, StatusBar, Modal, Pressable} from 'react-native';
import MyTextArea from './components/TextArea';
import MyPreview from './components/Preview';
import MyPanel from './components/Panel';
import MenuBar from './components/MenuBar';
import *as S from './components/MyAsyncStorage';
import *as FS from './components/MyFileSystem';


export default function App() {
  const [windowWidth, setWidth] = useState(100)
  const [windowHeight, setHeight] = useState(100)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const [data, setData] = useState([])
  const [dataKey, setDataKey] = useState(null)
  const [textInput, setTextInput] = useState('')
  const [fileName, setFileName] = useState(null)


  useEffect(() => {
    let Width = Dimensions.get('window').width;
    let Height = Dimensions.get('window').height;
    setWidth(Width)
    setHeight(Height)
    getAllData()
  }, []);

  

  function getAllData(){
    S.getAllData().then(e => {
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

  function onPlessSave() {
    saveFileData(textInput,dataKey, fileName)
  }
  
  function createNewFile() {
    setTextInput("")
    setDataKey(null)
    setFileName(null)
  }
  
  async function saveFileData(text,key,filename){
    setIsModalOpen(true)
    if (!text === false) {
      const data = await createFileData(text)
      { !key ? key = data.key : key = key }
      { !filename ? filename = data.filename : filename = filename }

      S.saveFileData(S.fileData(key, filename, text))
      getAllData()
      setIsSubmit(true)
    }else{
      console.log('テキストが入力されていません');
      setIsSubmit(false)
  }}
    

  async function createFileData(text) {
    console.log("createFileData>>"+dataKey);
    console.log("createFileData>>" +fileName);
    console.log("createFileData>>" +textInput);

    let key = dataKey
    let filename = fileName
    
    if (!text === false) {

      if (!filename){
        const firstRowEndPos = text.split(/\n|\r/);
        const filetitle = firstRowEndPos.filter(Boolean)[0].replace(/^#*/, '')
        filename = filetitle + '.md'
      }

      if (!key) {
        const keys = []
        for (let e in data){
          const keys_number = Object.entries(await data[e])[0][0].replace('SimpleMD','')
          keys.push(Number(keys_number))
        }
        console.log(keys);
        let max_number = Math.max(...keys)

        if (keys.length == 0){
          max_number = 0
        }
        
        key = 'SimpleMD' + (max_number + 1)
        console.log(key)
      }
      setFileName(filename)
      setDataKey(key)

      return({
        key: key,
        filename: filename
      })
  }}

  function fileListOnPress(key, filename, text) {
    setFileData(key, filename, text)
  }

  async function setFileData(key, filename, text) {
    setDataKey(key)
    setFileName(filename)
    setTextInput(text)
  }

  function onChange(text){
      setTextInput(text)
  }

  function closeModal(){
    setIsModalOpen(false)
  }

  function exportMdFile(){
    FS.exportMdFile(fileName, textInput)
  }


  async function fileSelect() {
    const filedata = await FS.fileSelect()
    const filename = filedata.filename
    const filecontent = filedata.filecontent
    const key = null

    setFileData(key, filename, filecontent)
  
    console.log(dataKey);
    console.log(fileName);
    console.log(textInput);

    return ({
      filename: filename,
      filecontent: filecontent,
      key: key
    })
  }

  async function removeData(fileData){
    await S.removeData(fileData)
    getAllData()
  }

  async function exportDirectry() {
    await FS.exportDirectry()
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
          onPlessSave={onPlessSave}
          createNewFile={createNewFile}
          data={data}
          fileListOnPress={fileListOnPress}
          exportMdFile={exportMdFile}
          fileSelect={fileSelect}
          removeData={removeData}
          exportDirectry={exportDirectry}
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
