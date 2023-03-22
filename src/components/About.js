import React, { useState, useEffect } from 'react';

const About = () => {
  const [credentials, setCredentials] = useState({ id: '', name: '', email: '' });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/api/auth/getuser', {
        method: 'POST',
        headers: {
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({ credentials }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setCredentials(json);
    };
    fetchData();
  }, []);

  return (
    <div className='container' style={{ color: '#fff' }}>
      <h4>Hello, {credentials.name}</h4>
      <hr/>
    </div>
  );
};

export default About;
