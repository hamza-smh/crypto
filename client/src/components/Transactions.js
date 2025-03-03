import React from 'react';


const Transaction=({transaction})=>{
    const {input, outputMap} = transaction;
    const recipients = Object.keys(outputMap)

    return(
        <div>
            <h3><b>Transaction Details</b></h3>
            <br />
            <div className='transaction'>
                <div>
                    From: {`${input.address.substring(0,20)}`}
                </div>
                <div>
                    Balance: {input.amount}
                </div>
            </div>
            {
                recipients.map(recipient=>(
                    <div key={recipient} className='transaction'>
                        <div>
                            To: {`${recipient.substring(0,20)}...`}
                        </div>
                        <div>
                            Sent: {outputMap[recipient]}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
export default Transaction;