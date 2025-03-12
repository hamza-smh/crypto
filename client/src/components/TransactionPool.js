import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import Transaction from "./Transactions";
import SidePanel from "./sidePanel";
import logo from "../assets/logo.png";
import DialogBox from "./DialogBox";
import Wallet from "./Wallet";

const POLL_INTERVAL_MS = 10000;

class TransactionPoolClass extends Component {
  state = {
    transactionPoolMap: {},
    error: null,
    showDialog: false,
  };

  fetchTransactionPoolMap = () => {
    fetch(`${document.location.origin}/api/transaction-pool-map`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        console.log("Transaction Pool Map:", json);
        this.setState({
          transactionPoolMap: json,
          error: null,
        });
      })
      .catch((error) => {
        console.error("Fetch Error:", error.message); 
        this.setState({
          error: error.message,
        });
      });
  };

  fetchMineTransactions = () => {
    this.setState({ showDialog: true }); 
  };

  confirmMineTransactions = () => {
    this.closeDialog();

    fetch(`${document.location.origin}/api/mine-transactions`)
      .then((response) => {
        if (response.status === 200) {
          //alert("Success! Transactions mined.");
          this.props.navigate("/blocks");
        } else {
          alert("The mine-transaction block request did not complete.");
        }
      })
      .catch((error) => {
        console.error("Mining Error:", error);
        alert("Failed to mine transactions.");
      });
  };

  closeDialog = () => {
    this.setState({ showDialog: false });
  };

  componentDidMount() {
    this.fetchTransactionPoolMap();

    this.interval = setInterval(() => {
      console.log("Fetching transaction pool map...");
      this.fetchTransactionPoolMap();
    }, POLL_INTERVAL_MS);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let transactionPoolMapLength = Object.values(this.state.transactionPoolMap).length;
    return (
      <div className="fullBody">
        <img className="smallLogo" src={logo} alt="logo" />
        <div className="TransactionPool">
          <SidePanel home blocks conduct />
          <h2>Transaction Pool</h2>
          {transactionPoolMapLength > 0 ? (
            Object.values(this.state.transactionPoolMap).map((transaction) => (
              <div key={transaction.id}>
                <hr />
                <Transaction transaction={transaction} />
              </div>
            ))
          ) : (
            <div>
              <hr />
              <br />
              <br />
              <h3>No transactions available</h3>
            </div>
          )}
          <hr />
          <button
            className="btnRed"
            onClick={this.fetchMineTransactions}
            //disabled={transactionPoolMapLength === 0}
          >
            Mine the transactions
          </button>
        </div>

        {/* Dialog Box for Confirmation */}
        <DialogBox isOpen={this.state.showDialog} onClose={this.closeDialog} title="Confirm Mining">
          <p>
            Are you sure you want to mine all transactions in the pool?
          </p>
          <div className="flex justify-end dialogBtns">
            <button onClick={this.closeDialog} className="bg-gray-500 text-white px-4 py-2 rounded mr-4 cancel">
              Cancel
            </button>
            <button onClick={this.confirmMineTransactions} className="bg-blue-500 text-white px-4 py-2 rounded ml-4 confirm">
              Confirm
            </button>
          </div>
        </DialogBox>
        <Wallet />
      </div>
    );
  }
}

const TransactionPool = (props) => {
  const navigate = useNavigate();
  return <TransactionPoolClass {...props} navigate={navigate} />;
};

export default TransactionPool;
