import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight, faArrowUpRightFromSquare, faLongArrowAltRight, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export default function FormInput({ onSubmit, placeholder, onChange, value }) {

  return (
    <form onSubmit={onSubmit} className='form-input'>
      <input
        type='text'
        rows='1'
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />

      <button>
        <FontAwesomeIcon
          icon={faRightFromBracket}
          size='lg'
        />
      </button>
    </form>
  )
}