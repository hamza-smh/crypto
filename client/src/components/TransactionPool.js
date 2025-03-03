import React,{Component} from "react";
import { Link } from "react-router-dom";
import Transaction from "./Transactions";

class TransactionPool extends Component{
    state={transactionPoolMap:{}}

    fetchTransactionPoolMap = ()=>{
        fetch('http://localhost:3000/api/transaction-pool')
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
                        <button className='myBtn'>
                          <Link to='/'>Home</Link>
                        </button>
                        <button className='myBtn'>
                          <Link to='/blocks'>Blocks</Link>
                        </button>
                        <button className='myBtn'>
                          <Link to='/conduct-transaction'>Conduct Transaction</Link>
                        </button>
                    </div>
                    <h2>Transaction Pool</h2>

                    {
                        Object.values(this.state.transactionPoolMap).map(transaction=>{
                            return(
                            <div key={transaction.id}>
                                <hr />
                                <Transaction transaction={transaction}/>
                            </div>
                            )
                        })
                    }
                </div>

            </div>
        )
    }
}

export default TransactionPool;