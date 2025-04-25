
import React from 'react';
import { SearchParams } from '../types/doctor';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FiltersProps {
  specialties: string[];
  filters: SearchParams;
  onFilterChange: (filters: Partial<SearchParams>) => void;
}

const Filters: React.FC<FiltersProps> = ({ 
  specialties, 
  filters, 
  onFilterChange 
}) => {
  const [isSpecialtiesOpen, setIsSpecialtiesOpen] = React.useState(true);
  const [isConsultationOpen, setIsConsultationOpen] = React.useState(true);

  const handleConsultationChange = (mode?: 'video' | 'clinic') => {
    onFilterChange({ consultationMode: mode });
  };

  const handleSpecialtyChange = (specialty: string) => {
    const currentSpecialties = filters.specialties || [];
    let newSpecialties: string[];
    
    if (currentSpecialties.includes(specialty)) {
      newSpecialties = currentSpecialties.filter(s => s !== specialty);
    } else {
      newSpecialties = [...currentSpecialties, specialty];
    }
    
    onFilterChange({ specialties: newSpecialties });
  };

  const clearAllFilters = () => {
    onFilterChange({
      consultationMode: undefined,
      specialties: [],
    });
  };

  return (
    <div className="bg-white rounded-md shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button 
          onClick={clearAllFilters}
          className="text-sm text-doctor-blue hover:underline"
        >
          Clear All
        </button>
      </div>
      
      {/* Specialties Section */}
      <div className="mb-4">
        <div 
          className="flex justify-between items-center mb-2 cursor-pointer" 
          onClick={() => setIsSpecialtiesOpen(!isSpecialtiesOpen)}
        >
          <h3 className="font-medium">Specialities</h3>
          {isSpecialtiesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
        
        {isSpecialtiesOpen && (
          <div className="space-y-2">
            {specialties.map(specialty => (
              <div key={specialty} className="flex items-center">
                <input
                  type="checkbox"
                  id={`specialty-${specialty}`}
                  data-testid={`filter-specialty-${specialty}`}
                  checked={filters.specialties?.includes(specialty) || false}
                  onChange={() => handleSpecialtyChange(specialty)}
                  className="h-4 w-4 text-doctor-blue rounded focus:ring-doctor-blue"
                />
                <label htmlFor={`specialty-${specialty}`} className="ml-2 text-sm">
                  {specialty}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Consultation Mode Section */}
      <div>
        <div 
          className="flex justify-between items-center mb-2 cursor-pointer"
          onClick={() => setIsConsultationOpen(!isConsultationOpen)}
        >
          <h3 className="font-medium">Mode of consultation</h3>
          {isConsultationOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
        
        {isConsultationOpen && (
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="video-consult"
                data-testid="filter-video-consult"
                name="consultation-mode"
                checked={filters.consultationMode === 'video'}
                onChange={() => handleConsultationChange('video')}
                className="h-4 w-4 text-doctor-blue focus:ring-doctor-blue"
              />
              <label htmlFor="video-consult" className="ml-2 text-sm">
                Video Consult
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="in-clinic"
                data-testid="filter-in-clinic"
                name="consultation-mode"
                checked={filters.consultationMode === 'clinic'}
                onChange={() => handleConsultationChange('clinic')}
                className="h-4 w-4 text-doctor-blue focus:ring-doctor-blue"
              />
              <label htmlFor="in-clinic" className="ml-2 text-sm">
                In Clinic
              </label>
            </div>
            {filters.consultationMode && (
              <div className="flex items-center">
                <input
                  type="radio"
                  id="all-modes"
                  name="consultation-mode"
                  checked={!filters.consultationMode}
                  onChange={() => handleConsultationChange(undefined)}
                  className="h-4 w-4 text-doctor-blue focus:ring-doctor-blue"
                />
                <label htmlFor="all-modes" className="ml-2 text-sm">
                  All
                </label>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
