import * as FileSystem from 'expo-file-system';
import { Share } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export async function exportMdFile(filename,content){
  const directoryUri = FileSystem.cacheDirectory + 'SimpleMarkdown/'
  const fileUri = directoryUri + encodeURIComponent(removeMarks(filename))
  

  await FileSystem.makeDirectoryAsync(directoryUri, { intermediates: true })
    .then(e=>{
      console.log("makeDirectoryAsync" + e);
  }).catch(err =>{
    console.error(err);
  })

  await FileSystem.writeAsStringAsync(fileUri, content, { encoding: FileSystem.EncodingType.UTF8 })
    .then(e => {
      console.log("writeAsStringAsync >>" + e);
    }).catch(err => {
      console.log(fileUri);
      console.error("writeAsStringAsync >>" + err);
    })

  await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 })
    .then(e => {
      // console.log("readAsStringAsync >>" + e);
  }).catch(err => {
    console.error("readAsStringAsync >>" +err);
  })

  await FileSystem.readDirectoryAsync(directoryUri)
    .then(e => {
      // console.log("readDirectoryAsync >>"+ e);
    }).catch(err => {
      console.error(err);
    })

  const shareUrl =await FileSystem.getContentUriAsync(fileUri)
  console.log(shareUrl);
  Share.share({url:shareUrl})
    .then(e => {
      console.log(Share.sharedAction);
    }).catch(err => {
      console.error(err);
    })
  
}

export async function exportDirectry(filename, content) {
  const documentFileUri = FileSystem.documentDirectory +'RCTAsyncLocalStorage/manifest.json'
  const cacheDirectoryUri = FileSystem.cacheDirectory + 'SimpleMarkdown/BackupTemp/'
  const dataList = []

  const documents = await FileSystem.readAsStringAsync(documentFileUri, { encoding: FileSystem.EncodingType.UTF8 })
    .then(e => {
      // console.log("readAsStringAsync >>"+ e);
      return JSON.parse(e)
    }).catch(err => {
      console.error(err);
    })

  for (const key in documents) {
    const SimpleMD_key = /^SimpleMD.*/

    if (SimpleMD_key.test(key)){
      const data = await JSON.parse(documents[key])
      dataList.push(await data.rawData);
    }
  }

  dataList.map(async e =>{
    const name = e.name
    const content = e.text
    const fileUri = cacheDirectoryUri + encodeURIComponent(removeMarks(name))

    await FileSystem.makeDirectoryAsync(cacheDirectoryUri, { intermediates: true })
      .then(e => {
        console.log("makeDirectoryAsync" + e);
      }).catch(err => {
        console.error(err);
      })

    await FileSystem.writeAsStringAsync(fileUri, content, { encoding: FileSystem.EncodingType.UTF8 })
      .then(e => {
        console.log("writeAsStringAsync >>" + e);
      }).catch(err => {
        console.log(fileUri);
        console.error("writeAsStringAsync >>" + err);
      })

    await FileSystem.readDirectoryAsync(cacheDirectoryUri)
      .then(e => {
        console.log("readDirectoryAsync >>"+ e);
      }).catch(err => {
        console.error(err);
      })

    
  })

  const shareUrl = await FileSystem.getContentUriAsync(cacheDirectoryUri)
  console.log(shareUrl);
  Share.share({ url: shareUrl })
    .then(e => {
      console.log(Share.sharedAction);
    }).catch(err => {
      console.error(err);
    })

  
}



function removeMarks(filename) {
  const marks = ["\\", '/', ':', '*', '?', 'a', "<", ">", '|', /^ */g, /^　*/g];
  let filename_removeMarks = filename;
  for (const i in marks) {
    filename_removeMarks = filename_removeMarks.replaceAll(marks[i], '')
    }
  return(filename_removeMarks);
  }



export async function fileSelect(){
  const data = await DocumentPicker.getDocumentAsync()
  const state = data.type

  if(state == "success"){
    const filename = data.name
    const fileUri = data.uri

    const filecontent = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 })
      .then(e => {
        console.log("readAsStringAsync >>" + e);
        return e
      }).catch(err => {
        console.error("readAsStringAsync >>" + err);
      })
  
  return({
    filename: filename,
    filecontent: filecontent
  })
}}