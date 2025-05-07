import React, { useRef } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Shield, Building2, Upload, X } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Student, Organization } from '../../types';
import { mockOrganizations } from '../../data/mockData';

interface StudentFormProps {
  student?: Student;
  onSubmit: (data: Partial<Student>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const StudentForm: React.FC<StudentFormProps> = ({
  student,
  onSubmit,
  onCancel,
  isLoading = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = React.useState({
    firstName: student?.firstName || '',
    lastName: student?.lastName || '',
    email: student?.email || '',
    phone: student?.phone || '',
    address: student?.address || '',
    city: student?.city || '',
    state: student?.state || '',
    zip: student?.zip || '',
    dateOfBirth: student?.dateOfBirth || '',
    emergencyContact: student?.emergencyContact || '',
    emergencyPhone: student?.emergencyPhone || '',
    organizationId: student?.organization?.id || '',
    notes: student?.notes || '',
    photoFile: null as File | null,
    photoPreview: student?.photoUrl || ''
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        photoFile: file,
        photoPreview: URL.createObjectURL(file)
      }));
    }
  };

  const removePhoto = () => {
    setFormData(prev => ({
      ...prev,
      photoFile: null,
      photoPreview: ''
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="relative">
          <div className="h-24 w-24 rounded-full bg-gray-700 overflow-hidden">
            {formData.photoPreview ? (
              <img 
                src={formData.photoPreview} 
                alt="Student" 
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-2xl text-white">
                {formData.firstName && formData.lastName ? (
                  `${formData.firstName.charAt(0)}${formData.lastName.charAt(0)}`
                ) : (
                  <User size={32} />
                )}
              </div>
            )}
          </div>
          {formData.photoPreview && (
            <button
              type="button"
              onClick={removePhoto}
              className="absolute -top-1 -right-1 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
            >
              <X size={14} />
            </button>
          )}
        </div>
        <div>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            leftIcon={<Upload size={16} />}
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Photo
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handlePhotoChange}
          />
          <p className="mt-2 text-xs text-gray-400">
            Recommended: Square JPG, PNG. Max 5MB.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          value={formData.firstName}
          onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
          leftIcon={<User size={16} />}
          placeholder="Enter first name"
          required
        />
        
        <Input
          label="Last Name"
          value={formData.lastName}
          onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
          leftIcon={<User size={16} />}
          placeholder="Enter last name"
          required
        />
        
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          leftIcon={<Mail size={16} />}
          placeholder="student@example.com"
          required
        />
        
        <Input
          label="Phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          leftIcon={<Phone size={16} />}
          placeholder="(555) 123-4567"
          required
        />
        
        <Input
          label="Date of Birth"
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
          leftIcon={<Calendar size={16} />}
          required
        />
        
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-300">Organization</label>
          <select
            value={formData.organizationId}
            onChange={(e) => setFormData(prev => ({ ...prev, organizationId: e.target.value }))}
            className="w-full min-w-[240px] bg-gray-700 border border-gray-600 rounded-md px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Independent</option>
            {mockOrganizations.map(org => (
              <option key={org.id} value={org.id}>{org.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Address Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Input
              label="Street Address"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              leftIcon={<MapPin size={16} />}
              placeholder="123 Main Street"
              required
            />
          </div>
          
          <Input
            label="City"
            value={formData.city}
            onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
            placeholder="Enter city"
            required
          />
          
          <Input
            label="State"
            value={formData.state}
            onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
            placeholder="Enter state"
            required
          />
          
          <Input
            label="ZIP Code"
            value={formData.zip}
            onChange={(e) => setFormData(prev => ({ ...prev, zip: e.target.value }))}
            placeholder="12345"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Emergency Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Emergency Contact Name"
            value={formData.emergencyContact}
            onChange={(e) => setFormData(prev => ({ ...prev, emergencyContact: e.target.value }))}
            leftIcon={<User size={16} />}
            placeholder="Enter emergency contact name"
            required
          />
          
          <Input
            label="Emergency Contact Phone"
            value={formData.emergencyPhone}
            onChange={(e) => setFormData(prev => ({ ...prev, emergencyPhone: e.target.value }))}
            leftIcon={<Phone size={16} />}
            placeholder="(555) 123-4567"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Additional Information</h3>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          rows={4}
          className="w-full min-w-[240px] bg-gray-700 border border-gray-600 rounded-md px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Add any additional notes about the student..."
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          loading={isLoading}
        >
          {student ? 'Update Student' : 'Create Student'}
        </Button>
      </div>
    </form>
  );
};

export default StudentForm;