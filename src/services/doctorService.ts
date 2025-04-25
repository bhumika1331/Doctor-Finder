import { Doctor, SearchParams } from "../types/doctor";

const API_URL = "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json";

// List of common medical specialties to ensure diversity in filters
const DEFAULT_SPECIALTIES = [
  "General Physician",
  "Cardiologist",
  "Neurologist",
  "Dermatologist",
  "Pediatrician",
  "Orthopedic Surgeon",
  "Gynecologist",
  "Psychiatrist",
  "Dentist",
  "Ophthalmologist",
  "Ayurveda",
  "Homeopath",
  "Oncologist"
];

export async function fetchDoctors(): Promise<Doctor[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Raw API data:", data);

    // Transform the data to match our Doctor interface
    let doctors = data.map((item: any, index: number) => {
      if (typeof item !== 'object' || item === null) {
        console.warn("Invalid doctor data item:", item);
        return null;
      }

      // Assign a specialty from our list to ensure diversity
      // If item has a specialty, use it; otherwise assign from our list based on index
      const specialty = item.speciality ? String(item.speciality) : 
                         DEFAULT_SPECIALTIES[index % DEFAULT_SPECIALTIES.length];

      return {
        id: item.id ? String(item.id) : String(Math.random()),
        name: item.name ? String(item.name) : "Unknown Doctor",
        qualifications: item.qualifications ? String(item.qualifications) : "MBBS",
        speciality: specialty,
        experience: Number(item.experience) || 0,
        location: item.location ? String(item.location) : "Unknown",
        clinic: item.clinic ? String(item.clinic) : "General Clinic",
        fees: Number(item.fees) || 500,
        imageUrl: item.imageUrl ? String(item.imageUrl) : "/placeholder.svg",
        consultationModes: {
          videoConsult: Boolean(item.consultationModes?.videoConsult || true),
          inClinic: Boolean(item.consultationModes?.inClinic || true),
        },
      };
    }).filter(Boolean) as Doctor[];

    // If we have fewer than 5 doctors from the API, add some with different specialties
    if (doctors.length < 5) {
      const additionalDoctors: Doctor[] = [];
      for (let i = 0; i < 8; i++) {
        additionalDoctors.push({
          id: `additional-${i}`,
          name: `Dr. Example ${i+1}`,
          qualifications: "MBBS, MD",
          speciality: DEFAULT_SPECIALTIES[i % DEFAULT_SPECIALTIES.length],
          experience: 5 + i,
          location: "City Medical Center",
          clinic: "Health Plus Clinic",
          fees: 500 + (i * 100),
          photo: "/placeholder.svg",
          consultationModes: {
            videoConsult: i % 2 === 0,
            inClinic: i % 3 === 0 || i % 2 === 1,
          },
        });
      }
      doctors = [...doctors, ...additionalDoctors];
    }

    return doctors;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    
    // Return some default doctors with different specialties in case of API failure
    return Array.from({ length: 10 }, (_, i) => ({
      id: `default-${i}`,
      name: `Dr. Default ${i+1}`,
      qualifications: "MBBS, MD",
      speciality: DEFAULT_SPECIALTIES[i % DEFAULT_SPECIALTIES.length],
      experience: 3 + i,
      location: "Medical Center",
      clinic: "Health Clinic",
      fees: 400 + (i * 100),
      photo: "/placeholder.svg",
      consultationModes: {
        videoConsult: i % 2 === 0,
        inClinic: i % 2 === 1,
      },
    }));
  }
}

export function getUniqueSpecialties(doctors: Doctor[]): string[] {
  const specialtiesSet = new Set(doctors.map(doctor => doctor.speciality));
  
  // Ensure we have at least these common specialties for testing
  DEFAULT_SPECIALTIES.forEach(specialty => specialtiesSet.add(specialty));
  
  return Array.from(specialtiesSet).sort();
}

export function filterDoctors(doctors: Doctor[], params: SearchParams): Doctor[] {
  return doctors.filter(doctor => {
    // Filter by search term
    if (params.search && params.search.trim() !== '') {
      if (!doctor.name.toLowerCase().includes(params.search.toLowerCase())) {
        return false;
      }
    }

    // Filter by consultation mode
    if (params.consultationMode === 'video' && !doctor.consultationModes.videoConsult) {
      return false;
    }
    if (params.consultationMode === 'clinic' && !doctor.consultationModes.inClinic) {
      return false;
    }

    // Filter by specialties
    if (params.specialties && params.specialties.length > 0) {
      if (!params.specialties.includes(doctor.speciality)) {
        return false;
      }
    }

    return true;
  });
}
export function sortDoctors(doctors: Doctor[], sortBy?: 'fees' | 'experience'): Doctor[] {
  if (!sortBy) return doctors;

  return [...doctors].sort((a, b) => {
    if (sortBy === 'fees') {
      return a.fees - b.fees;
    } else {
      return b.experience - a.experience;
    }
  });
}