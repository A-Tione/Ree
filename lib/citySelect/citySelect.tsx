import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Icon from '@/icon/icon';
import './citySelect.scss';
import { scopedClassMaker } from '@/helpers/classes';

interface CitySelectProps {
  dataSource: Record<string, string[]>;
  onChange: (city: string) => void;
}

const sc = scopedClassMaker('ree-city-select');

const CitySelect: React.FC<CitySelectProps> = ({ dataSource, onChange }) => {
  const [selectedCity, setSelectedCity] = useState<string>('加载中...');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleCityClick = (city: string) => {
    setSelectedCity(city);
    onChange(city);
    setIsOpen(false);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  const scrollToLetter = (letter: string) => {
    const element = document.getElementById(`letter-${letter}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderCityList = () => {
    const sortedLetters = Object.keys(dataSource).sort();
    return (
      <>
        <div className={sc('letter-list')}>
          {sortedLetters.map((letter) => (
            <span
              key={letter}
              className={sc('letter')}
              onClick={() => scrollToLetter(letter)}
            >
              {letter.toLocaleUpperCase()}
            </span>
          ))}
        </div>
        {sortedLetters.map((letter) => (
          <div key={letter} id={`letter-${letter}`} className={sc('letter-group')}>
            <div className={sc('letter-title')}>{letter.toLocaleUpperCase()}</div>
            <div className={sc('cities')}>
              {dataSource[letter].map((city) => (
                <div
                  key={city}
                  className={sc('item', {extra: selectedCity.includes(city) ? 'active' : ''})}
                  onClick={() => handleCityClick(city)}
                >
                  {city}
                </div>
              ))}
            </div>
          </div>
        ))}
      </>
    );
  };

  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://ip-api.com/json/?lang=zh-CN');
    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        setSelectedCity(data.city);
      }
    };
    xhr.send();
    xhr.onerror = () => {
      setSelectedCity('未知');
    };
  }, []);

  return (
    <div className={sc('')}>
      <div className={sc('selected')} onClick={handleOpenModal}>
        <div className={sc('current-location')}>{selectedCity}</div>
      </div>
      {isOpen && createPortal(
        <div className={sc('modal-overlay')} onClick={handleCloseModal}>
          <div className={sc('modal')} ref={modalRef}>
            <div className={sc('modal-header')}>
              <h3>选择城市</h3>
              <button onClick={() => setIsOpen(false)} className={sc('close-button')}>
                <Icon name="close" style={{fontSize: '1.5em'}} />
              </button>
            </div>
            <div className={sc('modal-content')}>
              {renderCityList()}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default CitySelect;
