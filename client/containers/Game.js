import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'


class Game extends Component {

constructor() {
  super()
    this.state = {
      deck: null
    }
  }


componentDidMount() {
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






  render() {
      return (
        <div>
          <h1>{this.state.deck}</h1>
        </div>
      )
    }

}

export default Game
