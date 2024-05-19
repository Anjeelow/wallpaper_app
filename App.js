import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button, Pressable, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import TopScreen from './screens/TopScreen';
import HotScreen from './screens/HotScreen';
import ColorsScreen from './screens/ColorsScreen';
import WallpaperScreen from './screens/WallpaperScreen';
import ByColorScreen from './screens/ByColorScreen';
import ViewWallpaperScreen from './screens/ViewWallpaperScreen';
import AboutScreen from './screens/AboutScreen';
import SearchScreen from './screens/SearchScreen';
import FavoriteScreen from './screens/FavoriteScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: '#303030'},
          contentStyle: {borderTopColor: '#9E9E9E', borderTopWidth: 3},
          headerTitleStyle: {color: 'white'},
          headerTintColor: 'white',
        }}>
        <Stack.Screen
          name="Wallpaper"
          options={{
            headerRight: () => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: 110,
                }}>
                <Pressable>
                  <Icon
                    name="search"
                    color="rgba(255, 255, 255, .9)"
                    size={24}
                    style={{backgroundColor: 'transparent'}}
                  />
                </Pressable>
                <Pressable>
                  <Icon
                    name="favorite"
                    color="rgba(255, 255, 255, .9)"
                    size={24}
                    style={{backgroundColor: 'transparent'}}
                  />
                </Pressable>
                <Pressable>
                  <Icon
                    name="info"
                    color="rgba(255, 255, 255, .9)"
                    size={24}
                    style={{backgroundColor: 'transparent'}}
                  />
                </Pressable>
              </View>
            ),
          }}
          component={HomeScreen}
        />
        <Stack.Screen name="Top" component={TopScreen} />
        <Stack.Screen name="Hot" component={HotScreen} />
        <Stack.Screen name="Colors" component={ColorsScreen} />
        <Stack.Screen name=" " component={WallpaperScreen} />
        <Stack.Screen name="ByColor" component={ByColorScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Favorite" component={FavoriteScreen} />
        <Stack.Screen
          name="ViewWallpaper"
          component={ViewWallpaperScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
