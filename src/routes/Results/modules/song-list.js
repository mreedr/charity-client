import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_SONGS_WITH_VOTES = 'GET_SONGS_WITH_VOTES'

// ------------------------------------
// Actions
// ------------------------------------

export function getSongsWithVotes() {
  return ((dispatch, getState) => {
    return axios.get(`${API_URL}/songs-with-votes`)
      .then((songs) => {
        dispatch({
          type: GET_SONGS_WITH_VOTES,
          songs: songs
        })
      })
      .catch((err) => console.log(err));
  });
}

export const actions = {
  getSongsWithVotes
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_SONGS_WITH_VOTES]: (state, action) => {
    const songs = action.songs
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
