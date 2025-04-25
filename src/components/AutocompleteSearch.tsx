
import React, { useState, useEffect, useRef } from 'react';
import { Doctor } from '../types/doctor';
import { Search } from 'lucide-react';

interface AutocompleteSearchProps {
  doctors: Doctor[];
  currentSearch: string;
  onSearch: (search: string) => void;
}

const AutocompleteSearch: React.FC<AutocompleteSearchProps> = ({ 
  doctors, 
  currentSearch, 
  onSearch 
}) => {
  const [inputValue, setInputValue] = useState(currentSearch || '');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(currentSearch || '');
  }, [currentSearch]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        inputRef.current && 
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const updateSuggestions = (value: string) => {
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const matchingDoctors = doctors
      .filter(doctor => 
        doctor.name.toLowerCase().includes(value.toLowerCase())
      )
      .map(doctor => doctor.name)
      .slice(0, 3);

    setSuggestions(matchingDoctors);
    setIsOpen(matchingDoctors.length > 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    updateSuggestions(value);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
    onSearch(suggestion);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(inputValue);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          ref={inputRef}
          data-testid="autocomplete-input"
          type="text"
          placeholder="Search for doctors by name"
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-doctor-blue"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => updateSuggestions(inputValue)}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
      </div>

      {isOpen && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg"
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              data-testid="suggestion-item"
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutocompleteSearch;
