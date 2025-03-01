import React, {Component} from "react";
import '../index.css'
import Block from "./Block"

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
                        <div key={block.hash} className="block">
                            <Block block={block} key={block.hash}/>
                        </div>
                        
                    ))}
                
            </div>
        )
    }
}
export default Blocks