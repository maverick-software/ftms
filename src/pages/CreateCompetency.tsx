import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Award, BookOpen, Search, X } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { mockCourses } from '../data/mockData';

const CreateCompetency: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    level: 'basic' as 'basic' | 'intermediate' | 'advanced',
    status: 'draft' as 'active' | 'inactive' | 'draft',
    requiresCourses: [] as string[],
    validityPeriod: 12,
    recertificationRequired: true
  });

  // Handle clicks outside of search dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCourses = mockCourses.filter(course => 
    !formData.requiresCourses.includes(course.id) && (
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const selectedCourses = formData.requiresCourses.map(id => 
    mockCourses.find(course => course.id === id)
  ).filter(Boolean);

  const toggleCourse = (courseId: string) => {
    setFormData(prev => ({
      ...prev,
      requiresCourses: prev.requiresCourses.includes(courseId)
        ? prev.requiresCourses.filter(id => id !== courseId)
        : [...prev.requiresCourses, courseId]
    }));
    setSearchTerm('');
    setIsSearchFocused(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    navigate('/competencies');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="secondary"
          onClick={() => navigate('/competencies')}
          leftIcon={<ArrowLeft size={16} />}
        >
          Back
        </Button>
        <h1 className="text-2xl font-bold text-white">Create New Competency</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card title="Basic Information">
              <div className="p-6 space-y-6 bg-gray-800">
                <div>
                  <Input
                    label="Competency Name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter competency name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter competency description"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-gray-300">Level</label>
                    <select
                      value={formData.level}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        level: e.target.value as 'basic' | 'intermediate' | 'advanced'
                      }))}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="basic">Basic</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-gray-300">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        status: e.target.value as 'active' | 'inactive' | 'draft'
                      }))}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="draft">Draft</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
            </Card>

            <Card title="Required Courses">
              <div className="p-6 space-y-6 bg-gray-800">
                <div ref={searchRef} className="relative">
                  <Input
                    placeholder="Search courses to add..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    leftIcon={<Search size={16} />}
                    rightIcon={
                      searchTerm && (
                        <button 
                          onClick={() => setSearchTerm('')}
                          className="text-gray-400 hover:text-white"
                        >
                          <X size={16} />
                        </button>
                      )
                    }
                  />

                  {/* Search Results Dropdown */}
                  {isSearchFocused && (
                    <div className="absolute z-10 w-full mt-2 bg-gray-750 rounded-lg shadow-lg border border-gray-700 max-h-96 overflow-y-auto">
                      {filteredCourses.length > 0 ? (
                        filteredCourses.map(course => (
                          <div
                            key={course.id}
                            className={`
                              p-3 cursor-pointer transition-colors hover:bg-gray-700
                              ${filteredCourses[0].id === course.id ? 'rounded-t-lg' : ''}
                              ${filteredCourses[filteredCourses.length - 1].id === course.id ? 'rounded-b-lg' : ''}
                            `}
                            onClick={() => toggleCourse(course.id)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-white">{course.name}</p>
                                <p className="text-xs text-gray-400 mt-1 line-clamp-2">{course.description}</p>
                              </div>
                              <Badge variant="primary" size="sm" className="ml-2">
                                {course.duration}h
                              </Badge>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-400">
                          No courses found matching your search
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Selected Courses */}
                {selectedCourses.length > 0 && (
                  <div className="mt-6 space-y-2">
                    <h3 className="text-sm font-medium text-gray-300 mb-3">Selected Courses</h3>
                    {selectedCourses.map(course => course && (
                      <div 
                        key={course.id}
                        className="flex items-center justify-between p-3 bg-gray-750 rounded-lg border border-gray-700"
                      >
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-white">{course.name}</h4>
                            <Badge variant="primary" size="sm">
                              {course.duration}h
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-400 mt-1 line-clamp-1">{course.description}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-4"
                          onClick={() => toggleCourse(course.id)}
                        >
                          <X size={16} className="text-gray-400 hover:text-white" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>

            <Card title="Certification Details">
              <div className="p-6 space-y-6 bg-gray-800">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Input
                      label="Validity Period (months)"
                      type="number"
                      value={formData.validityPeriod.toString()}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        validityPeriod: parseInt(e.target.value) || 0
                      }))}
                      leftIcon={<Clock size={16} />}
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-3 pt-8">
                    <input
                      type="checkbox"
                      checked={formData.recertificationRequired}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        recertificationRequired: e.target.checked
                      }))}
                      className="form-checkbox text-blue-500"
                    />
                    <span className="text-sm text-gray-300">Recertification Required</span>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex justify-end space-x-3">
              <Button
                variant="secondary"
                onClick={() => navigate('/competencies')}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                loading={isLoading}
              >
                Create Competency
              </Button>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <Card title="Preview">
            <div className="p-4 bg-gray-800">
              {formData.name ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-white">{formData.name}</h3>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge 
                        variant={formData.status === 'active' ? 'success' : 'warning'} 
                        size="sm"
                      >
                        {formData.status}
                      </Badge>
                      <Badge variant="primary" size="sm">
                        {formData.level}
                      </Badge>
                    </div>
                  </div>

                  {formData.description && (
                    <p className="text-sm text-gray-400">{formData.description}</p>
                  )}

                  {selectedCourses.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Required Courses</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCourses.map(course => course && (
                          <Badge key={course.id} variant="primary" size="sm" icon={<BookOpen size={12} />}>
                            {course.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-400">
                  <p>Fill in the competency details to see a preview</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateCompetency;