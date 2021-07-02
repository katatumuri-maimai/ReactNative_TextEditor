import React, { Component } from 'react';
import { StyleSheet, Text, View, Pressable} from 'react-native';

function FileList(props){
  const data = props.data()
  if (!data) {
    return (<Text>loading…🐌</Text>)
  }
  // console.log('FileList>>' + data);

  return (
    <View style={styles.filelist} >
      {data.map(e => {
        console.log(e.name);
        return (
          <Pressable key={e.name} style={styles.filelistBtn}>
            <Text style={styles.filelistText} onPress={props.loadFileData}>
              {e.name}
            </Text>
          </Pressable>
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
        <Pressable style={styles.button}><Text style={styles.buttonText} onPress={props.loadFileData}>開く</Text></Pressable>
        <Pressable style={styles.button}><Text style={styles.buttonText} onPress={props.saveFileData}>保存</Text></Pressable>
      </View>
      <FileList data={props.data}/>
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