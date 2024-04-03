// Countries.jsx

import React, { useState, useEffect } from 'react';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Failed to fetch countries data');
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries data:', error);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search country..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        {filteredCountries.map(country => (
          <div key={country.cca3}>
            <img src={country.flags.svg} alt={`${country.name.common} flag`} style={{ width: '100%' }} />
            <p>{country.name.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countries;
