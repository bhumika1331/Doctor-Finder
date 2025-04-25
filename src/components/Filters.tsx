import React from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { SearchParams } from "../types/doctor";

interface FiltersProps {
  specialties: string[];
  filters: SearchParams;
  onFilterChange: (filters: Partial<SearchParams>) => void;
}

const Filters: React.FC<FiltersProps> = ({
  specialties,
  filters,
  onFilterChange,
}) => {
  const [isSpecialtiesOpen, setIsSpecialtiesOpen] = React.useState(true);
  const [isConsultationOpen, setIsConsultationOpen] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleConsultationChange = (mode?: "video" | "clinic") => {
    onFilterChange({ consultationMode: mode });
  };

  const handleSpecialtyChange = (specialty: string) => {
    const current = filters.specialties || [];
    const updated = current.includes(specialty)
      ? current.filter((s) => s !== specialty)
      : [...current, specialty];

    onFilterChange({ specialties: updated });
  };

  const clearAllFilters = () => {
    onFilterChange({
      consultationMode: undefined,
      specialties: [],
    });
  };

  const filteredSpecialties = specialties.filter((s) =>
    s.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-4 space-y-4">
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={clearAllFilters}
          className="text-sm text-blue-600 hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Specialties Filter */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setIsSpecialtiesOpen((prev) => !prev)}
        >
          <h3 className="font-semibold text-gray-700">Specialties</h3>
          {isSpecialtiesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        {isSpecialtiesOpen && (
          <div className="mt-2">
            {/* Search Bar */}
            <div className="flex items-center bg-gray-100 rounded px-2 py-1 mb-2">
              <Search size={16} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="ml-2 bg-transparent outline-none text-sm w-full"
              />
            </div>

            <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
              {filteredSpecialties.map((specialty) => (
                <div key={specialty} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`specialty-${specialty}`}
                    data-testid={`filter-specialty-${specialty}`}
                    checked={filters.specialties?.includes(specialty) || false}
                    onChange={() => handleSpecialtyChange(specialty)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <label htmlFor={`specialty-${specialty}`} className="ml-2 text-sm">
                    {specialty}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Consultation Mode */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setIsConsultationOpen((prev) => !prev)}
        >
          <h3 className="font-semibold text-gray-700">Mode of consultation</h3>
          {isConsultationOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        {isConsultationOpen && (
          <div className="mt-2 space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="all-modes"
                name="consultation-mode"
                checked={!filters.consultationMode}
                onChange={() => handleConsultationChange(undefined)}
                className="h-4 w-4 text-blue-600"
              />
              <label htmlFor="all-modes" className="ml-2 text-sm">
                All
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="video"
                name="consultation-mode"
                checked={filters.consultationMode === "video"}
                onChange={() => handleConsultationChange("video")}
                className="h-4 w-4 text-blue-600"
              />
              <label htmlFor="video" className="ml-2 text-sm">
                Video Consultation
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="clinic"
                name="consultation-mode"
                checked={filters.consultationMode === "clinic"}
                onChange={() => handleConsultationChange("clinic")}
                className="h-4 w-4 text-blue-600"
              />
              <label htmlFor="clinic" className="ml-2 text-sm">
                In-clinic Consultation
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
