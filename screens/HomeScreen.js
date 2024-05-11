import {
  Pressable,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, {useEffect, useState} from 'react';
import {Style} from '../styles/Global';

export default function HomeScreen({navigation}) {
  const colors = [
    {id: 0, color: '#660000'},
    {id: 1, color: '#990000'},
    {id: 2, color: '#cc0000'},
    {id: 4, color: '#cc3333'},
    {id: 5, color: '#ea4c88'},
    {id: 6, color: '#993399'},
    {id: 7, color: '#663399'},
    {id: 8, color: '#333399'},
    {id: 9, color: '#0066cc'},
    {id: 10, color: '#0099cc'},
    {id: 11, color: '#66cccc'},
    {id: 12, color: '#77cc33'},
    {id: 13, color: '#669900'},
    {id: 14, color: '#336600'},
    {id: 15, color: '#666600'},
    {id: 16, color: '#999900'},
    {id: 17, color: '#cccc33'},
    {id: 18, color: '#ffff00'},
    {id: 19, color: '#ffcc33'},
    {id: 20, color: '#ff9900'},
    {id: 21, color: '#ff6600'},
    {id: 22, color: '#cc6633'},
    {id: 23, color: '#996633'},
    {id: 24, color: '#663300'},
    {id: 25, color: '#000000'},
    {id: 26, color: '#999999'},
    {id: 27, color: '#cccccc'},
    {id: 28, color: '#ffffff'},
    {id: 29, color: '#424153'},
  ];

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getWallpapers = async () => {
    try {
      const response = await fetch(
        `https://wallhaven.cc/api/v1/search?page=${currentPage}`,
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
    getWallpapers();
  }, [currentPage]);

  const wallpapernumColumns = 3;
  const colornumColumns = 6;
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
    <View style={{height: '100%', width: '100%'}} backgroundColor="#212121">
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 100,
          padding: 20,
          width: '100%',
        }}>
        <Pressable
          onPress={() => navigation.navigate('Top')}
          style={Style.buttonContainer}
          backgroundColor="#75A47F">
          <Icon
            name="trophy"
            color="rgba(255, 255, 255, .9)"
            size={24}
            style={{backgroundColor: 'transparent'}}
          />
          <View>
            <Text style={{fontSize: 13, color: 'white', fontWeight: 'bold'}}>
              Top Wallpaper
            </Text>
            <Text style={{fontSize: 8, color: 'white'}}>
              See popular wallpapers!
            </Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Hot')}
          style={Style.buttonContainer}
          backgroundColor="#E72929">
          <Icon
            name="fire"
            color="rgba(255, 255, 255, .9)"
            size={24}
            style={{backgroundColor: 'transparent'}}
          />
          <View>
            <Text style={{fontSize: 13, color: 'white', fontWeight: 'bold'}}>
              Hot Wallpaper
            </Text>
            <Text style={{fontSize: 8, color: 'white'}}>
              See hot wallpapers!
            </Text>
          </View>
        </Pressable>
      </View>

      <View style={{height: 100, padding: 20, paddingTop: 0, width: '100%'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <Text style={{fontSize: 24, color: 'white'}}>Colors</Text>
          <Pressable
            onPress={() => navigation.navigate('Colors')}
            style={{alignItems: 'flex-end'}}>
            <Text style={{fontSize: 12, color: 'white'}}>See All</Text>
          </Pressable>
        </View>
        <FlatList
          numColumns={colornumColumns}
          data={colors}
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
                <View
                  style={[
                    Style.colorContainer,
                    {backgroundColor: item.color},
                  ]}></View>
              );
            }
          }}
        />
      </View>

      <View style={{height: '80%', padding: 20, paddingTop: 0, width: '100%'}}>
        <Text style={{fontSize: 24, color: 'white'}}>Wallpaper</Text>
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
                      style={[
                        Style.wallpaperContainer,
                        Style.invisiblecontainer,
                      ]}
                    />
                  );
                } else {
                  return (
                    <Pressable
                      onPress={() => navigation.navigate(' ', {id: item.id})}
                      style={Style.wallpaperContainer}>
                      <Image
                        style={Style.wallpaper}
                        source={{uri: item.thumbs.large}}
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
    </View>
  );
}
