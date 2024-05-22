import {
  Alert,
  Pressable,
  View,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  Image,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState, useLayoutEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {Style} from '../styles/Global';

import Icon from 'react-native-vector-icons/MaterialIcons';
import RNFetchBlob from 'rn-fetch-blob';

export default function WallpaperScreen({navigation}) {
  const dimension = Dimensions.get('window');
  const route = useRoute();
  const id = route.params?.id;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getWallpapers = async () => {
    try {
      const response = await fetch(`https://wallhaven.cc/api/v1/w/${id}`);
      const json = await response.json();

      setData(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWallpapers();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      contentStyle: {borderTopWidth: 0},
    });
  }, [navigation]);

  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download Photos',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage Permission Granted');
          downloadImage();
        } else {
          alert('Storage Permission Not Granted');
        }
      } catch (error) {
        console.warn(error);
      }
    }
  };

  const downloadImage = () => {
    let date = new Date();
    let image_URL = data.path;
    let ext = getExtension(image_URL);
    ext = '.' + ext[0];
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        console.log('res -> ', JSON.stringify(res));
        alert('image downloaded successfuly');
      });
  };

  const getExtension = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  return (
    <View
      style={{
        width: dimension.width,
        backgroundColor: '#212121',
      }}>
      <View style={Style.transparentHeaderBar}>
        <View style={Style.backButtonContainer}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-back"
              color="white"
              size={32}
              style={{backgroundColor: 'transparent'}}
            />
          </Pressable>
        </View>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Pressable
          onPress={() => {
            Alert.alert(
              'Download Image',
              'Do you want to download this image?',
              [
                {
                  text: 'No',
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: checkPermission,
                },
              ],
            );
          }}>
          <Image
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
            }}
            source={{uri: data.path}}
          />
        </Pressable>
      )}
    </View>
  );
}
