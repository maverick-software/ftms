import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import StudentForm from '../components/students/StudentForm';
import StudentAchievements from '../components/students/StudentAchievements';

const NewStudent: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [achievements, setAchievements] = React.useState({
    completedCourses: [],
    completedCompetencies: [],
    certifications: []
  });

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    // Simulate API call with combined data
    const studentData = {
      ...data,
      achievements
    };
    console.log('Submitting:', studentData);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    navigate('/students');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="secondary"
          onClick={() => navigate('/students')}
          leftIcon={<ArrowLeft size={16} />}
        >
          Back
        </Button>
        <h1 className="text-2xl font-bold text-white">Add New Student</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg p-6">
            <StudentForm
              onSubmit={handleSubmit}
              onCancel={() => navigate('/students')}
              isLoading={isLoading}
            />
          </div>
        </div>

        <div>
          <StudentAchievements
            onUpdate={setAchievements}
          />
        </div>
      </div>
    </div>
  );
};

export default NewStudent;