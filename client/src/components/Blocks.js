import React, {Component} from "react";
import '../index.css'

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
            <div>
                <h1>Blocks</h1>
                
                    {this.state.blocks.map((block,index) => (
                        <ul>
                        <li key={block.hash} className="block">
                            {/* Index: {index}<br/> */}
                            {/* Timestamp: {block.timestamp}<br/> */}
                            Data: {JSON.stringify(block.data)}<br/>
                            Hash: {block.hash}<br/>
                            {/* Previous Hash: {block.lastHash}<br/> */}
                        </li>
                        <br />
                        </ul>
                    ))}
                
            </div>
        )
    }
}
export default Blocks