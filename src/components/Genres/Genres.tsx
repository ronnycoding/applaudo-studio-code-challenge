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

interface GenreType {
  id: string
  attributes: {
    name: string
    slug: string
    description: string
  }
}

interface GenresPros {
  id: string
}

const Genres = ({ id }: GenresPros) => {
  const { Box, Text } = Styles
  const [animeGenres, setAnimeGenres] = useState<GenreType[] | null>(null)
  useEffect(() => {
    async function getanimeGenres() {
      try {
        const { data }: { data: { data: GenreType[] } } = await axios.get(
          `${BASE_API}/anime/${id}/genres`,
        )
        setAnimeGenres(data.data)
      } catch (e) {
        console.error(e)
      }
    }
    getanimeGenres()
  }, [])

  return (
    <Box>
      {animeGenres && (
        <Text color="white" marginHorizontal="s" style={styles.subTitle}>
          {animeGenres.map((gen) => gen.attributes.name).join(', ')}
        </Text>
      )}
    </Box>
  )
}

export default Genres
