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

export default function WallpaperScreen() {
  const dimension = Dimensions.get('window');
  const route = useRoute();
  const id = route.params?.id;

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getWallpapers = async () => {
    try {
      const response = await fetch(`https://wallhaven.cc/api/v1/w/${id}`);
      const json = await response.json();
      setData([json.data]);
    } catch(error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    getWallpapers();
  }, []);

  return (
    <View
      style={{
        height: dimension.height,
        width: dimension.width,
        paddingTop: 0,
        backgroundColor: '#31363F',
      }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => {
            return (
              <Image
                style={{height: dimension.height}}
                source={{uri: item.thumbs.large}}
              />
            );
          }}
        />
      )}
    </View>
  );
}
