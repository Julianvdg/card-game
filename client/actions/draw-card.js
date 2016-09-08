import appLoading from './app-loading'
import appDoneLoading from './app-done-loading'
import axios from 'axios'

export const DRAW_CARD = 'DRAW_CARD'

export default function drawNewCard(deckID) {
  return dispatch => {
    dispatch(appLoading())
    axios.get('http://deckofcardsapi.com/api/deck/'+deckID+'/draw/?count=2')
        .then(response => {
              dispatch(drawCard(response.data))
      })
      .catch(error => {
        console.log(error);
      });
      dispatch(appDoneLoading())

    }
  }




function drawCard(card) {
  return {
    type: DRAW_CARD,
    payload: card
  }
}
