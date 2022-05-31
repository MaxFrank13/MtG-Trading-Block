import React from 'react';
import FormInput from './FormInput';

export default function ChatInterface({ handleMessageSubmit }) {
  return (
    <section className='chat-interface'>
      <h3>Username</h3>
      <section className='chat-messages'>
        <p>
          Hello
        </p>
        
        <p>
          Hey there
        </p>

        <p>
          How are you?
        </p>

        <p>
          Doing well. And you?
        </p>
      </section>
      <FormInput
        onSubmit={handleMessageSubmit}
        placeholder='message'
      />
    </section>
  )
}