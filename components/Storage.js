import React, { Component } from 'react';
import { View, StyleSheet, Text, AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';

//ストレージの設定
var storage = new Storage({
  // 最大容量, 1000がデフォルト 
  size: 1000,

  // AsyncStorageを使う（WEBでもRNでも）。
  // セットしないとリロードでデータが消えるよ。
  storageBackend: AsyncStorage,

  // （たぶん）キャッシュの期限。デフォルトは一日(1000 * 3600 * 24 milliseconds).
  // nullにも設定できて、期限なしの意味になるよ。
  defaultExpires: 1000 * 3600 * 24,

  // メモリにキャッシュするかどうか。デフォルトは true。
  enableCache: true,

  // リモートシンクの設定（だと思う。）
  sync: {
    // これについては後述
  }
})

function fileData(filename, filetext) {
  filename = filename + '.md'
  return {
    id: 'id',
    data: {
      name: filename,
      date: new Date(),
      text: filetext,
    }
  }
}


export default function MyPanel(props) {
  // const [value, onChangeText] = React.useState(props.value);

  return (
      <Text style={styles.panel}>
      </Text>
      
  );
};

const styles = StyleSheet.create({
  panel:{
    flex: 1,
    backgroundColor: '#be5186',
    height: '100%',
    padding: 20,
    paddingTop: 20,
  }
});