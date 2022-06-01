import React from 'react';
import FormInput from './FormInput';

export default function InboxInterface({ onChange }) {

  const handleNewChatSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <section className='inbox-interface'>
      <FormInput
        onSubmit={handleNewChatSubmit}
        placeholder='invite to chat'
        onChange={onChange}
      />
    </section>
  )
}