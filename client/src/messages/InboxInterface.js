import React from 'react';
import FormInput from './FormInput';

export default function InboxInterface() {

  const handleNewChatSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <section className='inbox-interface'>
      <FormInput
        onSubmit={handleNewChatSubmit}
        placeholder='invite to chat'
      />
    </section>
  )
}