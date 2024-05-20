import {
  Pressable,
  Alert,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  ActivityIndicator,
  FlatList,
  Image,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import React, {useEffect, useState, useRef} from 'react';
import {Style} from '../styles/Global';

export default function HotScreen({navigation}) {
  //Search
  const [search, setSearch] = useState('');

  //Data call and data store
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const timeoutRef = useRef(null);

  const [isLoading, setLoading] = useState(true);

  const getWallpapers = async searchQuery => {
    try {
      const response = await fetch(
        `https://wallhaven.cc/api/v1/search?q=${searchQuery}`,
      );
      const json = await response.json();
      setData([...data, ...json.data]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    getWallpapers('');
  }, [currentPage]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: event => {
          const newText = event.nativeEvent.text;
          setSearch(newText);

          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }

          timeoutRef.current = setTimeout(() => {
            setLoading(true);
            getWallpapers(newText);
          }, 1000);
        },
        placeholder: 'Search...',
        textColor: 'white',
        headerIconColor: 'white',
        hintTextColor: 'white',
        shouldShowHintSearchIcon: false,
      },
    });
  }, [navigation]);

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
                      source={{uri: item.thumbs.small}}
                    />
                  </Pressable>
                );
              }
            }}
            onEndReached={loadNextPage}
            onEndReachedThreshold={0}
          />
        )}
      </View>
    </View>
  );
}
