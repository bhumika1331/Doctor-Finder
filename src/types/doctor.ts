
export interface Doctor {
  id: string;
  name: string;
  qualifications: string;
  speciality: string;
  experience: number;
  location: string;
  clinic: string;
  fees: number;
  photo: string;
  consultationModes: {
    videoConsult: boolean;
    inClinic: boolean;
  };
}

export interface SearchParams {
  search?: string;
  consultationMode?: 'video' | 'clinic';
  specialties?: string[];
  sort?: 'fees' | 'experience';
}
