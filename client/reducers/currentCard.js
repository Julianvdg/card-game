import { DRAW_CARD } from '../actions/draw-card'


export default function updateCurrentCard(state = {}, { type, payload }) {
  switch (type) {
    case DRAW_CARD :
      return payload

    default :
      return state
  }
}
