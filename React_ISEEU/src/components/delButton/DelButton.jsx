import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import "./delButton.css"
const DelButton = () => {
  return (
    <div className='del'>
      <button className='delbtn'>
      <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  )
}

export default DelButton
