
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import AutocompleteSearch from '../components/AutocompleteSearch';
import Filters from '../components/Filters';
import SortOptions from '../components/SortOptions';
import DoctorCard from '../components/DoctorCard';
import { fetchDoctors, filterDoctors, getUniqueSpecialties, sortDoctors } from '../services/doctorService';
import { Doctor } from '../types/doctor';
import { useSearchParams } from '../hooks/useSearchParams';

const Index = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, updateSearchParams] = useSearchParams();
  
  // Fetch doctors on component mount
  useEffect(() => {
    const getDoctors = async () => {
      setIsLoading(true);
      try {
        const doctorData = await fetchDoctors();
        console.log("Fetched doctor data:", doctorData);
        setDoctors(doctorData);
        
        // Extract unique specialties
        const uniqueSpecialties = getUniqueSpecialties(doctorData);
        setSpecialties(uniqueSpecialties);
        
      } catch (error) {
        toast.error('Failed to load doctors');
        console.error('Error loading doctors:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    getDoctors();
  }, []);
  
  // Apply filters and sort when doctors or search params change
  useEffect(() => {
    if (doctors.length > 0) {
      // Apply filters
      const filtered = filterDoctors(doctors, searchParams);
      console.log("Filtered doctors:", filtered);
      
      // Apply sorting
      const sorted = sortDoctors(filtered, searchParams.sort);
      console.log("Sorted doctors:", sorted);
      
      setFilteredDoctors(sorted);
    }
  }, [doctors, searchParams]);
  
  const handleSearch = (search: string) => {
    updateSearchParams({ search: search || undefined });
  };
  
  const handleFilterChange = (filters: Partial<typeof searchParams>) => {
    updateSearchParams(filters);
  };
  
  const handleSortChange = (sort?: 'fees' | 'experience') => {
    updateSearchParams({ sort });
  };
  
  return (
    <div className="min-h-screen bg-doctor-light-bg">
      {/* Header */}
      <header className="bg-doctor-blue text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-4">Doctor Finder</h1>
          <AutocompleteSearch 
            doctors={doctors} 
            currentSearch={searchParams.search || ''} 
            onSearch={handleSearch} 
          />
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Sidebar - Filters */}
          <div className="md:w-1/4">
            <SortOptions 
              currentSort={searchParams.sort} 
              onSortChange={handleSortChange} 
            />
            <Filters 
              specialties={specialties} 
              filters={searchParams} 
              onFilterChange={handleFilterChange} 
            />
          </div>
          
          {/* Right Section - Doctor List */}
          <div className="md:w-3/4">
            {isLoading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-doctor-blue"></div>
              </div>
            ) : (
              <>
                {filteredDoctors.length > 0 ? (
                  <>
                    <div className="mb-4 text-gray-600">
                      Found {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
                    </div>
                    {filteredDoctors.map((doctor) => (
                      <DoctorCard key={doctor.id} doctor={doctor} />
                    ))}
                  </>
                ) : (
                  <div className="text-center py-10">
                    <h3 className="text-xl font-medium text-gray-700">No doctors found</h3>
                    <p className="text-gray-500 mt-2">Try changing your search or filter criteria</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
  
  function handleSearch(search: string) {
    updateSearchParams({ search: search || undefined });
  }
  
  function handleFilterChange(filters: Partial<typeof searchParams>) {
    updateSearchParams(filters);
  }
  
  function handleSortChange(sort?: 'fees' | 'experience') {
    updateSearchParams({ sort });
  }
};

export default Index;
