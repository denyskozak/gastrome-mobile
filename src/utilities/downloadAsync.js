import { Asset } from 'expo-asset';

export const downloadAsync = async (uri = '', onLocalUriResult = () => {}) => {
  const asserts = await Asset.loadAsync(uri);
  // await delayForPromise(1000);
  if (asserts[0] && asserts[0].localUri) {
    return asserts[0].localUri;
  } else {
    throw new Error('Vide assert problem')
  }
}

// Version with cache big fill, todo enable it when files becomes bigger
// export const downloadAsync = async (uri = '') => {
//   const hash = await Crypto.digestStringAsync(
//     Crypto.CryptoDigestAlgorithm.SHA256,
//     uri
//   );
//   const dotSplit = uri.split('.');
//   console.log('dotSplit: ', dotSplit);
//   const info = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}${hash}`);
//
//   if (info.exists) {
//     console.log('info: ', info);
//     return info.uri;
//   } else {
//     const freeSpace = await FileSystem.getFreeDiskStorageAsync();
//     if (freeSpace < 3e+7) { // if less 30mb
//       throw new Error('storeIsFull')
//     }
//
//     const downloadResult = await FileSystem.downloadAsync(
//       uri,
//       `${FileSystem.documentDirectory}${hash}`
//     );
//
//     return downloadResult.uri;
//   }
// }