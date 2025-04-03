import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('/api/hello')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => {
        console.error('Error fetching API:', error);
        setMessage('Error fetching message');
      });
  }, []);

  return (
    <div>
      <h1>React Frontend</h1>
      <p>API Message: {message}</p>
    </div>
  );
}

export default App;