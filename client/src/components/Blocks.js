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
                   <button className = "myBtn" >
                        <Link to="/" >Home</Link>
                    </button>
                    <button className = "myBtn" >
                        <Link to="/conduct-transaction" >Conduct Transaction</Link>
                    </button>
                    <button className = "myBtn" >
                        < Link to = "/transaction-pool-map" >Transaction Pool Map </Link>
                    </button>
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