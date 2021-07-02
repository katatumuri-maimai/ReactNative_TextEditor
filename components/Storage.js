import AsyncStorage from '@react-native-async-storage/async-storage';
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

export function fileData(dataKey,filetitle, filetext) {
  const filename = filetitle + '.md'
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
  storage.remove(fileData);
}

export async function loadFileData(fileData) {
  const data = await storage.load(fileData).then(ret => {
    // ロードに成功したら
    // console.log('S 47>>' + ret.name + ' is ' + JSON.stringify(ret));
    return ret
  }).catch(err => {
    // ロードに失敗したら
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
  // console.log('S 63>>' + JSON.stringify(a));

  return data
}

export async function GetAllData(){
    let data = []
    keys = await AsyncStorage.getAllKeys()
  // console.log(keys);
  
  for(let i in keys){
    const key = keys[i];
    const json = await loadFileData({ key: key });
    // console.log(keys[i] + ">>" + loadFileData({ key: key }));
    if(!json===false){
      data.push({[key]:await loadFileData({ key: key })})
      // console.log(await loadFileData({ key: key }));
    }
  }
  console.log('S 73>>' + JSON.stringify(data));
  return data
}