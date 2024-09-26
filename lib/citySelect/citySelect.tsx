import React, { useState } from 'react';
import './citySelect.scss';
import { scopedClassMaker } from '@/helpers/classes';

interface CitySelectProps {
  cities: string[];
  onChange: (city: string) => void;
}

const CitySelect: React.FC<CitySelectProps> = ({ cities, onChange }) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const selectedCityClass = (city: string) => {
    return {
      'selected': selectedCity === city,
      'item': true
    }
  }
  const sc = scopedClassMaker('ree-city-select');
  const handleCityClick = (city: string) => {
    setSelectedCity(city);
    onChange(city);
  };

  return (
    <div className={sc('')}>
      <ul className={sc('list')}>
        {cities.map((city) => (
          <li
            key={city}
            className={sc(selectedCityClass(city))}
            onClick={() => handleCityClick(city)}
          >
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CitySelect;
