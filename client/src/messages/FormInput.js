import React from 'react';

export default function FormInput({ onSubmit, placeholder, onChange }) {
  return (
    <form className='form-input'>
      <textarea 
        type='text' 
        rows='1' 
        placeholder={placeholder}
        onChange={onChange}
      >
      </textarea>
      <button onClick={onSubmit}>
        send
      </button>
    </form>
  )
}