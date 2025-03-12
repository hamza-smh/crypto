import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet } from '@fortawesome/free-solid-svg-icons'

const Wallet = () => {
  const [walletInfo, setWalletInfo] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${document.location.origin}/api/wallet-info`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
      })
      .then(json => {
        console.log('Wallet Info:', json) 
        setWalletInfo(json)
      })
      .catch(error => {
        console.error('Fetch Error:', error.message)
        setError(error.message)
      })
  }, []) 

  return (
    <div className='wallet'>
      {walletInfo ? (
        <button className="myWalletBtn">
          <div>
            <FontAwesomeIcon icon={faWallet} className='walletIcon' />
          </div>
          <div className="walletBalance">
            Balance: {walletInfo.balance ?? "null"}
          </div>
        </button>
      ) : (
        <button className="myWalletBtn">
          <div>
            <FontAwesomeIcon icon={faWallet} className='walletIcon' />
          </div>
        </button>
      )}
  
  {error && <p className='error'>Error: {error}</p>}
</div>

  )
}

export default Wallet
