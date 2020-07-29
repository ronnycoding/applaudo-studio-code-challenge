import React, { createContext, useContext, useReducer } from 'react'

import {
  TypeAppInitialState,
  AppActionTypes,
  ANIME,
  SET_ANIMES,
} from 'providers/app-state/types'

import { SingleChild } from '../../types'

export const appInitialState: TypeAppInitialState = {
  animes: [],
}

type Dispatch = (action: AppActionTypes) => void

const AppStateContext = createContext<TypeAppInitialState>(appInitialState)
const AppDispatchContext = createContext<Dispatch | undefined>(undefined)

function appStateReducer(state: TypeAppInitialState, action: AppActionTypes) {
  switch (action.type) {
    case SET_ANIMES:
      return {
        ...state,
        animes: action.payload,
      }
    default:
      return state
  }
}

function useAppState() {
  const context = useContext(AppStateContext)
  if (context === undefined) {
    throw new Error('useAppState must be used within a AppStateProvider')
  }
  return context
}

function useAppStateDispatch() {
  const context = useContext(AppDispatchContext)
  if (context === undefined) {
    throw new Error(
      'useAppStateDispatch must be used within a AppStateProvider',
    )
  }
  return context
}

function AppStateProvider({ children }: SingleChild) {
  const [state, dispatch] = useReducer(appStateReducer, appInitialState)
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}

export { AppStateProvider, useAppState, useAppStateDispatch }
