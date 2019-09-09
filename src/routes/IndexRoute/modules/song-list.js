import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------
export const SELECT_SONG = 'SELECT_SONG'
export const POST_VOTE = 'POST_VOTE'
export const GET_SONGS = 'GET_SONGS'

// ------------------------------------
// Actions
// ------------------------------------
export function selectSong(id) {
  return {
    type: SELECT_SONG,
    id
  }
}

export function getSongs() {
  return ((dispatch, getState) => {
    return axios.get(`${API_URL}/songs`)
      .then((songs) => {
        dispatch({
          type: GET_SONGS,
          songs: songs.data
        })
      })
      .catch(console.log);
  });
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const vote = (token, name, email) => {
  return (dispatch, getState) => {
    let { songs } = getState().index
    songs = Object.keys(songs).filter((songId) => songs[songId].isSelected)

    return axios.post(`${API_URL}/vote`, {
      songs,
      name,
      email,
      token
    })
    .then(() => {
      // payment was successful
      dispatch({
        type: POST_VOTE,
        vote: 'change pages'
      })
    })
  }
}

export const actions = {
  selectSong,
  vote,
  getSongs
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SELECT_SONG]: (state, action) => {
    const newState = { ...state }
    newState.songs[action.id].isSelected = !state.songs[action.id].isSelected
    return {
      ...newState
    }
  },
  [POST_VOTE]: (state/*, action*/) => {
    return {
      ...state
    }
  },
  [GET_SONGS]: (state, action) => {
    const songs = {}
    for (let i = 0; i < action.songs.length; i++) {
      const song = action.songs[i]
      songs[song.id] = song
      songs[song.id].isSelected = false
    }
    return {
      ...state,
      songs
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function counterReducer(state = {}, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
