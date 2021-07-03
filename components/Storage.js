import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage';

//ストレージの設定
var storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
})

export function fileData(dataKey, filename, filetext) {
  const date = new Date()
  return ({
    key: dataKey,
    data: {
      name: filename,
      date: date,
      text: filetext
    }
  })
}

export function saveFileData(fileData) {
  storage.save(fileData);
}

export async function loadFileData(fileData) {
  const data = await storage.load(fileData).then(ret => {
    return ret
  }).catch(err => {
    console.warn('S 54>>'+ JSON.stringify(fileData.key) + ">>>>" + err.message + ">>>>" +err);
    switch (err.name) {
      case 'NotFoundError':
        // 見つかんなかった場合の処理を書こう
        break;
      case 'ExpiredError':
        // キャッシュ切れの場合の処理を書こう
        break;
    }
  });
  return data
}

export async function GetAllData(){
    let data = []
    keys = await AsyncStorage.getAllKeys()
  // console.log(keys);
  
  for(let i in keys){
    const key = keys[i];
    const json = await loadFileData({ key: key });
    if(!json===false){
      data.push({[key]:await loadFileData({ key: key })})
    }
  }
  return data
}