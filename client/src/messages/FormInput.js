import React, { useEffect } from 'react';

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
        send
      </button>
    </form>
  )
}