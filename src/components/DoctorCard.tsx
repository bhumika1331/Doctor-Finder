import React from 'react';
import { Doctor } from '../types/doctor';
import { MapPin, Building } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  // Function to generate random doctor image URL
  const getRandomDoctorImage = () => {
    const gender = Math.random() > 0.5 ? 'men' : 'women';
    const randomId = Math.floor(Math.random() * 100);
    return `https://randomuser.me/api/portraits/${gender}/${randomId}.jpg`;
  };

  // Safety checks to ensure all data is properly formatted
  const name = typeof doctor.name === 'string' ? doctor.name : 'Unknown Doctor';
  const qualifications = typeof doctor.qualifications === 'string' ? doctor.qualifications : 'MBBS';
  const speciality = typeof doctor.speciality === 'string' ? doctor.speciality : 'General Physician';
  const experience = typeof doctor.experience === 'number' ? doctor.experience : 0;
  const location = typeof doctor.location === 'string' ? doctor.location : 'Unknown';
  const clinic = typeof doctor.clinic === 'string' ? doctor.clinic : 'General Clinic';
  const fees = typeof doctor.fees === 'number' ? doctor.fees : 500;
  
  // Use doctor photo if available, otherwise use random image
  const imageUrl = typeof doctor.photo === 'string' && doctor.photo 
    ? doctor.photo 
    : getRandomDoctorImage();

  return (
    <div className="bg-white rounded-md shadow-md p-6 mb-4">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/6 mb-4 md:mb-0 flex justify-center">
          <img
            src={imageUrl}
            alt={name}
            className="w-20 h-20 rounded-full object-cover"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
        </div>
        <div className="md:w-3/4 flex flex-col">
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-gray-600">{speciality}</p>
          <p className="text-gray-500 text-sm">{qualifications}</p>
          <p className="text-gray-500 my-1">{experience} yrs exp.</p>
          <div className="flex items-center text-gray-500 text-sm mt-2">
            <Building size={16} className="mr-1" />
            <span>{clinic}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin size={16} className="mr-1" />
            <span>{location}</span>
          </div>
        </div>
        <div className="md:w-1/6 flex flex-col items-end justify-between">
          <div className="text-lg font-semibold text-fee-green">
            ₹ {fees}
          </div>
          <button className="mt-4 bg-white text-doctor-blue border border-doctor-blue px-4 py-2 rounded-md hover:bg-doctor-blue hover:text-white transition-colors">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;