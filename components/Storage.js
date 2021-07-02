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

export function fileData(filetitle, filetext) {
  const filename = filetitle + '.md'
  const date = new Date().toLocaleString()
  return ({
    key: 'mdfile',
    id: 'id',
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

export function loadFileData(fileData) {
  storage.load(fileData).then(ret => {
    // ロードに成功したら
    console.log(ret.name + ' is ' + ret.text);
  }).catch(err => {
    // ロードに失敗したら
    console.warn(err.message);
    switch (err.name) {
      case 'NotFoundError':
        // 見つかんなかった場合の処理を書こう
        break;
      case 'ExpiredError':
        // キャッシュ切れの場合の処理を書こう
        break;
    }
  });
}