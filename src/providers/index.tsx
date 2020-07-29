import React from 'react'
import { ThemeProvider } from '@shopify/restyle'
import { ThemeProvider as RNEThemeProvider } from 'react-native-elements'

import theme from 'theme'
import { AppStateProvider } from './app-state'
import { SingleChild } from '../types'

const AppProvider = ({ children }: SingleChild) => (
  <RNEThemeProvider>
    <ThemeProvider theme={theme}>
      <AppStateProvider>{children}</AppStateProvider>
    </ThemeProvider>
  </RNEThemeProvider>
)

export default AppProvider
