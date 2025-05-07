import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, Clock, Users, BookOpen, MoreHorizontal, List, LayoutGrid } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { mockCourses, mockEnrollments } from '../data/mockData';

const Courses: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  
  const filteredCourses = mockCourses.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStatusBadge = (status: string) => {
    const statusProps = {
      active: { variant: 'success' as const, label: 'Active' },
      inactive: { variant: 'danger' as const, label: 'Inactive' },
      draft: { variant: 'warning' as const, label: 'Draft' }
    };
    
    const { variant, label } = statusProps[status as keyof typeof statusProps];
    return <Badge variant={variant} size="sm">{label}</Badge>;
  };

  const getEnrollmentCount = (courseId: string) => {
    return mockEnrollments.filter(e => e.courseId === courseId).length;
  };

  const ListView = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-300">Course</th>
            <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-300">Status</th>
            <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-300">Duration</th>
            <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-300">Enrolled</th>
            <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-300">Requirements</th>
            <th className="px-4 py-3.5 text-right text-sm font-semibold text-gray-300"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {filteredCourses.map(course => (
            <tr key={course.id} className="hover:bg-gray-750">
              <td className="px-4 py-4">
                <div>
                  <p className="text-sm font-medium text-white">{course.name}</p>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">{course.description}</p>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                {getStatusBadge(course.status)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-gray-300">
                  <Clock size={16} className="text-gray-400 mr-2" />
                  {course.duration} hours
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-gray-300">
                  <Users size={16} className="text-gray-400 mr-2" />
                  {getEnrollmentCount(course.id)} students
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex flex-wrap gap-2">
                  {course.requirementsMet.map((req, index) => (
                    <Badge key={index} variant="primary" size="sm">
                      {req}
                    </Badge>
                  ))}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-right">
                <Button 
                  size="sm" 
                  variant="secondary"
                  onClick={() => navigate(`/courses/${course.id}`)}
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
      {filteredCourses.map(course => (
        <Card 
          key={course.id}
          className="hover:border hover:border-blue-600 transition-colors cursor-pointer"
          bordered={false}
          onClick={() => navigate(`/courses/${course.id}`)}
        >
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-medium text-white">{course.name}</h3>
                  {getStatusBadge(course.status)}
                </div>
                <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                  {course.description}
                </p>
              </div>
              <button className="text-gray-400 hover:text-white">
                <MoreHorizontal size={20} />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-300">
                <Clock size={16} className="text-gray-400 mr-2" />
                Duration: {course.duration} hours
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Users size={16} className="text-gray-400 mr-2" />
                {getEnrollmentCount(course.id)} enrolled
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <BookOpen size={16} className="text-gray-400 mr-2" />
                {course.requirementsMet.length} competencies
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-700">
              <div className="flex flex-wrap gap-2">
                {course.requirementsMet.map((req, index) => (
                  <Badge key={index} variant="primary" size="sm">
                    {req}
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
                  navigate(`/courses/${course.id}`);
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
                  // Handle edit action
                }}
              >
                Edit Course
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
          <h1 className="text-2xl font-bold text-white">Courses</h1>
          <p className="text-gray-400 mt-1">
            Manage training courses and curriculum
          </p>
        </div>
        
        <Button
          variant="primary"
          leftIcon={<Plus size={16} />}
          onClick={() => navigate('/courses/new')}
        >
          Create Course
        </Button>
      </div>
      
      <Card>
        <div className="p-4">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search courses..."
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

export default Courses;