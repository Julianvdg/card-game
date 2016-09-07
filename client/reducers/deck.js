import { HAVE_DECK } from '../actions/get-deck-id'


export default function updateDeck(state = {}, { type, payload }) {
  switch (type) {
    case HAVE_DECK :
      return payload

    default :
      return state
  }
}
