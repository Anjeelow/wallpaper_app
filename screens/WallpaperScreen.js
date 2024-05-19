import {
  Pressable,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {Style} from '../styles/Global';

import Icon from 'react-native-vector-icons/MaterialIcons';

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

  navigation.setOptions({
    headerShown: false,
    contentStyle: {borderTopWidth: 0},
  });

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
        <ActivityIndicator />
      ) : (
        <Image
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}
          source={{uri: data.path}}
        />
      )}
    </View>
  );
}
