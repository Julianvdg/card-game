import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import appLoading from '../actions//app-loading'
import appDoneLoading from '../actions/app-done-loading'
import Card from './Card'
import getDeckId from '../actions/get-deck-id'
import drawNewCard from '../actions/draw-card'
import drawOne from '../actions/draw-one'

class Game extends Component {

  constructor() {
    super()
    this.state = {
      dealerCards: [],
      started: false,
      message: "Ready to play?",
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
    console.log(card.cards[0])
    const singleCard = card.cards[0]
    return Object.assign( singleCard, { remaining: card.remaining , points: this.points(singleCard) } )
}

isInt(value) {
  return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}

points(card) {
  if (card.value == "AC") {
    return 11
  } else if (this.isInt(card.value)) {
    return parseInt(card.value)
  } else { return 10 }
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
  const { deck } = this.props;
  if(this.state.started == false) {
  return <button onClick={() => this.startGame()}>Start game!</button>
} else { return <button onClick={() => this.props.drawOne(deck.deck_id)}>draw!</button>
  }
}

count() {
  let player = 0
  let dealer = 0
  this.props.currentCard.map( (card) => { player += card.points } )
  this.state.dealerCards.map( (card) => { dealer += card.points } )
  return this.renderScore(dealer,player)

  // this.setState({
  //   count: 5
  // })
}

renderScore(dealer,player) {
  if (player > 21) {
  return (
    <p>You have {player}, BUSTED!</p>)
} else {
  return (<p>Dealer has {dealer}, You have {player}</p>) }
}

toggleStarted() {
  this.setState({
    started: !this.state.started
  })
}




  render() {
    const { deck } = this.props
    return (
      <div className="wrapper">
      <h1>Welcome to Blackjack</h1>
        <div className="cards">{ this.dealerCards() }</div>
        <div className="controls">{ this.count() } { this.button() }</div>
        <div className="cards">{ this.playerCards() }</div>
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

export default connect(mapStateToProps, { getDeckId, drawNewCard, drawOne } )(Game)
