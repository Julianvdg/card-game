import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'


class Card extends Component {

  render() {
      return (
        <div>
        <p>hello</p>
          {this.props.value}
          <img src={this.props.img}/>
        </div>
      )
    }

}

export default Card
