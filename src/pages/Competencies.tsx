import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, Award, BookOpen, MoreHorizontal, List, LayoutGrid, Clock } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { mockCompetencies, mockCourses } from '../data/mockData';

const Competencies: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  
  const filteredCompetencies = mockCompetencies.filter(competency => 
    competency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    competency.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getRequiredCourses = (courseIds: string[]) => {
    return courseIds.map(id => mockCourses.find(course => course.id === id)?.name).filter(Boolean);
  };

  const ListView = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-300">Competency</th>
            <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-300">Level</th>
            <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-300">Status</th>
            <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-300">Required Courses</th>
            <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-300">Validity</th>
            <th className="px-4 py-3.5 text-right text-sm font-semibold text-gray-300"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {filteredCompetencies.map(competency => (
            <tr key={competency.id} className="hover:bg-gray-750">
              <td className="px-4 py-4">
                <div>
                  <p className="text-sm font-medium text-white">{competency.name}</p>
                  <p className="text-xs text-gray-400 mt-1">{competency.description}</p>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <Badge variant="primary" size="sm">
                  {competency.level}
                </Badge>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <Badge 
                  variant={competency.status === 'active' ? 'success' : 'danger'} 
                  size="sm"
                >
                  {competency.status === 'active' ? 'Active' : 'Inactive'}
                </Badge>
              </td>
              <td className="px-4 py-4">
                <div className="flex flex-wrap gap-2">
                  {getRequiredCourses(competency.requiresCourses).map((course, index) => (
                    <Badge key={index} variant="primary" size="sm">
                      {course}
                    </Badge>
                  ))}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-gray-300">
                  <Clock size={16} className="text-gray-400 mr-2" />
                  {competency.validityPeriod} months
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-right">
                <Button 
                  size="sm" 
                  variant="secondary"
                  onClick={() => navigate(`/competencies/${competency.id}`)}
                >
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredCompetencies.map(competency => (
        <Card 
          key={competency.id}
          className="hover:border hover:border-blue-600 transition-colors cursor-pointer"
          bordered={false}
          onClick={() => navigate(`/competencies/${competency.id}`)}
        >
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-medium text-white">{competency.name}</h3>
                  <Badge variant="primary" size="sm">{competency.level}</Badge>
                </div>
                <Badge 
                  variant={competency.status === 'active' ? 'success' : 'danger'} 
                  size="sm"
                  className="mt-2"
                >
                  {competency.status === 'active' ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <button className="text-gray-400 hover:text-white">
                <MoreHorizontal size={20} />
              </button>
            </div>
            
            <p className="text-sm text-gray-400">{competency.description}</p>
            
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-300">
                <BookOpen size={16} className="text-gray-400 mr-2" />
                {competency.requiresCourses.length} required courses
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Clock size={16} className="text-gray-400 mr-2" />
                {competency.validityPeriod} months validity
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-700">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Required Courses</h4>
              <div className="flex flex-wrap gap-2">
                {getRequiredCourses(competency.requiresCourses).map((course, index) => (
                  <Badge key={index} variant="primary" size="sm">
                    {course}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2 pt-2">
              <Button 
                size="sm" 
                variant="secondary" 
                fullWidth
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/competencies/${competency.id}`);
                }}
              >
                View Details
              </Button>
              <Button 
                size="sm" 
                variant="primary" 
                fullWidth
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/competencies/${competency.id}/edit`);
                }}
              >
                Edit
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Competencies</h1>
          <p className="text-gray-400 mt-1">
            Manage training competencies and requirements
          </p>
        </div>
        
        <Button
          variant="primary"
          leftIcon={<Plus size={16} />}
          onClick={() => navigate('/competencies/new')}
        >
          Add Competency
        </Button>
      </div>
      
      <Card>
        <div className="p-4">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search competencies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search size={16} />}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="secondary"
                leftIcon={<Filter size={16} />}
                size="sm"
              >
                Filters
              </Button>
              
              <div className="border-l border-gray-700 pl-2 flex space-x-1">
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List size={16} />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid size={16} />
                </Button>
              </div>
            </div>
          </div>
          
          {viewMode === 'list' ? <ListView /> : <GridView />}
        </div>
      </Card>
    </div>
  );
};

export default Competencies;