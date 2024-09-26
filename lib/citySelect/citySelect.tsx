import React, { useState } from 'react';
import './citySelect.scss';
import { scopedClassMaker } from '@/helpers/classes';

interface CitySelectProps {
  cities: { [province: string]: string[] };
  onChange: (city: string) => void;
}

const CitySelect: React.FC<CitySelectProps> = ({ cities, onChange }) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const sc = scopedClassMaker('ree-city-select');

  const handleCityClick = (city: string) => {
    setSelectedCity(city);
    onChange(city);
  };

  const selectedClass = (item: string, selected: string | null) => {
    return {
      'selected': selected === item,
      'item': true
    }
  }

  return (
    <div className={sc('')}>
      {Object.entries(cities).map(([province, citiesList]) => (
        <div key={province} className={sc('province-container')}>
          <div className={sc('province')}>{province}</div>
          <div className={sc('cities')}>
            {citiesList.map((city) => (
              <div
                key={city}
                className={sc(selectedClass(city, selectedCity))}
                onClick={() => handleCityClick(city)}
              >
                {city}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CitySelect;
