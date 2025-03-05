import React, { Component } from 'react'
import Blocks from './Blocks'
import logo from '../assets/logo.png'
import '../index.css'
import { Link } from 'react-router-dom'

class App extends Component {
  state = {
    walletInfo: {},
    error:null
  }

  componentDidMount () {
    fetch(`${document.location.origin}/api/wallet-info`)
   .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        console.log("Wallet Info:", json); // Debug log
        this.setState({ walletInfo: json, error: null });
      })
      .catch((error) => {
        console.error("Fetch Error:", error.message); // Log error details
        this.setState({ error: error.message });
      });
  }

  
  render () {
    const { address, balance } = this.state.walletInfo

    return (
        <div className='fullBody'>
          <div className='btnHolder'>
            <Link to='/blocks'>
              <button className='myBtn'>Blocks </button>{' '}
            </Link>{' '}
            <Link to='/conduct-transaction'>
              <button className='myBtn'>Conduct Transaction </button>{' '}
            </Link>{' '}
            <Link to='/transaction-pool'>
              <button className='myBtn'>Transaction Pool </button>{' '}
            </Link>{' '}
          </div>{' '}
          <img className='logo' src={logo} alt="logo"/>
          <div>
            <h1> Welcome to Cryptochain in React... </h1>{' '}
          </div>
          <div className='walletInfo'>
            <div>
              {' '}
              Address: <br /> {address}{' '}
            </div>{' '}
            <div> Balance: {balance} </div>{' '}
          </div>{' '}
          {/* <Blocks /> */}{' '}
        </div>
    )
  }
}

export default App
