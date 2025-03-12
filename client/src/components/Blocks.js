import React, {Component} from "react";
import '../index.css'
import Block from "./Block"
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"
import SidePanel from "./sidePanel";
import Wallet from "./Wallet";


class Blocks extends Component{
    state = { blocks : [],paginatedId: 1,blocksLength:0 }
    
     componentDidMount() {
         fetch(`${document.location.origin}/api/blocks/length`)
             .then(response => response.json())
             .then(json => this.setState({
                 blocksLength: json
             }));
         this.fetchPaginatedBlocks(this.state.paginatedId)();
     }
    render(){
        console.log("this.state",this.state);

        return (
            <div className='fullBody'>
                <SidePanel home conduct pool/>
                <img className="smallLogo" src={logo} alt="logo"/>
                <h1><b>Blocks</b></h1>
                <div>
                  {
                    [...Array(Math.ceil(this.state.blocksLength/5)).keys()].map(key => {
                      const paginatedId = key+1;
                    
                      return (
                        <span key={key} onClick={this.fetchPaginatedBlocks(paginatedId)}>
                          <button className="btnRed">
                            {paginatedId}
                          </button>{' '}
                        </span>
                      )
                    })
                  }
                </div>
                    {this.state.blocks.map((block,index) => (
                        <div key={block.hash} className="block">
                            <Block block={block} key={block.hash}/>
                        </div>
                        
                    ))}
                <Wallet />
            </div>
        )
    }
}
export default Blocks