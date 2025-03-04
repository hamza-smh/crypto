import React,{Component} from "react";
import { Link } from "react-router-dom";
import Transaction from "./Transactions";

class TransactionPool extends Component{
    state={transactionPoolMap:{}}

    fetchTransactionPoolMap = ()=>{
        fetch('http://localhost:3000/api/transaction-pool-map')
       .then(response => response.json())
       .then(json=>this.setState({transactionPoolMap:json}));
    }
    componentDidMount(){
        this.fetchTransactionPoolMap();
    }

    render(){
        return(
            <div className="fullBody">
                <div className="TransactionPool">
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
                        <Link to='/conduct-transaction'>
                            <button className='myBtn'>
                                Conduct Transaction
                            </button>
                        </Link>
                    </div>
                    <h2>Transaction Pool</h2>
                    {Object.values(this.state.transactionPoolMap).length > 0 ? (
                        Object.values(this.state.transactionPoolMap).map(transaction => (
                            <div key={transaction.id}>
                                <hr />
                                <Transaction transaction={transaction} />
                            </div>
                        ))
                    ) : (
                        <div>
                            <hr />
                            <br /><br />
                            <h3>No transactions available</h3>
                        </div>
                    )}

                </div>

            </div>
        )
    }
}

export default TransactionPool;