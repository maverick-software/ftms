import React from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../components/ui/Card';

const CompetencyDetails: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Competency Details</h1>
      
      <Card className="bg-white shadow-sm">
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Competency ID</h2>
              <p className="text-gray-600">{id}</p>
            </div>
            
            {/* Placeholder content - replace with actual competency data */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Description</h2>
              <p className="text-gray-600">
                Details for this competency will be populated from your data source.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CompetencyDetails;