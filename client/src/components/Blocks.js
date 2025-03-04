import React, {Component} from "react";
import '../index.css'
import Block from "./Block"
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"

class Blocks extends Component{
    state = { blocks : [] }
    componentDidMount(){
        fetch('http://localhost:3000/api/blocks')
       .then(response => response.json())
       .then(json => this.setState({blocks:json}))
    }
    render(){
        console.log("this.state",this.state);

        return (
            <div className='fullBody'>
               < div className = 'btnHolder' >
                   <Link to='/'>
                      <button className='myBtn'>
                          Home
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
                <img className="smallLogo" src={logo}></img> 
                <h1><b>Blocks</b></h1>
                
                    {this.state.blocks.map((block,index) => (
                        <div key={block.hash} className="block">
                            <Block block={block} key={block.hash}/>
                        </div>
                        
                    ))}
                
            </div>
        )
    }
}
export default Blocks