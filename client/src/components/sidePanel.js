import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faHome,
  faCube,
  faHammer,
  faExchangeAlt
} from '@fortawesome/free-solid-svg-icons'
import '../index.css'
const SidePanel = ({ home,blocks,conduct,pool }) => {
  return (
    <div div className = {`btnHolder ${!conduct ? 'r10' : '0'}`} >
      {' '}
      {home ? (
        <Link to='/'>
          <button className='myBtn'>
            <div className='btnText'>Home </div>
          <div>
              <FontAwesomeIcon icon={faHome} className='icon' />
            </div>{' '}
          </button>{' '}
        </Link>
      ) : (
        ''
      )}
      {blocks ? (
        <Link to='/blocks'>
          <button className='myBtn'>
            <div className='btnText'>Blocks{' '}</div>
            <div>
              <FontAwesomeIcon icon={faCube} className='icon' />
            </div>{' '}
          </button>{' '}
        </Link>
      ) : (
        ''
      )}
      {conduct ? (
        <Link to='/conduct-transaction'>
          <button className='myBtn'>
            {' '}
            <div className='btnText'>
            Conduct Transaction{' '}
            </div>
            <div>
              <FontAwesomeIcon icon={faExchangeAlt} className='icon' />
            </div>{' '}
          </button>{' '}
        </Link>
      ) : (
        ''
      )}
      {pool ? (
        <Link to='/transaction-pool'>
          <button className='myBtn'>
            {' '}
            <div className='btnText'>
            Transaction Pool{' '}
            </div>
            <div>
              <FontAwesomeIcon icon={faHammer} className='icon' />
            </div>{' '}
          </button>{' '}
        </Link>
      ) : (
        ''
      )}
    </div>
  )
}

export default SidePanel
