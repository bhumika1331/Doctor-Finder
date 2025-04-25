
// import React, { useState, useEffect, useRef } from 'react';
// import { Doctor } from '../types/doctor';
// import { Search } from 'lucide-react';

// interface AutocompleteSearchProps {
//   doctors: Doctor[];
//   currentSearch: string;
//   onSearch: (search: string) => void;
// }

// const AutocompleteSearch: React.FC<AutocompleteSearchProps> = ({ 
//   doctors, 
//   currentSearch, 
//   onSearch 
// }) => {
//   const [inputValue, setInputValue] = useState(currentSearch || '');
//   const [suggestions, setSuggestions] = useState<string[]>([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const suggestionsRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     setInputValue(currentSearch || '');
//   }, [currentSearch]);

//   useEffect(() => {
//     const handleOutsideClick = (event: MouseEvent) => {
//       if (
//         inputRef.current && 
//         !inputRef.current.contains(event.target as Node) &&
//         suggestionsRef.current && 
//         !suggestionsRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleOutsideClick);
//     return () => {
//       document.removeEventListener('mousedown', handleOutsideClick);
//     };
//   }, []);

//   const updateSuggestions = (value: string) => {
//     if (!value.trim()) {
//       setSuggestions([]);
//       return;
//     }

//     const matchingDoctors = doctors
//       .filter(doctor => 
//         doctor.name.toLowerCase().includes(value.toLowerCase())
//       )
//       .map(doctor => doctor.name)
//       .slice(0, 3);

//     setSuggestions(matchingDoctors);
//     setIsOpen(matchingDoctors.length > 0);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setInputValue(value);
//     updateSuggestions(value);
//   };

//   const handleSelectSuggestion = (suggestion: string) => {
//     setInputValue(suggestion);
//     onSearch(suggestion);
//     setIsOpen(false);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       onSearch(inputValue);
//       setIsOpen(false);
//     }
//   };

//   return (
//     <div className="relative w-full">
//       <div className="relative">
//         <input
//           ref={inputRef}
//           data-testid="autocomplete-input"
//           type="text"
//           placeholder="Search for doctors by name"
//           className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-doctor-blue"
//           value={inputValue}
//           onChange={handleInputChange}
//           onKeyDown={handleKeyDown}
//           onFocus={() => updateSuggestions(inputValue)}
//         />
//         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//           <Search size={18} className="text-gray-400" />
//         </div>
//       </div>

//       {isOpen && suggestions.length > 0 && (
//         <div 
//           ref={suggestionsRef}
//           className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg"
//         >
//           {suggestions.map((suggestion, index) => (
//             <div
//               key={index}
//               data-testid="suggestion-item"
//               className="px-4 py-2 cursor-pointer hover:bg-gray-100"
//               onClick={() => handleSelectSuggestion(suggestion)}
//             >
//               {suggestion}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AutocompleteSearch;
import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { Doctor } from '../types/doctor';

interface AutocompleteSearchProps {
  doctors: Doctor[];
  currentSearch: string;
  onSearch: (search: string) => void;
}

const AutocompleteSearch: React.FC<AutocompleteSearchProps> = ({
  doctors,
  currentSearch,
  onSearch,
}) => {
  const [inputValue, setInputValue] = useState(currentSearch);
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Update local input value when prop changes
  useEffect(() => {
    setInputValue(currentSearch);
  }, [currentSearch]);

  // Generate suggestions based on input
  useEffect(() => {
    if (inputValue.trim() === '') {
      setSuggestions([]);
      return;
    }

    const searchTerm = inputValue.toLowerCase();
    const matchedDoctors = doctors
      .filter(doctor => doctor.name.toLowerCase().includes(searchTerm))
      .slice(0, 5); // Limit to 5 suggestions
    
    setSuggestions(matchedDoctors);
  }, [inputValue, doctors]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setShowSuggestions(true);
    

    onSearch(value);
  };

  const handleSelectSuggestion = (name: string) => {
    setInputValue(name);
    onSearch(name);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search for doctors by name"
          className="w-full px-10 py-3 rounded-lg text-gray-700 focus:outline-none"
          data-testid="doctor-search-input"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Suggestions dropdown */}

{/* Suggestions dropdown */}
{/* Suggestions dropdown */}
{/* Suggestions dropdown */}
{showSuggestions && suggestions.length > 0 && (
  <div
    ref={suggestionsRef}
    className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto"
  >
    {suggestions.map(doctor => {
      // Generate a random doctor image if one doesn't exist
      const randomImageId = Math.floor(Math.random() * 100);
      const imageUrl = doctor.photo || `https://randomuser.me/api/portraits/men/${randomImageId}.jpg`;
      
      return (
        <div
          key={doctor.id}
          className="px-4 py-2 cursor-pointer text-black hover:bg-gray-100 flex items-center"
          onClick={() => handleSelectSuggestion(doctor.name)}
        >
          {/* Doctor photo */}
          <img
            src={imageUrl}
            alt={doctor.name}
            className="w-8 h-8 rounded-full object-cover mr-3"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              // If random image fails, fall back to placeholder
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
          {/* Doctor name */}
          <span>{doctor.name}</span>
        </div>
      );
    })}
  </div>
)}
    </div>
  );
};

export default AutocompleteSearch;