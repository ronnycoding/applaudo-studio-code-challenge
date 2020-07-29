export const ANIME = 'ANIME'
export const SET_ANIMES = 'SET_ANIMES'

export interface TypeAnime {
  id: string
  type: string
  attributes: {
    posterImage: string
    canonicalTitle: string
    abbreviatedTitles: string
    synopsis: string
    episodeCount: number
    startDate: string
    endDate: string
    averageRating: string
    ageRating: string
    status: string
    youtubeVideoId: string
  }
}

export interface TypeAppInitialState {
  animes: TypeAnime[]
}

export interface SetAnimes {
  type: typeof SET_ANIMES
  payload: TypeAnime[]
}

export type AppActionTypes = SetAnimes
