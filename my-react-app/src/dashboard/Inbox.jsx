import React, { useState } from 'react';
import './Inbox.css';

const sampleThreads = [
  {
    id: 1,
    user: 'Customer A',
    task: 'Buy groceries',
    destination: '123 Main St',
    dueDate: 'May 1, 2025',
    status: 'accepted',
    messages: [
      { sender: 'runner', text: 'Hi! I accepted your task.', time: '2:01 PM' },
      { sender: 'customer', text: 'Great! Let me know if you need anything.', time: '2:03 PM' },
    ],
    archived: false,
  },
];

function Inbox() {
  return (
    <div>
      <div className='messagessidebar'>
        <div>
          <h1>Messages</h1>
        </div>
      </div>
      <div className='userheader'>
        <h1>User</h1>
      </div>
      <div className='chat'>
        <p>chat</p>
      </div>
    </div>
  );
}

export default Inbox;
