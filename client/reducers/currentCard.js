import { DRAW_CARD } from '../actions/draw-card'


export default function updateCurrentCard(state = {}, { type, payload }) {
  switch (type) {
    case DRAW_CARD :
      const newCard = payload.cards[0]
      return Object.assign(
        newCard,
        { remaining: payload.remaining }
      )

    default :
      return state
  }
}
