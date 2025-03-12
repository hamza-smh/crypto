import React, { Component } from "react";
import { FormGroup, FormControl } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import SidePanel from "./sidePanel";
import DialogBox from "./DialogBox";
import Wallet from "./Wallet";

class ConductTransactionClass extends Component {
  state = { recipient: "", amount: 0, showDialog: false };

  updateRecipient = (event) => {
    this.setState({ recipient: event.target.value });
  };

  updateAmount = (event) => {
    this.setState({ amount: Number(event.target.value) });
  };

  openDialog = () => {
    this.setState({ showDialog: true });
  };

  closeDialog = () => {
    this.setState({ showDialog: false });
  };

  confirmTransaction = () => {
    this.closeDialog(); 
    this.conductTransaction();
  };

  conductTransaction = () => {
    const { recipient, amount } = this.state;

    fetch(`${document.location.origin}/api/transact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipient, amount }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("Transaction Response:", json);
        //alert(json.message || json.type);
        this.props.navigate("/transaction-pool");
      })
      .catch((error) => {
        console.error("Transaction Error:", error);
        alert("Failed to conduct transaction. Check console for details.");
      });
  };

  render() {
    return (
      <div className="fullBody">
        <img className="smallLogo" src={logo} alt="logo" />
        <div className="ConductTransaction">
          <SidePanel home blocks pool />
          <h3>Conduct a transaction</h3>
          <div className="formGroup">
            <FormGroup>
              <FormControl
                type="text"
                placeholder="Recipient"
                value={this.state.recipient}
                onChange={this.updateRecipient}
                className="inputField"
              />
            </FormGroup>
            <br />
            <FormGroup>
              <FormControl
                type="number"
                placeholder="Amount"
                value={this.state.amount}
                onChange={this.updateAmount}
                className="inputField"
              />
            </FormGroup>
          </div>
          <br />
          <button className="submit" onClick={this.openDialog}>
            Submit
          </button>
        </div>

        <DialogBox isOpen={this.state.showDialog} onClose={this.closeDialog} title="Confirm Transaction">
          <p>
            Are you sure you want to send <strong>{this.state.amount}</strong> to{" "}
            <strong>{this.state.recipient}</strong>?
          </p>
          <div className="flex justify-end dialogBtns">
            <button onClick={this.closeDialog} className="bg-gray-500 text-white px-4 py-2 rounded mr-4 cancel">
              Cancel
            </button>
            <button onClick={this.confirmTransaction} className="bg-blue-500 text-white px-4 py-2 rounded ml-4 confirm">
              Confirm
            </button>
          </div>
        </DialogBox>

        <Wallet />
      </div>
    );
  }
}

const ConductTransaction = (props) => {
  const navigate = useNavigate();
  return <ConductTransactionClass {...props} navigate={navigate} />;
};

export default ConductTransaction;
