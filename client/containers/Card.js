import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'


class Card extends Component {

  render() {
      return (
        <img src={this.props.image}/>
      )
    }

}

export default Card
