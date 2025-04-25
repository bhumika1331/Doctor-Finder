
import { Doctor, SearchParams } from "../types/doctor";

const API_URL = "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json";

export async function fetchDoctors(): Promise<Doctor[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    
    // Transform the data to match our Doctor interface
    return data.map((item: any) => ({
      id: item.id || String(Math.random()),
      name: item.name || "Unknown Doctor",
      qualifications: item.qualifications || "MBBS",
      speciality: item.speciality || "General Physician",
      experience: item.experience || 0,
      location: item.location || "Unknown",
      clinic: item.clinic || "General Clinic",
      fees: item.fees || 500,
      imageUrl: item.imageUrl || "/placeholder.svg",
      consultationModes: {
        videoConsult: item.consultationModes?.videoConsult || true,
        inClinic: item.consultationModes?.inClinic || true,
      },
    }));
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
}

export function getUniqueSpecialties(doctors: Doctor[]): string[] {
  const specialtiesSet = new Set(doctors.map(doctor => doctor.speciality));
  return Array.from(specialtiesSet).sort();
}

export function filterDoctors(doctors: Doctor[], params: SearchParams): Doctor[] {
  return doctors.filter(doctor => {
    // Filter by search term
    if (params.search && !doctor.name.toLowerCase().includes(params.search.toLowerCase())) {
      return false;
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
