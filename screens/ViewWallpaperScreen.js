import {
  ActivityIndicator,
  Button,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {Style} from '../styles/Global';

import Icon from 'react-native-vector-icons/MaterialIcons';

function ViewWallpaperScreen({navigation}) {
  const dimension = Dimensions.get('window');
  const route = useRoute();
  const id = route.params?.id;

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isFavorite, setFavorite] = useState(false);

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
    contentStyle: {borderTopWidth: 0},
  });

  return (
    <View
      style={[
        {
          width: dimension.width,
          height: dimension.height,
          paddingTop: 0,
          backgroundColor: '#212121',
        },
      ]}>
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
        <Pressable onPress={() => navigation.navigate(' ', {id: id})}>
          <Image
            style={[
              styles.defaultShadow,
              {width: '100%', height: dimension.height * 0.4},
            ]}
            source={{uri: data.thumbs.large}}
          />
        </Pressable>
      )}

      <View style={[styles.container, styles.titleBar, Style.defaultShadow]}>
        <View>
          <Text style={Style.textStyle.category}>
            {`${data.dimension_x}`} x {`${data.dimension_y}`}
          </Text>
          <Text style={{color: 'white'}}>
            {data.source === '' ? 'Source not provided' : data.source}
          </Text>
        </View>
        <Pressable onPress={() => setFavorite(!isFavorite)}>
          {isFavorite ? (
            <Icon
              name="favorite"
              color="red"
              size={32}
              style={{backgroundColor: 'transparent'}}
            />
          ) : (
            <Icon
              name="favorite-outline"
              color="rgba(255, 255, 255, .9)"
              size={32}
              style={{backgroundColor: 'transparent'}}
            />
          )}
        </Pressable>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <Text style={Style.textStyle.category}>Tags</Text>
          <View style={styles.textContainer.direction}>
            {data.tags &&
              data.tags.map((item, id) => (
                <Text key={id} style={styles.textContainer.border}>
                  {item.name}
                </Text>
              ))}
          </View>
        </View>

        <View style={styles.container}>
          <Text style={Style.textStyle.category}>Properties</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={{paddingRight: 16}}>
              <Text style={Style.textStyle.key}>Color</Text>
              <Text style={Style.textStyle.key}>Category</Text>
              <Text style={Style.textStyle.key}>Size</Text>
              <Text style={Style.textStyle.key}>View</Text>
              <Text style={Style.textStyle.key}>Link</Text>
            </View>

            <View>
              <View style={styles.colorList.container}>
                {data.colors &&
                  data.colors.map((item, index) => (
                    <View
                      key={index}
                      style={[styles.colorList.item, {backgroundColor: item}]}
                    />
                  ))}
              </View>
              <Text style={Style.textStyle.param}>{data.category}</Text>
              <Text style={Style.textStyle.param}>
                {data.file_size / 100000} MiB
              </Text>
              <Text style={Style.textStyle.param}>{data.views}</Text>
              <Text style={Style.textStyle.param}>{data.short_url}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/*TEMPORARY!!!*/}
      <Button
        title="Go to About"
        onPress={() => navigation.navigate('About')}
      />
      <Button
        title="Go to Favorite"
        onPress={() => navigation.navigate('Favorite')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 8,
  },
  colorList: {
    container: {
      flexDirection: 'row',
      width: 300,
      height: 16,
      marginTop: 5,
    },
    item: {width: 50, height: 16},
  },
  textContainer: {
    border: {
      color: 'white',
      borderColor: '#f0f0f0',
      borderWidth: 1,
      borderRadius: 5,
      marginTop: 5,
      marginRight: 5,
      marginBottom: 5,
      padding: 5,
    },
    direction: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  },
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#424242',
    paddingBottom: 20,
  },
});

export default ViewWallpaperScreen;
