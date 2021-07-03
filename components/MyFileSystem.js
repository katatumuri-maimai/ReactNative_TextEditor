import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

export default async function saveMdFile(){
  // MediaLibrary.requestPermissionsAsync()
  // console.log(MediaLibrary.presentPermissionsPickerAsync())
  // console.log(MediaLibrary.getPermissionsAsync())
  const directoryUri = FileSystem.documentDirectory + 'SimpleMarkdown/'
  const fileUri = directoryUri + 'test.md'
  // FileSystem.makeDirectoryAsync(fileUri, { intermediates: true })
  //   .then(e=>{
  //     console.log("makeDirectoryAsync" + e);
  // }).catch(err =>{
  //   console.error(err);
  // })

  // FileSystem.writeAsStringAsync(fileUri, "Hello World", { encoding: FileSystem.EncodingType.UTF8 })
  //   .then(e => {
  //     console.log("writeAsStringAsync >>" + e);
  //   }).catch(err => {
  //     console.error(err);
  //   })

  FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 })
    .then(e => {
      console.log("readAsStringAsync >>" + e);
  }).catch(err => {
    console.error(err);
  })

  FileSystem.deleteAsync(fileUri)
    .then(e => {
      console.log("deleteAsync" + e);
    }).catch(err => {
      console.error(err);
    })

  FileSystem.readDirectoryAsync(directoryUri)
    .then(e => {
      console.log("readDirectoryAsync >>"+ e);
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