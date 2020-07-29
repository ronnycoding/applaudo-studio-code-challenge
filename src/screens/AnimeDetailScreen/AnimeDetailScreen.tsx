import React, { useEffect, useState, useCallback } from 'react'
import {
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native'
import axios from 'axios'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'

import { BASE_API } from 'config'
import { TypeAnime } from 'providers/app-state/types'
import { Styles } from 'theme'
import { Genres, Episodes } from 'components'
import { RootStackParamList } from '../../../App'

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 160,
    height: 200,
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    lineHeight: 20,
  },
  subTitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    lineHeight: 18,
  },
  innerDescription: {
    flexDirection: 'column',
    flexShrink: 1,
  },
  innerContent: {
    flexShrink: 1,
  },
})

type AnimeDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'AnimeDetailScreen'
>

type AnimeDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AnimeDetailScreen'
>

interface AnimeDetailScreenProps {
  navigation: AnimeDetailScreenNavigationProp
  route: AnimeDetailScreenRouteProp
}

const AnimeDetailScreen = ({ navigation, route }: AnimeDetailScreenProps) => {
  const { Box, Text } = Styles
  const [animeDetail, setAnimeDetail] = useState<TypeAnime | null>(null)

  useEffect(() => {
    async function getAnimeDetail() {
      try {
        const { data }: { data: { data: TypeAnime } } = await axios.get(
          `${BASE_API}/anime/${route.params['animeId']}`,
        )
        setAnimeDetail(data.data)
      } catch (e) {
        console.error(e)
      }
    }
    getAnimeDetail()
  }, [])

  const handlePressYouTubeVideo = useCallback(
    async (youtubeVideoId: string) => {
      // Checking if the link is supported for links with custom URL scheme.
      const url = `https://youtu.be/${youtubeVideoId}`
      const supported = await Linking.canOpenURL(url)

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url)
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`)
      }
    },
    [],
  )

  return (
    <Box
      flex={1}
      flexDirection={'column'}
      backgroundColor="mainBackground"
      paddingVertical="xl"
      paddingHorizontal="m"
    >
      <ScrollView>
        <Box flexDirection={'row'}>
          <Box style={styles.imageContainer}>
            {animeDetail && (
              <ImageBackground
                source={{
                  uri: animeDetail.attributes.posterImage.small,
                }}
                style={[{ ...StyleSheet.absoluteFillObject }, styles.image]}
              />
            )}
          </Box>
          <Box style={styles.innerDescription}>
            <Text
              color="white"
              marginHorizontal="s"
              marginTop="s"
              style={styles.title}
            >
              {'Main Title'}
            </Text>
            {animeDetail && (
              <Text color="white" marginHorizontal="s" style={styles.subTitle}>
                {animeDetail.attributes.abbreviatedTitles}
              </Text>
            )}
            <Text
              color="white"
              marginHorizontal="s"
              marginTop="s"
              style={styles.title}
            >
              {'Canonical Title'}
            </Text>
            {animeDetail && (
              <Text color="white" marginHorizontal="s" style={styles.subTitle}>
                {animeDetail.attributes.canonicalTitle}
              </Text>
            )}
            <Text
              color="white"
              marginHorizontal="s"
              marginTop="s"
              style={styles.title}
            >
              {'Type'}
            </Text>
            {animeDetail && (
              <Text color="white" marginHorizontal="s" style={styles.subTitle}>
                {`${animeDetail.type}, ${
                  animeDetail.attributes.episodeCount || '0'
                } episodes.`}
              </Text>
            )}
            <Text
              color="white"
              marginHorizontal="s"
              marginTop="s"
              style={styles.title}
            >
              {'Year'}
            </Text>
            {animeDetail && (
              <Text color="white" marginHorizontal="s" style={styles.subTitle}>
                {`${animeDetail.attributes.startDate} till ${animeDetail.attributes.endDate}`}
              </Text>
            )}
          </Box>
        </Box>
        <Box flexDirection="column" paddingTop="m" style={styles.innerContent}>
          <Text
            color="white"
            marginHorizontal="s"
            marginTop="s"
            style={styles.title}
          >
            {'Genres'}
          </Text>
          <Genres id={route.params['animeId']} />
          <Box flexDirection="row">
            <Box flex={1}>
              <Text
                color="white"
                marginHorizontal="s"
                marginTop="s"
                style={styles.title}
              >
                {'Average Rating'}
              </Text>
              {animeDetail && (
                <Text
                  color="white"
                  marginHorizontal="s"
                  style={styles.subTitle}
                >
                  {`${animeDetail.attributes.averageRating}`}
                </Text>
              )}
            </Box>
            <Box flex={1}>
              <Text
                color="white"
                marginHorizontal="s"
                marginTop="s"
                style={styles.title}
              >
                {'Age Rating'}
              </Text>
              {animeDetail && (
                <Text
                  color="white"
                  marginHorizontal="s"
                  style={styles.subTitle}
                >
                  {`${animeDetail.attributes.ageRating}`}
                </Text>
              )}
            </Box>
          </Box>
          <Box flexDirection="row">
            <Box flex={1}>
              <Text
                color="white"
                marginHorizontal="s"
                marginTop="s"
                style={styles.title}
              >
                {'Episode Duration'}
              </Text>
              {animeDetail && (
                <Text
                  color="white"
                  marginHorizontal="s"
                  style={styles.subTitle}
                >
                  {`${animeDetail.attributes.episodeCount}`}
                </Text>
              )}
            </Box>
            <Box flex={1}>
              <Text
                color="white"
                marginHorizontal="s"
                marginTop="s"
                style={styles.title}
              >
                {'Airing Status'}
              </Text>
              {animeDetail && (
                <Text
                  color="white"
                  marginHorizontal="s"
                  style={styles.subTitle}
                >
                  {`${animeDetail.attributes.status}`}
                </Text>
              )}
            </Box>
          </Box>
          <Text
            color="white"
            marginHorizontal="s"
            marginTop="s"
            style={styles.title}
          >
            {'Synopsis'}
          </Text>
          {animeDetail && (
            <Text color="white" marginHorizontal="s" style={styles.subTitle}>
              {`${animeDetail.attributes.synopsis}`}
            </Text>
          )}
          <Episodes id={route.params['animeId']} />
          <Box padding="s">
            {animeDetail && (
              <TouchableOpacity
                onPress={() =>
                  handlePressYouTubeVideo(animeDetail.attributes.youtubeVideoId)
                }
              >
                <Text color="white" marginHorizontal="s" style={styles.title}>
                  {'Open YouTube Video'}
                </Text>
              </TouchableOpacity>
            )}
          </Box>
        </Box>
      </ScrollView>
    </Box>
  )
}

export default AnimeDetailScreen
