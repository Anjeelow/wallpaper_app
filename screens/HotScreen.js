import {
  Pressable,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Style} from '../styles/Global';

export default function HotScreen({navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getWallpapers = async () => {
    try {
      const response = await fetch(
        'https://wallhaven.cc/api/v1/search?sorting=hot&purity=111',
      );
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

  const wallpapernumColumns = 3;
  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;

    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({key: `blank-${numberOfElementsLastRow}`, empty: true});
      numberOfElementsLastRow = numberOfElementsLastRow + 1;
    }

    return data;
  };

  return (
    <View style={Style.pageContainer}>
      <View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            numColumns={wallpapernumColumns}
            data={formatData(data, wallpapernumColumns)}
            keyExtractor={({id}) => id}
            renderItem={({item}) => {
              if (item.empty === true) {
                return (
                  <View
                    style={[Style.wallpaperContainer, Style.invisiblecontainer]}
                  />
                );
              } else {
                return (
                  <Pressable
                    onPress={() =>
                      navigation.navigate('ViewWallpaper', {id: item.id})
                    }
                    style={Style.wallpaperContainer}>
                    <Image
                      style={Style.wallpaper}
                      source={{uri: item.thumbs.large}}
                    />
                  </Pressable>
                );
              }
            }}
          />
        )}
      </View>
    </View>
  );
}
