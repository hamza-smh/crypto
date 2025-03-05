import React,{Component} from "react";
import { Link } from "react-router-dom";
import Transaction from "./Transactions";

const POLL_INTERVAL_MS=10000;
class TransactionPool extends Component{
    state={transactionPoolMap:{}, error:null}

    fetchTransactionPoolMap = ()=>{
        fetch(`${document.location.origin}/api/transaction-pool-map`)
       .then((response) => {
               if (!response.ok) {
                   throw new Error(`HTTP error! Status: ${response.status}`);
               }
               return response.json();
           })
           .then((json) => {
               console.log("Transaction Pool Map:", json); // Debug log
               this.setState({
                   transactionPoolMap: json,
                   error: null
               });
           })
           .catch((error) => {
               console.error("Fetch Error:", error.message); // Log error details
               this.setState({
                   error: error.message
               });
           });
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