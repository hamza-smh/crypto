 import React, { Component } from 'react'
import { FormGroup, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import history from '../history'

class ConductTransaction extends Component {
  state = { recipient: '', amount: 0 }

  updateRecipient = event => {
    this.setState({ recipient: event.target.value })
  }
  updateAmount = event => {
    this.setState({ amount: Number(event.target.value) })
  }

  conductTransaction=()=>{
    const {recipient, amount}=this.state;
    fetch('http://localhost:3000/api/transact',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipient, amount })
    }).then(response=>response.json())
    .then(json=>{
         console.log("Transaction Response:", json); // Debugging log
         alert(json.message || json.type);
         history.push('/transaction-pool'); // Redirect to blocks page after successful transaction.
    })
    .catch((error) => {
        console.error("Transaction Error:", error);
        alert("Failed to conduct transaction. Check console for details.");
    });
  }

  render () {
    console.log(this.state)
    return (
      <div className='fullBody'>
        <img className='smallLogo' src={logo}></img>
        <div className='ConductTransaction'>
          <div className='btnHolder'>
            <Link to='/'>
              <button className='myBtn'>
                  Home
              </button>
            </Link>
            <Link to='/blocks'>
                <button className='myBtn'>
                    Blocks
                </button>
            </Link>
            <Link to='/transaction-pool'>
                <button className='myBtn'>
                    Transaction Pool
                </button>
            </Link>
          </div>
          <h3>Conduct a transaction</h3>
          <FormGroup>
            <FormControl
              type='text'
              placeholder='Recipient'
              value={this.state.recipient}
              onChange={this.updateRecipient}
              className='inputField'
            />
          </FormGroup>
          <br />
          <FormGroup>
            <FormControl
              type='number'
              placeholder='Amount'
              value={this.state.amount}
              onChange={this.updateAmount}
              className = 'inputField'
            />
          </FormGroup>
          <br />
            <button className='submit' onClick={this.conductTransaction}>
              Submit
            </button>
        </div>
      </div>
    )
  }
}

export default ConductTransaction
