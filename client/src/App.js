import React, { useState, useEffect } from 'react';

function App() {
  const [helloMessage, setHelloMessage] = useState('Loading...');
  const [data, setData] = useState(null);

  // Fetch the original /api/hello on component mount
  useEffect(() => {
    fetch('/api/hello')
      .then(response => response.json())
      .then(data => setHelloMessage(data.message))
      .catch(error => {
        console.error('Error fetching hello API:', error);
        setHelloMessage('Error fetching message');
      });
  }, []);

  // Function to fetch data from the new /api/data endpoint
  const fetchData = () => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => {
        console.error('Error fetching data API:', error);
        setData({ error: 'Error fetching data' });
      });
  };

  return (
    <div>
      <h1>React Frontend</h1>
      <h2>Message from /api/hello:</h2>
      <p>{helloMessage}</p>
      
      <h2>Data from /api/data:</h2>
      <button onClick={fetchData}>Fetch Data</button>
      {data && (
        <div>
          {data.error ? (
            <p>{data.error}</p>
          ) : (
            <>
              <p>{data.description}</p>
              <ul>
                {data.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;