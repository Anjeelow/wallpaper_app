import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Style} from '../styles/Global';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default function AboutScreen({navigation}) {
  return (
    <View
      style={{
        height: '100%',
        padding: 20,
        paddingTop: 0,
        width: '100%',
        backgroundColor: '#212121',
      }}>
      <View style={styles.container}>
        <Icon name="photo" color="white" size={80} />
        <Text style={styles.center}>
          "Wallpaper" delivers high-quality, curated wallpapers, utilizing React
          Native for a smooth experience and the Wallhaven API for an extensive
          selection.
        </Text>
      </View>
      <Text style={[styles.center, {paddingTop: 16}]}>
        Created by GCash Mod Unli Money
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 8,
    alignItems: 'center',
  },
  center: {
    color: 'white',
    textAlign: 'center',
  },
});
