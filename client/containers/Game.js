import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Card from './Card'


class Game extends Component {

constructor() {
  super()
    this.state = {
      deck: "",
      activeCard: {}
    }
  }


componentDidMount() {
this.loadDeck();
  }

loadDeck() {
    axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(response => {
          console.log(response.data)
              this.setState({
          deck: response.data.deck_id,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

 // drawUrl() {
 //   const {deck} = this.state
 //   return ("http://deckofcardsapi.com/api/deck/"+deck+"/draw/?count=2")
 // }

drawCard() {
    const {deck} = this.state
    const url = ("http://deckofcardsapi.com/api/deck/"+deck+"/draw/?count=2")
    axios.get(url)
    .then(response => {
    this.setState({
      activeCard: response.data.cards[0]
    });

})
.catch(error => {
  console.log(error);
});

}

renderCard() {
  const {activeCard} = this.state
  return <Card
   value = {activeCard.value}
   />
}






  render() {
      return (
        <div>
          <h1>{this.state.deck}</h1>
          {this.renderCard()}
          <button onClick={this.drawCard.bind(this)}>Draw!</button>
        </div>
      )
    }

}

export default Game
