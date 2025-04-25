
import React from 'react';
import { Doctor } from '../types/doctor';
import { MapPin, Building } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div className="bg-white rounded-md shadow-md p-6 mb-4">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/6 mb-4 md:mb-0 flex justify-center">
          <img 
            src={doctor.imageUrl || "/placeholder.svg"} 
            alt={doctor.name} 
            className="w-20 h-20 rounded-full object-cover"
          />
        </div>
        
        <div className="md:w-3/4 flex flex-col">
          <h2 className="text-xl font-semibold">{doctor.name}</h2>
          <p className="text-gray-600">{doctor.speciality}</p>
          <p className="text-gray-500 text-sm">{doctor.qualifications}</p>
          <p className="text-gray-500 my-1">{doctor.experience} yrs exp.</p>
          
          <div className="flex items-center text-gray-500 text-sm mt-2">
            <Building size={16} className="mr-1" />
            <span>{doctor.clinic}</span>
          </div>
          
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin size={16} className="mr-1" />
            <span>{doctor.location}</span>
          </div>
        </div>
        
        <div className="md:w-1/6 flex flex-col items-end justify-between">
          <div className="text-lg font-semibold text-fee-green">
            ₹ {doctor.fees}
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
