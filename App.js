import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button, View} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import TopScreen from "./screens/TopScreen";
import HotScreen from "./screens/HotScreen"
import ColorsScreen from './screens/ColorsScreen';
import WallpaperScreen from './screens/WallpaperScreen';
import ByColorScreen from './screens/ByColorScreen';

const Stack = createNativeStackNavigator()

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{headerStyle: { backgroundColor: '#31363F'},
                      contentStyle: {borderTopColor: 'white',borderTopWidth: 3,},
                      headerTitleStyle: {color: 'white'},
                      headerTintColor: 'white',
      }}
      >
        <Stack.Screen name="Wallpaper" options={{
          headerRight: () => (
            <View
            style={{flexDirection: 'row', justifyContent: "space-between", width: 100}}
            >
              <Icon name="search" color="rgba(255, 255, 255, .9)"size={24} style={{backgroundColor: 'transparent'}}/>
              <Icon name="favorite" color="rgba(255, 255, 255, .9)"size={24} style={{backgroundColor: 'transparent'}}/>
              <Icon name="info" color="rgba(255, 255, 255, .9)"size={24} style={{backgroundColor: 'transparent'}}/>
            </View>
          ),
        }} component={HomeScreen}/>
        <Stack.Screen name="Top" component={TopScreen}/>
        <Stack.Screen name="Hot" component={HotScreen}/>
        <Stack.Screen name="Colors" component={ColorsScreen}/>
        <Stack.Screen name=" " component={WallpaperScreen}/>
        <Stack.Screen name="ByColor" component={ByColorScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}