import React, { Component } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

function FileList(props){
  const data = props.data
  
  if (!data) {
    return (<Text>loading…🐌</Text>)
  }
  
  return (
    <View style={styles.filelist} >
      {data.map((e) => {
        const key = Object.entries(e)[0][0]
        const contens = e[key]
        const filename = contens.name
        const title = contens.name.replace(/.md$/,'')
        const text = contens.text

        return (
          <View key={key} >
          <Pressable style={styles.filelistBtn} onPress={() => { props.fileListOnPress(key,filename,text)}}>
            <Text style={styles.filelistText}>
              {title}
            </Text>
          </Pressable>
            <Pressable style={styles.filelistBtn}>
              <Text style={styles.filelistText} onPress={() => {props.removeData({key:key})}}>
              ファイルを削除
              </Text>
              </Pressable>
          </View>
        )
      })}
    </View>
  )
}


export default function MyPanel(props) {
  // const [value, onChangeText] = React.useState(props.value);

  return (
    <View style={styles.panelBody}>
      <View style={styles.panelMenu}>
        <Pressable style={styles.button}><Text style={styles.buttonText} onPress={props.createNewFile}>新規作成</Text></Pressable>
        <Pressable style={styles.button}><Text style={styles.buttonText} onPress={props.onPlessSave}>保存</Text></Pressable>
        </View>
      <View style={styles.panelMenu}>
        <Pressable style={styles.button}><Text style={styles.buttonText} onPress={props.exportMdFile}>エクスポート</Text></Pressable>
        <Pressable style={styles.button}><Text style={styles.buttonText} onPress={props.fileSelect}>開く</Text></Pressable>
        <Pressable style={styles.button}><Text style={styles.buttonText} onPress={props.exportDirectry}>バックアップ</Text></Pressable>
      </View>
      <FileList data={props.data} fileListOnPress={props.fileListOnPress} removeData={props.removeData}/>
    </View>
  );
};

const styles = StyleSheet.create({
  panelBody:{
    flex: 1,
    backgroundColor: '#be5186',
    height: '100%'
  },
  panelMenu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    flex:1,
    borderLeftWidth: 0.5,
    backgroundColor: '#472c43',
    height: 30,
    shadowColor:'black',
    elevation: 30,
    shadowOffset:{width: 2,height:2},
    shadowOpacity:0.5,
    shadowRadius:5,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    textAlignVertical: 'center', 
    lineHeight:30,
  },
  filelist:{
    flex: 1,
    flexDirection:'column'
  },
  filelistBtn: {
    backgroundColor: '#fff2a1',
    borderWidth: 0.5,
    shadowColor: 'black',
    elevation: 30,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  filelistText:{
    color: '#000000',
    padding: 10
  }
});