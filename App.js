import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import Sound from 'react-native-sound';

export default function App() {
  useEffect(() => {
    RNFetchBlob.config({
      fileCache: true,
      path: RNFetchBlob.fs.dirs.DocumentDir + '/test',
    })
      .fetch('GET', 'https://soundbible.com/grab.php?id=2218&type=wav')
      .then(res => {
        console.log('The file saved to ', res.path());
        var whoosh = new Sound(res.path(), Sound.MAIN_BUNDLE, error => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
          // loaded successfully
          console.log(
            'duration in seconds: ' +
              whoosh.getDuration() +
              'number of channels: ' +
              whoosh.getNumberOfChannels(),
          );

          // Play the sound with an onEnd callback
          whoosh.play(success => {
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
          });
        });
      })
      .catch((errorMessage, statusCode) => {
        console.log('error downloading', errorMessage, statusCode);
      });
  }, []);
  return (
    <View>
      <Text>App</Text>
    </View>
  );
}
