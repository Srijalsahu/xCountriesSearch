// Search.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './search.module.css';

const Search = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
        setFilteredCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(term)
    );
    setFilteredCountries(filtered);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search for a country..."
        className={styles.searchInput}
      />
      <div className={styles.countryContainer}>
        {filteredCountries.map(country => (
          <div key={country.cca3} className={styles.countryCard}>
            <img src={country.flags.png} alt={country.name.common} />
            <h2>{country.name.common}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
