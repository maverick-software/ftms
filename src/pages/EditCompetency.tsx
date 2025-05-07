import React from 'react';
import { useParams } from 'react-router-dom';

const EditCompetency: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Competency</h1>
      <div className="bg-white rounded-lg shadow p-6">
        {/* Form will be implemented later */}
        <p className="text-gray-600">Editing competency ID: {id}</p>
      </div>
    </div>
  );
};

export default EditCompetency;