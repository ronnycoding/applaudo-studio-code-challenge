import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Platform,
  View,
} from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import axios from 'axios'
import { SearchBar } from 'react-native-elements'

import { RootStackParamList } from '../../../App'
import { TypeAnime, SET_ANIMES } from 'providers/app-state/types'
import { Styles } from 'theme'
import { palette } from 'theme/theme'
import { useAppStateDispatch, useAppState } from 'providers/app-state'
import { BASE_API } from 'config'

const OFFSET_PAGINATION = 20

const styles = StyleSheet.create({
  cardContainer: {
    height: 150,
    width: 100,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    backgroundColor: '#000',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    opacity: 0.61,
  },
  separator: {
    width: 10,
    height: '100%',
  },
})

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HomeScreen'
>

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { Box, Text } = Styles

  const dispatch = useAppStateDispatch()
  const { animes } = useAppState()

  const [animesOffset, setAnimesOffset] = useState(0)
  const [searchTearm, setSearchTearm] = useState('')
  const [animesSearchResults, setAnimesSearchResults] = useState<TypeAnime[]>(
    [],
  )

  useEffect(() => {
    async function getAnimes() {
      try {
        const { data }: { data: { data: TypeAnime[] } } = await axios.get(
          `${BASE_API}/anime?page[limit]=${OFFSET_PAGINATION}&page[offset]=${animesOffset}`,
        )
        dispatch({ type: SET_ANIMES, payload: [...animes, ...data.data] })
      } catch (e) {
        console.error(e)
      }
    }

    if (animes.length <= animesOffset) {
      getAnimes()
    }
  }, [animesOffset])

  useEffect(() => {
    async function getSearchAnimes() {
      try {
        const { data }: { data: { data: TypeAnime[] } } = await axios.get(
          `${BASE_API}/anime?filter[text]=${encodeURI(searchTearm)}`,
        )

        setAnimesSearchResults([...data.data])
      } catch (e) {
        console.error(e)
      }
    }

    if (searchTearm) {
      getSearchAnimes()
    } else {
      setAnimesSearchResults([])
    }
  }, [searchTearm])

  useEffect(() => {
    setAnimesOffset(animes.length + OFFSET_PAGINATION)
  }, [animes.length])

  const handlerGetMoreAnimes = () => {
    setAnimesOffset(animes.length + OFFSET_PAGINATION)
  }

  const handlerSelectAnime = (animeId: string) => {
    navigation.navigate('AnimeDetailScreen', { animeId })
  }

  const handleSearchTearm = (tearm: string) => {
    setSearchTearm(tearm)
  }

  return (
    <Box
      flex={1}
      flexDirection={'column'}
      backgroundColor="mainBackground"
      paddingVertical="xl"
      paddingHorizontal="m"
    >
      <SearchBar
        placeholder="Search"
        platform="ios"
        containerStyle={{
          backgroundColor: palette.black,
        }}
        onChangeText={handleSearchTearm}
        value={searchTearm}
        onClear={() => handleSearchTearm('')}
        onCancel={() => handleSearchTearm('')}
        placeholderTextColor={palette.white}
        inputContainerStyle={{
          backgroundColor: palette.black,
        }}
        inputStyle={{
          color: palette.white,
        }}
        showCancel={false}
        cancelButtonProps={{ color: palette.white }}
      />
      <Text padding="s" color="white">
        {'Animes'}
      </Text>
      <Box>
        {animesSearchResults.length ? (
          <FlatList
            horizontal
            decelerationRate="fast"
            bounces={false}
            showsHorizontalScrollIndicator={false}
            onEndReached={handlerGetMoreAnimes}
            onEndReachedThreshold={0.5}
            ItemSeparatorComponent={
              Platform.OS !== 'android' &&
              (({ highlighted }) => (
                <View
                  style={[styles.separator, highlighted && { marginLeft: 0 }]}
                />
              ))
            }
            data={animesSearchResults}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.cardContainer}
                  onPress={() => handlerSelectAnime(item.id)}
                >
                  <ImageBackground
                    source={{ uri: item.attributes.posterImage.small }}
                    style={[{ ...StyleSheet.absoluteFillObject }, styles.image]}
                  />
                  <Text color="white" textAlign="center">
                    {item.attributes.canonicalTitle}
                  </Text>
                </TouchableOpacity>
              )
            }}
          />
        ) : (
          <FlatList
            horizontal
            decelerationRate="fast"
            bounces={false}
            showsHorizontalScrollIndicator={false}
            onEndReached={handlerGetMoreAnimes}
            onEndReachedThreshold={0.5}
            ItemSeparatorComponent={
              Platform.OS !== 'android' &&
              (({ highlighted }) => (
                <View
                  style={[styles.separator, highlighted && { marginLeft: 0 }]}
                />
              ))
            }
            data={animes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.cardContainer}
                  onPress={() => handlerSelectAnime(item.id)}
                >
                  <ImageBackground
                    source={{ uri: item.attributes.posterImage.small }}
                    style={[{ ...StyleSheet.absoluteFillObject }, styles.image]}
                  />
                  <Text color="white" textAlign="center">
                    {item.attributes.canonicalTitle}
                  </Text>
                </TouchableOpacity>
              )
            }}
          />
        )}
      </Box>
    </Box>
  )
}

export default HomeScreen
