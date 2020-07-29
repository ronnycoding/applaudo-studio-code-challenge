import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import axios from 'axios'
import { BASE_API } from 'config'
import { Styles } from 'theme'

const styles = StyleSheet.create({
  subTitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    lineHeight: 18,
  },
})

interface EpisodeType {
  id: string
  attributes: {
    canonicalTitle: string
    seasonNumber: string
    synopsis: string
    createdAt: string
    number: number
  }
}

interface EpisodesPros {
  id: string
}

const Episodes = ({ id }: EpisodesPros) => {
  const { Box, Text } = Styles
  const [animeEpisodes, setAnimeEpisodes] = useState<EpisodeType[] | null>(null)
  useEffect(() => {
    async function getanimeEpisodes() {
      try {
        const { data }: { data: { data: EpisodeType[] } } = await axios.get(
          `${BASE_API}/anime/${id}/episodes`,
        )
        setAnimeEpisodes(data.data)
      } catch (e) {
        console.error(e)
      }
    }
    getanimeEpisodes()
  }, [])

  return (
    <Box>
      {animeEpisodes &&
        animeEpisodes.map((epi) => (
          <Text
            key={epi.id}
            color="white"
            marginHorizontal="s"
            style={styles.subTitle}
          >
            {`Episode: ${epi.attributes.number || 'N/A'}, ${
              epi.attributes.canonicalTitle || 'N/A'
            }, Season ${epi.attributes.seasonNumber || 'N/A'}`}
          </Text>
        ))}
    </Box>
  )
}

export default Episodes
