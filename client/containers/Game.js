import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import appLoading from '../actions//app-loading'
import appDoneLoading from '../actions/app-done-loading'
import Card from './Card'
import getDeckId from '../actions/get-deck-id'
import drawNewCard from '../actions/draw-card'


class Game extends Component {

  constructor() {
    super()
    this.state = {
      dealerCards: [],
      started: false
    }
  }

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
//
renderCards(card, index) {
  console.log(card)
  return ( <Card key={ index }
    { ...card } />

  )
}

renderDCards(card, index) {
  return ( <Card key={ index }
    { ...card } />

  )
}

// indexCards() {
//   return this.props.currentCard.map( (card) => ( {value: card.value} ))
// }

addToState(card) {
  const dealerCards = this.state.dealerCards.concat([card])
  this.setState({ dealerCards: dealerCards })
}

playerCards() {
  if (this.props.currentCard.length > 0)
  return this.props.currentCard.map(this.renderCards.bind(this))
}

makeCard(card) {

    return Object.assign( card.cards[0] , { remaining: card.remaining } )
}

setDealerCards(deck_ID) {
  const url = ('http://deckofcardsapi.com/api/deck/'+deck_ID+'/draw/?count=1')
    axios.get(url)
        .then(response => {

              const newCard = this.makeCard(response.data)
              this.addToState(newCard);
      })
      .catch(error => {
        console.log(error);
      });
}

dealerCards() {
  const { dealerCards } = this.state
  if(dealerCards.length > 0)
  return dealerCards.map(this.renderDCards.bind(this))
}

startGame() {
  const { deck } = this.props;
  this.props.drawNewCard(deck.deck_id);
  this.setDealerCards(deck.deck_id);
  this.setState({ started: true })

}

button() {
  if(this.state.started == false) {
  return <button onClick={() => this.startGame()}>Start game!</button>
} else { return <button onClick={() => this.startGame()}>draw!</button>
  }
}

count() {
  if(this.props.currentCard > 0) {
  const cards = this.props.currentCard;
  let amount = 0;
  return cards.map( card => { amount += card.points})
  return amount }
}


  render() {
    const { deck } = this.props
    return (
      <div>
        <h1>{deck.deck_id}</h1>
        { this.dealerCards() }
        { this.playerCards() }
        { this.button() }
        {this.count() }
      </div>
    )
  }
}




const mapStateToProps = (state) => {
  return {
    deck: state.deck,
    currentCard: state.currentCard,
  }
}

Game.propTypes = {
  deck: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, { getDeckId, drawNewCard } )(Game)
