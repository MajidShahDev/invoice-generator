'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';

// get Item = fetch item
// set Item = save item

const MyInputComponent = () => {
  // Initialize each input field state from localStorage.
  const [newShopping, setShoppingText] = useState(() => {
    if (typeof window !== 'undefined') {
      // esnsure that running in browser not in ssr
      return localStorage.getItem('newShopping') || '';
    }
    return ''; // Guarantees that a valid string is returned if ssr.
  });

  const [newItem, setItemText] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('newItem') || '';
    }
    return '';
  });

  const [userComment, setCommentText] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userComment') || '';
    }
    return '';
  });

  // Save to localStorage when any input changes.
  useEffect(() => {
    if (newShopping) {
      localStorage.setItem('newShopping', newShopping); // setItem('keyName', valueVariable)
    }
  }, [newShopping]);

  useEffect(() => {
    if (newItem) {
      localStorage.setItem('newItem', newItem);
    }
  }, [newItem]);

  useEffect(() => {
    if (userComment) {
      localStorage.setItem('userComment', userComment);
    }
  }, [userComment]);

  // Handle changes for each input field.
  const handleShoppingChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShoppingText(e.target.value);
  };

  const handleItemChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItemText(e.target.value);
  };

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  // Handle the Clear All functionality to reset all fields and clear localStorage.
  const handleClearAll = () => {
    localStorage.removeItem('newShopping'); // localStorage.removeItem() deletes the key-value pair from localStorage.
    localStorage.removeItem('newItem');
    localStorage.removeItem('userComment');
    setShoppingText('');
    setItemText('');
    setCommentText('');
  };

  return (
    <div className="space-y-6">
      {/* Shopping Input Field */}
      <div>
        <label htmlFor="newShopping">Shopping Text:</label>
        <input
          id="newShopping"
          type="text"
          value={newShopping}
          onChange={handleShoppingChange}
          className="p-2 border rounded"
        />
      </div>

      {/* Item Input Field */}
      <div>
        <label htmlFor="newItem">Item Text:</label>
        <input
          id="newItem"
          type="text"
          value={newItem}
          onChange={handleItemChange}
          className="p-2 border rounded"
        />
      </div>

      {/* Comment Input Field */}
      <div>
        <label htmlFor="userComment">User Comment:</label>
        <input
          id="userComment"
          type="text"
          value={userComment}
          onChange={handleCommentChange}
          className="p-2 border rounded"
        />
      </div>

      {/* Clear All Button */}
      <button
        onClick={handleClearAll}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Clear All
      </button>
    </div>
  );
};

export default MyInputComponent;
