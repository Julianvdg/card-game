import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Card from './Card'
import getDeckId from '../actions/get-deck-id'


class Game extends Component {
  componentDidMount() {
    this.props.getDeckId()
  }

// loadDeck() {
//     axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
//         .then(response => {
//           console.log(response.data)
//               this.setState({
//           deck: response.data.deck_id,
//         });
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }

 // drawUrl() {
 //   const {deck} = this.state
 //   return ("http://deckofcardsapi.com/api/deck/"+deck+"/draw/?count=2")
 // }

// drawCard() {
//     const {deck} = this.state
//     const url = ("http://deckofcardsapi.com/api/deck/"+deck+"/draw/?count=2")
//     axios.get(url)
//     .then(response => {
//     this.setState({
//       activeCard: response.data
//     });
//
// })
// .catch(error => {
//   console.log(error);
// });
//
// }

// renderCard() {
//   const {activeCard} = this.state
//   return <Card
//    value = {activeCard.value}
//    img = {activeCard.image}
//    />
// }




  render() {
      return (
        <div>
          <h1></h1>
          {this.props.deck.deck_id}
          <button >Draw!</button>
        </div>
      )
    }

}

const mapStateToProps = (state) => {
  return {
    deck: state.deck
  }
}

Game.propTypes = {
  deck: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { getDeckId } )(Game)
