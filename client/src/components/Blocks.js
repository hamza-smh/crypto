import React, {Component} from "react";
import '../index.css'
import Block from "./Block"
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"
import SidePanel from "./sidePanel";

class Blocks extends Component{
    state = { blocks : [] }
    componentDidMount(){
        fetch(`${document.location.origin}/api/blocks`)
       .then(response => response.json())
       .then(json => this.setState({blocks:json}))
    }
    render(){
        console.log("this.state",this.state);

        return (
            <div className='fullBody'>
                <SidePanel home conduct pool/>
                <img className="smallLogo" src={logo} alt="logo"/>
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