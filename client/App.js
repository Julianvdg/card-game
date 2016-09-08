import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import signOut from './actions/sign-out-user'
import SignInOrUp from './containers/SignInOrUp'
import Loader from './components/Loader'
import FlatButton from 'material-ui/FlatButton'
import Game from './containers/Game'

class App extends Component {
  signOut() {
    this.props.signOut()
  }

  render() {
    const { loading, authenticated, currentUser } = this.props

    return(
      <div>
        { loading ? <Loader/> : null }
        { authenticated ?
          (<div>
            <h1>Hi, { currentUser.name }!</h1>
            <span>
              <FlatButton
                onClick={ this.signOut.bind(this) }
                label="Sign out"/>
            </span>
            < Game />

          </div>) :
            <SignInOrUp/> }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    authenticated: state.authenticated,
    currentUser: state.currentUser,
  }
}

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, { signOut })(App);
