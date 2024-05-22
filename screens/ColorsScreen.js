import {
  Pressable,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {Style} from '../styles/Global';

export default function ColorsScreen({navigation}) {
  const colors = [
    {id: 0, color: '660000'},
    {id: 1, color: '990000'},
    {id: 2, color: 'cc0000'},
    {id: 4, color: 'cc3333'},
    {id: 5, color: 'ea4c88'},
    {id: 6, color: '993399'},
    {id: 7, color: '663399'},
    {id: 8, color: '333399'},
    {id: 9, color: '0066cc'},
    {id: 10, color: '0099cc'},
    {id: 11, color: '66cccc'},
    {id: 12, color: '77cc33'},
    {id: 13, color: '669900'},
    {id: 14, color: '336600'},
    {id: 15, color: '666600'},
    {id: 16, color: '999900'},
    {id: 17, color: 'cccc33'},
    {id: 18, color: 'ffff00'},
    {id: 19, color: 'ffcc33'},
    {id: 20, color: 'ff9900'},
    {id: 21, color: 'ff6600'},
    {id: 22, color: 'cc6633'},
    {id: 23, color: '996633'},
    {id: 24, color: '663300'},
    {id: 25, color: '000000'},
    {id: 26, color: '999999'},
    {id: 27, color: 'cccccc'},
    {id: 28, color: 'ffffff'},
    {id: 29, color: '424153'},
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      contentStyle: {borderTopWidth: 0},
    });
  }, [navigation]);

  return (
    <View style={Style.allcolorContainer}>
      <FlatList
        data={colors}
        keyExtractor={({id}) => id}
        renderItem={({item}) => {
          return (
            <Pressable
              style={[{backgroundColor: `#${item.color}`}, Style.allcolor]}
              onPress={() =>
                navigation.navigate('ByColor', {color: item.color})
              }>
              <Text style={[Style.text]}>#{item.color}</Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
