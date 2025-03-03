import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import Transaction from './Transactions'
class Block extends Component {
  state = { displayTransaction: false }

  toggleTransaction = () => {
    this.setState({ displayTransaction: !this.state.displayTransaction })
  }

  get displayTransaction () {
    const { timestamp, hash, data } = this.props.block

    const stringifiedData = JSON.stringify(data)

    const dataDisplay =
      stringifiedData.length > 35
        ? `${stringifiedData.substring(0, 35)}...`
        : stringifiedData

    if (this.state.displayTransaction) {
      return (
        <div>
          {data.map(transaction=>(
            <div key={transaction.id}>
                <hr />
                <Transaction transaction={transaction}/>
            </div>
          ))}
          <br />
          <button
            type='button'
            class='btn btnRed'
            onClick={this.toggleTransaction}
          >
            Show Less
          </button>
        </div>
      )
    }
    return (
      <div>
        <div>Data: {dataDisplay}</div>
        <br />
        <button
          type='button'
          class='btn btnRed'
          onClick={this.toggleTransaction}
        >
          Show More
        </button>
      </div>
    )
  }

  render () {
    console.log('this.displayTransaction', this.displayTransaction)
    const { timestamp, hash } = this.props.block

    const hashDisplay = `${hash.substring(0, 15)}...`

    return (
      <div>
        <p>Timestamp: {new Date(timestamp).toLocaleString()}</p>
        <p>Hash: {hashDisplay}</p>
        {this.displayTransaction}
      </div>
    )
  }
}
export default Block
