import React,{Component} from 'react'
import Blocks from './Blocks';
import logo from "../assets/logo.png"
import "../index.css"
import {
    Link
} from 'react-router-dom';

class App extends Component {

    state={walletInfo:{}}

    componentDidMount(){
        fetch('http://localhost:3000/api/wallet-info')
        .then(response => response.json())
        .then(json=>this.setState({walletInfo:json}));
    }
    render(){
        const {address, balance} = this.state.walletInfo;

        return (
            
            <div className='fullBody'>
                <div className='btnHolder'>
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
                    <Link to='/transaction-pool'>
                        <button className='myBtn'>
                            Transaction Pool
                        </button>
                    </Link>
                </div>
                <img className="logo" src={logo}></img> 
                <div>
                    <h1>Welcome to Cryptochain in React...</h1>
                </div>

                <div className='walletInfo'>
                    <div>Address:<br />{address}</div>
                    <div>Balance:{balance}</div>
                </div>
                {/* <Blocks /> */}
            </div>
            
        )
    }
}


export default App;