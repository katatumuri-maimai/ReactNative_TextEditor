import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Share } from 'react-native';

export async function exportMdFile(filename,content){
  // MediaLibrary.requestPermissionsAsync()
  // console.log(MediaLibrary.presentPermissionsPickerAsync())
  // console.log(MediaLibrary.getPermissionsAsync())
  const directoryUri = await FileSystem.cacheDirectory + 'SimpleMarkdown/'
  const fileUri = directoryUri + filename

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
      console.error(err);
    })

  await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 })
    .then(e => {
      console.log("readAsStringAsync >>" + e);
  }).catch(err => {
    console.error(err);
  })

  // FileSystem.deleteAsync(fileUri)
  //   .then(e => {
  //     console.log("deleteAsync" + e);
  //   }).catch(err => {
  //     console.error(err);
  //   })

  await FileSystem.readDirectoryAsync(directoryUri)
    .then(e => {
      console.log("readDirectoryAsync >>"+ e);
    }).catch(err => {
      console.error(err);
    })

  // FileSystem.readAsStringAsync(FileSystem.documentDirectory +'/RCTAsyncLocalStorage/manifest.json')
  //   .then(e => {
  //     console.log("FileSystem.documentDirectory >>" + e);
  //   }).catch(err => {
  //     console.error(err);
  //   })

  const shareUrl =await FileSystem.getContentUriAsync(fileUri)
  console.log(shareUrl);
  Share.share({url:shareUrl})
    .then(e => {
      console.log(Share.sharedAction);
    }).catch(err => {
      console.error(err);
    })
  

  // const asset = await MediaLibrary.createAssetAsync(fileUri)
  // await MediaLibrary.createAlbumAsync("Download", asset, true)
  //   .then(e => {
  //     console.log("createAlbumAsync >>" + e);
  //   }).catch(err => {
  //     console.error(err);
  //   })

}