import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Clock, Award } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { mockFirearms, mockAdditionalElements } from '../data/mockData';

const CreateCourse: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    status: 'draft',
    requirements: [''],
    firearms: [] as string[],
    legalKnowledge: false,
    mentalHealthTraining: false,
    additionalElements: [] as string[],
    deliveryMethod: 'classroom' as 'online' | 'classroom' | 'hybrid',
    assessments: {
      writtenExam: false,
      verbalExam: false,
      rangeShooting: false,
      qualificationStandards: ''
    }
  });

  const handleAddRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const handleRemoveRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const handleRequirementChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => i === index ? value : req)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    navigate('/courses');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="secondary"
          onClick={() => navigate('/courses')}
          leftIcon={<ArrowLeft size={16} />}
        >
          Back
        </Button>
        <h1 className="text-2xl font-bold text-white">Create New Course</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card title="Basic Information">
              <div className="p-6 space-y-6 bg-gray-800">
                <div>
                  <Input
                    label="Course Name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter course name"
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
                    placeholder="Enter course description"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Input
                      label="Duration (hours)"
                      type="number"
                      value={formData.duration}
                      onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                      leftIcon={<Clock size={16} />}
                      placeholder="Enter duration"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-gray-300">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="draft">Draft</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-300">
                      Requirements Met
                    </label>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      leftIcon={<Plus size={14} />}
                      onClick={handleAddRequirement}
                    >
                      Add Requirement
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {formData.requirements.map((req, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={req}
                          onChange={(e) => handleRequirementChange(index, e.target.value)}
                          placeholder="Enter requirement"
                          leftIcon={<Award size={16} />}
                        />
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="danger"
                            size="sm"
                            onClick={() => handleRemoveRequirement(index)}
                          >
                            <Minus size={16} />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card title="Training Elements">
              <div className="p-6 space-y-6 bg-gray-800">
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-4">Firearms Included</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {mockFirearms.map(firearm => (
                      <label key={firearm.id} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={formData.firearms.includes(firearm.id)}
                          onChange={(e) => {
                            const newFirearms = e.target.checked
                              ? [...formData.firearms, firearm.id]
                              : formData.firearms.filter(f => f !== firearm.id);
                            setFormData(prev => ({ ...prev, firearms: newFirearms }));
                          }}
                          className="form-checkbox text-blue-500"
                        />
                        <span className="text-sm text-gray-300">{firearm.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-300">Additional Elements</h3>
                  
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.legalKnowledge}
                        onChange={(e) => setFormData(prev => ({ ...prev, legalKnowledge: e.target.checked }))}
                        className="form-checkbox text-blue-500"
                      />
                      <span className="text-sm text-gray-300">Legal Knowledge Training</span>
                    </label>

                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.mentalHealthTraining}
                        onChange={(e) => setFormData(prev => ({ ...prev, mentalHealthTraining: e.target.checked }))}
                        className="form-checkbox text-blue-500"
                      />
                      <span className="text-sm text-gray-300">Mental Health Training</span>
                    </label>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-3">Additional Training Elements</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {mockAdditionalElements.map(element => (
                        <label key={element.id} className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={formData.additionalElements.includes(element.id)}
                            onChange={(e) => {
                              const newElements = e.target.checked
                                ? [...formData.additionalElements, element.id]
                                : formData.additionalElements.filter(el => el !== element.id);
                              setFormData(prev => ({ ...prev, additionalElements: newElements }));
                            }}
                            className="form-checkbox text-blue-500"
                          />
                          <span className="text-sm text-gray-300">{element.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card title="Delivery & Assessment">
              <div className="p-6 space-y-6 bg-gray-800">
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Delivery Method</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {['online', 'classroom', 'hybrid'].map(method => (
                      <label key={method} className="relative flex">
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value={method}
                          checked={formData.deliveryMethod === method}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            deliveryMethod: e.target.value as 'online' | 'classroom' | 'hybrid'
                          }))}
                          className="sr-only"
                        />
                        <div className={`
                          w-full p-3 text-sm text-center rounded-md cursor-pointer
                          ${formData.deliveryMethod === method
                            ? 'bg-blue-900 text-white border-2 border-blue-500'
                            : 'bg-gray-750 text-gray-300 border-2 border-transparent hover:border-gray-600'
                          }
                        `}>
                          {method.charAt(0).toUpperCase() + method.slice(1)}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Assessment Methods</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.assessments.writtenExam}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          assessments: { ...prev.assessments, writtenExam: e.target.checked }
                        }))}
                        className="form-checkbox text-blue-500"
                      />
                      <span className="text-sm text-gray-300">Written Examination</span>
                    </label>

                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.assessments.verbalExam}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          assessments: { ...prev.assessments, verbalExam: e.target.checked }
                        }))}
                        className="form-checkbox text-blue-500"
                      />
                      <span className="text-sm text-gray-300">Verbal Examination</span>
                    </label>

                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.assessments.rangeShooting}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          assessments: { ...prev.assessments, rangeShooting: e.target.checked }
                        }))}
                        className="form-checkbox text-blue-500"
                      />
                      <span className="text-sm text-gray-300">Range Shooting Qualification</span>
                    </label>

                    {formData.assessments.rangeShooting && (
                      <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                          Qualification Standards
                        </label>
                        <textarea
                          value={formData.assessments.qualificationStandards}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            assessments: { ...prev.assessments, qualificationStandards: e.target.value }
                          }))}
                          rows={4}
                          className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          placeholder="Describe the qualification standards and requirements..."
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex justify-end space-x-3">
              <Button
                variant="secondary"
                onClick={() => navigate('/courses')}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                loading={isLoading}
              >
                Create Course
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
                    <Badge 
                      variant={formData.status === 'active' ? 'success' : 'warning'} 
                      size="sm" 
                      className="mt-2"
                    >
                      {formData.status}
                    </Badge>
                  </div>

                  {formData.description && (
                    <p className="text-sm text-gray-400">{formData.description}</p>
                  )}

                  {formData.duration && (
                    <div className="flex items-center text-sm text-gray-300">
                      <Clock size={16} className="text-gray-400 mr-2" />
                      {formData.duration} hours
                    </div>
                  )}

                  {formData.requirements.filter(Boolean).length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Requirements Met</h4>
                      <div className="flex flex-wrap gap-2">
                        {formData.requirements.filter(Boolean).map((req, index) => (
                          <Badge key={index} variant="primary" size="sm">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-400">
                  <p>Fill in the course details to see a preview</p>
                </div>
              )}
            </div>
          </Card>

          <Card title="Help">
            <div className="p-4 bg-gray-800">
              <div className="space-y-4 text-sm text-gray-400">
                <p>
                  <span className="text-white font-medium">Course Name:</span> Choose a clear, descriptive name that reflects the course content.
                </p>
                <p>
                  <span className="text-white font-medium">Description:</span> Provide a detailed overview of what students will learn.
                </p>
                <p>
                  <span className="text-white font-medium">Duration:</span> Estimate the total hours needed to complete the course.
                </p>
                <p>
                  <span className="text-white font-medium">Requirements:</span> List the competencies or certifications this course fulfills.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;