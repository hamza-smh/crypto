 import React, { Component } from 'react'
import { FormGroup, FormControl } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import SidePanel from './sidePanel'


class ConductTransactionClass extends Component {
  state = { recipient: '', amount: 0 }

  updateRecipient = event => {
    this.setState({ recipient: event.target.value })
  }
  updateAmount = event => {
    this.setState({ amount: Number(event.target.value) })
  }

  conductTransaction=()=>{
    const {recipient, amount}=this.state;
    fetch(`${document.location.origin}/api/transact`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipient, amount })
    }).then(response=>response.json())
    .then(json=>{
         console.log("Transaction Response:", json); 
         alert(json.message || json.type);
         this.props.navigate('/transaction-pool'); 
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
        <img className='smallLogo' src={logo} alt="logo"/>
        <div className='ConductTransaction'>
          <SidePanel home blocks pool/>
          <h3>Conduct a transaction</h3>
          <div className="formGroup">
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
          </div>
          <br />
            <button className='submit' onClick={this.conductTransaction}>
              Submit
            </button>
        </div>
      </div>
    )
  }
}

const ConductTransaction = (props) => {
  const navigate = useNavigate();
  return <ConductTransactionClass {...props} navigate={navigate} />;
};

export default ConductTransaction
