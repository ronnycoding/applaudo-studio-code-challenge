import 'react-native-gesture-handler'
import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { palette } from 'theme/theme'
import { HomeScreen, AnimeDetailScreen } from 'screens'
import { LoadAssets } from 'components'
import AppProvider from 'providers'

export type RootStackParamList = {
  HomeScreen: undefined
  AnimeDetailScreen: { animeId: string }
}

const AppNavigatorStack = createStackNavigator<RootStackParamList>()

const fonts = {
  'Montserrat-Black': require('./assets/fonts/Montserrat-Black.ttf'),
  'Montserrat-BlackItalic': require('./assets/fonts/Montserrat-BlackItalic.ttf'),
  'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
  'Montserrat-BoldItalic': require('./assets/fonts/Montserrat-BoldItalic.ttf'),
  'Montserrat-ExtraBold': require('./assets/fonts/Montserrat-ExtraBold.ttf'),
  'Montserrat-ExtraBoldItalic': require('./assets/fonts/Montserrat-ExtraBoldItalic.ttf'),
  'Montserrat-ExtraLight': require('./assets/fonts/Montserrat-ExtraLight.ttf'),
  'Montserrat-ExtraLightItalic': require('./assets/fonts/Montserrat-ExtraLightItalic.ttf'),
  'Montserrat-Italic': require('./assets/fonts/Montserrat-Italic.ttf'),
  'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
  'Montserrat-LightItalic': require('./assets/fonts/Montserrat-LightItalic.ttf'),
  'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
  'Montserrat-MediumItalic': require('./assets/fonts/Montserrat-MediumItalic.ttf'),
  'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
  'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
  'Montserrat-SemiBoldItalic': require('./assets/fonts/Montserrat-SemiBoldItalic.ttf'),
  'Montserrat-Thin': require('./assets/fonts/Montserrat-Thin.ttf'),
  'Montserrat-ThinItalic': require('./assets/fonts/Montserrat-ThinItalic.ttf'),
}

const AppNavigator = () => {
  return (
    <AppNavigatorStack.Navigator>
      <AppNavigatorStack.Screen
        name={'HomeScreen'}
        component={HomeScreen}
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: palette.black,
          },
          headerTintColor: palette.white,
          headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
          },
        }}
      />
      <AppNavigatorStack.Screen
        name={'AnimeDetailScreen'}
        component={AnimeDetailScreen}
        options={{
          title: 'Anime Detail',
          headerStyle: {
            backgroundColor: palette.black,
          },
          headerTintColor: palette.white,
          headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
          },
        }}
      />
    </AppNavigatorStack.Navigator>
  )
}

export default function App() {
  return (
    <LoadAssets {...{ fonts }}>
      <AppProvider>
        <AppNavigator />
      </AppProvider>
    </LoadAssets>
  )
}
