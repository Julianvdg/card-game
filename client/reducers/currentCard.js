import { DRAW_CARD } from '../actions/draw-card'


export default function updateCurrentCard(state = {}, { type, payload }) {
  switch (type) {
    case DRAW_CARD :
    const { cards } = payload
      return cards.map((card) => Object.assign( card , { remaining: payload.remaining } ))
      console.log(state)

    default :
      return state
  }
}
