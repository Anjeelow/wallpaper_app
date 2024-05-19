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
  const [isLoading, setLoading] = useState(true);
  const [isFilter, setFilter] = useState(false);
  const [isModal, setModal] = useState(false);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const timeoutRef = useRef(null);

  const filter = {
    category: [
      '100', //General
      '101', //Anime
      '111', //People, default
    ],
    purities: [
      '100', //sfw
      '110', //sketchy
    ],
    sorting: [
      'date_added', //default
      'relevance',
      'random',
      'views',
      'favorites',
      'toplist',
    ],
    topRange: ['1d', '3d', '1w', '1M', '3M', '6M', '1y'], //1M default
    order: ['desc', 'asc'], //desc default
  };

  const getWallpapers = async searchQuery => {
    try {
      const response = await fetch(
        `https://wallhaven.cc/api/v1/search?q=${searchQuery}&order=`,
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
    getWallpapers('');
  }, []);

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
      headerRight: () => (
        <Button title="filter" onPress={() => setModal(true)} />
      ),
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
    <View
      style={{
        height: '100%',
        padding: 20,
        paddingTop: 0,
        width: '100%',
        backgroundColor: '#212121',
      }}>
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
          />
        )}
      </View>

      <Modal
        visible={isModal}
        onRequestClose={() => setModal(false)}
        transparent={true}
        animationType="fade">
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'rgba(0,0,0,0.5)',
            alignItems: 'center',
            justifyContent: 'flex-start',
            height: '100%',
            width: '100%',
          }}>
          {/*For closing only! Workaround for it*/}
          <Pressable
            onPress={() => setModal(false)}
            style={{
              backgroundColor: 'transparent',
              height: '40%',
              width: '100%',
            }}
          />
          <View
            style={{
              width: '100%',
              height: '60%',
              backgroundColor: '#424242',
              borderTopRightRadius: 8,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Pressable onPress={() => setModal(false)}>
                <Icon
                  name="closecircleo"
                  color="white"
                  size={40}
                  style={{backgroundColor: 'transparent'}}
                />
              </Pressable>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Reset</Text>
                <Text>Filter</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
