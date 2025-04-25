
// import { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { SearchParams } from '../types/doctor';

// export function useSearchParams(): [SearchParams, (newParams: Partial<SearchParams>) => void] {
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   const readSearchParams = (): SearchParams => {
//     const params = new URLSearchParams(location.search);
    
//     const searchParams: SearchParams = {};
    
//     // Get search term
//     const search = params.get('search');
//     if (search) searchParams.search = search;
    
//     // Get consultation mode
//     const mode = params.get('mode');
//     if (mode === 'video' || mode === 'clinic') {
//       searchParams.consultationMode = mode;
//     }
    
//     // Get specialties
//     const specialtiesParam = params.get('specialties');
//     if (specialtiesParam) {
//       searchParams.specialties = specialtiesParam.split(',');
//     }
    
//     // Get sort
//     const sort = params.get('sort');
//     if (sort === 'fees' || sort === 'experience') {
//       searchParams.sort = sort;
//     }
    
//     return searchParams;
//   };
  
//   const [searchParams, setSearchParamsState] = useState<SearchParams>(readSearchParams());
  
//   // Update the URL when searchParams changes
//   const updateSearchParams = (newParams: Partial<SearchParams>) => {
//     const updatedParams = { ...searchParams, ...newParams };
    
//     // Clean up empty values
//     Object.keys(updatedParams).forEach(key => {
//       const typedKey = key as keyof SearchParams;
//       if (Array.isArray(updatedParams[typedKey]) && (updatedParams[typedKey] as string[]).length === 0) {
//         delete updatedParams[typedKey];
//       }
//       if (updatedParams[typedKey] === '' || updatedParams[typedKey] === undefined) {
//         delete updatedParams[typedKey];
//       }
//     });
    
//     setSearchParamsState(updatedParams);
    
//     // Update URL
//     const params = new URLSearchParams();
    
//     if (updatedParams.search) params.set('search', updatedParams.search);
//     if (updatedParams.consultationMode) params.set('mode', updatedParams.consultationMode);
//     if (updatedParams.specialties && updatedParams.specialties.length > 0) {
//       params.set('specialties', updatedParams.specialties.join(','));
//     }
//     if (updatedParams.sort) params.set('sort', updatedParams.sort);
    
//     navigate({ search: params.toString() });
//   };
  
//   // Listen for browser back/forward navigation
//   useEffect(() => {
//     const currentParams = readSearchParams();
//     setSearchParamsState(currentParams);
//   }, [location.search]);
  
//   return [searchParams, updateSearchParams];
// }

import { useState } from 'react';
import { SearchParams } from '../types/doctor';

export function useSearchParams() {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    search: '',
    specialties: [],
    consultationMode: undefined,
    sort: 'fees'
  });
  
  const updateSearchParams = (params: Partial<SearchParams>) => {
    setSearchParams(prevParams => ({
      ...prevParams,
      ...params
    }));
  };
  
  return [searchParams, updateSearchParams] as const;
}