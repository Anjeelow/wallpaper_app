import {ScrollView, View, Text, StyleSheet} from 'react-native';

import React, {useEffect, useState, useLayoutEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Style} from '../styles/Global';

export default function HelpScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={Style.pageContainer}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={Style.textStyle.category}>
            How to download wallpaper
          </Text>
          <View>
            <Text style={Style.textStyle.key}>
              1. On the landing screen. Choose any wallpaper you want to choose
              then press the image to view the wallpaper.
            </Text>
            <Text style={Style.textStyle.key}>
              2. There are two main ways to download wallpaper. Take note that
              you must allow file access in order to download images.
            </Text>
            <Text style={[Style.textStyle.key, {paddingLeft: 16}]}>
              2.1. In the View Wallpaper Screen, you can press the green
              download button to start downloading the image.
            </Text>
            <Text style={[Style.textStyle.key, {paddingLeft: 16}]}>
              2.2.1 In the View Wallpaper Screen. Press the wallpaper to view
              the wallpaper full screen.
            </Text>
            <Text style={[Style.textStyle.key, {paddingLeft: 16}]}>
              2.2.2 To download wallpaper on the page, simply press the image
              and a prompt will appear asking if you want to download the
              wallpaper.  Press Yes, and the image should start downloading.
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <Text style={Style.textStyle.category}>
            How to search for a wallpaper
          </Text>
          <View>
            <Text style={Style.textStyle.key}>
              1. In the landing screen. Press the search icon
              <Icon
                name="search"
                color="rgba(255, 255, 255, .9)"
                size={16}
                style={{backgroundColor: 'transparent'}}
              />
              . This will navigate you the the Search Page
            </Text>
            <Text style={Style.textStyle.key}>
              2. On the search page, the latest wallpaper will be shown. To
              search, press the search icon on the upper-right of the screen,
              then type your search query. Take note that you cannot press enter
              when searching, and you should wait a few seconds in the search
              bar for your search to load.
            </Text>
          </View>
        </View>
      </ScrollView>
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
});
