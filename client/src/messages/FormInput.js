import React from 'react';

export default function FormInput({ onSubmit, placeholder}) {
  return (
    <form className='form-input'>
      <textarea type='text' rows='1' placeholder={placeholder}>
      </textarea>
      <button onClick={onSubmit}>
        send
      </button>
    </form>
  )
}