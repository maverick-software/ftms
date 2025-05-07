import React, { useState } from 'react';
import { Upload, Calendar, Award, FileText } from 'lucide-react';
import Modal from './Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Student, Course, Competency } from '../../types';

interface IssueCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
  courseId?: string;
  competencyId?: string;
  onSubmit: (data: {
    certificateNumber: string;
    issueDate: string;
    expirationDate?: string;
    certificateFile?: File;
  }) => Promise<void>;
}

const IssueCertificateModal: React.FC<IssueCertificateModalProps> = ({
  isOpen,
  onClose,
  student,
  courseId,
  competencyId,
  onSubmit
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    certificateNumber: '',
    issueDate: new Date().toISOString().split('T')[0],
    expirationDate: '',
    certificateFile: null as File | null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error issuing certificate:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Issue Certificate"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-4 bg-gray-750 rounded-lg">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-white">
              {student.firstName.charAt(0)}{student.lastName.charAt(0)}
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-white">
                {student.firstName} {student.lastName}
              </h3>
              <p className="text-xs text-gray-400">{student.email}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            label="Certificate Number"
            value={formData.certificateNumber}
            onChange={(e) => setFormData(prev => ({ ...prev, certificateNumber: e.target.value }))}
            leftIcon={<Award size={16} />}
            placeholder="Enter certificate number"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Issue Date"
              type="date"
              value={formData.issueDate}
              onChange={(e) => setFormData(prev => ({ ...prev, issueDate: e.target.value }))}
              leftIcon={<Calendar size={16} />}
              required
            />

            <Input
              label="Expiration Date"
              type="date"
              value={formData.expirationDate}
              onChange={(e) => setFormData(prev => ({ ...prev, expirationDate: e.target.value }))}
              leftIcon={<Calendar size={16} />}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Upload Certificate
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <FileText size={24} className="mx-auto text-gray-400" />
                <div className="flex text-sm text-gray-400">
                  <label className="relative cursor-pointer rounded-md font-medium text-blue-500 hover:text-blue-400">
                    <span>Upload a file</span>
                    <input
                      type="file"
                      className="sr-only"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setFormData(prev => ({ ...prev, certificateFile: file }));
                        }
                      }}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-400">
                  PDF, PNG, JPG up to 10MB
                </p>
              </div>
            </div>
            {formData.certificateFile && (
              <p className="mt-2 text-sm text-gray-400">
                Selected file: {formData.certificateFile.name}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={isLoading}
          >
            Issue Certificate
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default IssueCertificateModal;