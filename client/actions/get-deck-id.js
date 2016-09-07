import appLoading from './app-loading'
import appDoneLoading from './app-done-loading'
import axios from 'axios'

export const HAVE_DECK = 'HAVE_DECK'

export default function getDeckId() {
  return dispatch => {
    dispatch(appLoading())
    axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(response => {
          console.log(response.data)

              dispatch(haveDeck(response.data))
      })
      .catch(error => {
        console.log(error);
      });
      dispatch(appDoneLoading())
    }
  }




function haveDeck(deck) {
  return {
    type: HAVE_DECK,
    payload: deck
  }
}
