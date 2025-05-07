import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Filter, 
  Calendar, 
  Users, 
  Award,
  Building2,
  Shield,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import { mockStudents, mockOrganizations } from '../data/mockData';

const Reports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [selectedOrg, setSelectedOrg] = useState<string>('');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'excel'>('pdf');
  
  const reports = [
    {
      id: 'student-progress',
      name: 'Student Progress Report',
      description: 'Detailed progress tracking for all enrolled students',
      icon: Users,
      lastGenerated: '2024-03-15',
      type: 'PDF',
      category: 'students'
    },
    {
      id: 'certification-status',
      name: 'Certification Status Report',
      description: 'Overview of all active and expired certifications',
      icon: Award,
      lastGenerated: '2024-03-14',
      type: 'Excel',
      category: 'certifications'
    },
    {
      id: 'monthly-summary',
      name: 'Monthly Training Summary',
      description: 'Summary of all training activities and completions',
      icon: Calendar,
      lastGenerated: '2024-03-01',
      type: 'PDF',
      category: 'training'
    },
    // Organization Reports
    {
      id: 'org-students',
      name: 'Organization Students Report',
      description: 'Complete list of students by organization with status and progress',
      icon: Building2,
      lastGenerated: '2024-03-16',
      type: 'Excel',
      category: 'organization'
    },
    {
      id: 'org-expiring-certs',
      name: 'Expiring Certifications',
      description: 'Students with certifications expiring in the next 90 days',
      icon: AlertTriangle,
      lastGenerated: '2024-03-16',
      type: 'Excel',
      category: 'organization'
    },
    {
      id: 'org-competencies',
      name: 'Competency Distribution',
      description: 'Analysis of student competencies and certification levels',
      icon: Award,
      lastGenerated: '2024-03-16',
      type: 'PDF',
      category: 'organization'
    },
    {
      id: 'org-insurance',
      name: 'Insurance Status Report',
      description: 'Overview of student insurance status and upcoming renewals',
      icon: Shield,
      lastGenerated: '2024-03-16',
      type: 'Excel',
      category: 'organization'
    }
  ];

  const reportCategories = [
    { id: 'all', name: 'All Reports' },
    { id: 'organization', name: 'Organization Reports' },
    { id: 'students', name: 'Student Reports' },
    { id: 'certifications', name: 'Certification Reports' },
    { id: 'training', name: 'Training Reports' }
  ];

  const [activeCategory, setActiveCategory] = useState('all');

  const filteredReports = reports.filter(report => 
    activeCategory === 'all' || report.category === activeCategory
  );

  const generateExcelReport = (reportId: string) => {
    let data: any[] = [];
    let filename = 'report.xlsx';

    // Generate report data based on report type
    switch (reportId) {
      case 'org-students':
        data = mockStudents
          .filter(s => !selectedOrg || s.organization?.id === selectedOrg)
          .map(student => ({
            'First Name': student.firstName,
            'Last Name': student.lastName,
            'Email': student.email,
            'Status': student.status,
            'Organization': student.organization?.name || 'Independent',
            'Insurance Status': student.insurance.hasValidInsurance ? 'Valid' : 'Invalid',
            'Insurance Expiry': new Date(student.insurance.carryInsuranceExpirationDate).toLocaleDateString()
          }));
        filename = 'organization-students.xlsx';
        break;

      case 'org-insurance':
        data = mockStudents
          .filter(s => !selectedOrg || s.organization?.id === selectedOrg)
          .map(student => ({
            'Student Name': `${student.firstName} ${student.lastName}`,
            'Insurance Provider': student.insurance.carryInsuranceProvider,
            'Policy Number': student.insurance.carryInsurancePolicyNumber,
            'Status': student.insurance.hasValidInsurance ? 'Valid' : 'Invalid',
            'Expiration Date': new Date(student.insurance.carryInsuranceExpirationDate).toLocaleDateString()
          }));
        filename = 'insurance-status.xlsx';
        break;

      // Add more cases for other report types
    }

    // Create workbook and add data
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Report');
    
    // Save file
    XLSX.writeFile(wb, filename);
  };

  const generatePDFReport = (reportId: string) => {
    const doc = new jsPDF();
    let filename = 'report.pdf';

    // Add report header
    const report = reports.find(r => r.id === reportId);
    doc.setFontSize(20);
    doc.text(report?.name || 'Report', 20, 20);
    doc.setFontSize(12);
    doc.text(new Date().toLocaleDateString(), 20, 30);

    // Generate report content based on type
    switch (reportId) {
      case 'org-students': {
        const data = mockStudents
          .filter(s => !selectedOrg || s.organization?.id === selectedOrg)
          .map(student => [
            `${student.firstName} ${student.lastName}`,
            student.email,
            student.status,
            student.organization?.name || 'Independent',
            student.insurance.hasValidInsurance ? 'Valid' : 'Invalid'
          ]);

        (doc as any).autoTable({
          startY: 40,
          head: [['Name', 'Email', 'Status', 'Organization', 'Insurance']],
          body: data
        });

        filename = 'organization-students.pdf';
        break;
      }

      case 'org-competencies': {
        // Add competency distribution data
        const data = mockStudents
          .filter(s => !selectedOrg || s.organization?.id === selectedOrg)
          .map(student => [
            `${student.firstName} ${student.lastName}`,
            student.certifications.map(c => c.name).join(', '),
            student.certifications.length
          ]);

        (doc as any).autoTable({
          startY: 40,
          head: [['Student', 'Certifications', 'Total']],
          body: data
        });

        filename = 'competency-distribution.pdf';
        break;
      }

      // Add more cases for other report types
    }

    // Save PDF
    doc.save(filename);
  };

  const handleGenerateReport = () => {
    if (!selectedReport) return;

    if (selectedFormat === 'excel') {
      generateExcelReport(selectedReport);
    } else {
      generatePDFReport(selectedReport);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Reports</h1>
          <p className="text-gray-400 mt-1">
            Generate and download training reports
          </p>
        </div>
        
        <div className="flex space-x-3">
          <Button
            variant="secondary"
            leftIcon={<Filter size={16} />}
          >
            Filter Data
          </Button>
          <Button
            variant="primary"
            leftIcon={<FileText size={16} />}
          >
            New Report
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <div className="p-4">
              <div className="flex flex-wrap gap-2">
                {reportCategories.map(category => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </Card>

          <Card title="Available Reports">
            <div className="p-4 space-y-4">
              {filteredReports.map(report => (
                <div 
                  key={report.id}
                  className={`
                    p-4 rounded-lg border cursor-pointer transition-colors
                    ${selectedReport === report.id 
                      ? 'bg-blue-900/30 border-blue-500' 
                      : 'bg-gray-750 border-gray-700 hover:border-blue-500'}
                  `}
                  onClick={() => setSelectedReport(report.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="p-2 rounded-lg bg-gray-700">
                        <report.icon size={20} className="text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-white">{report.name}</h3>
                        <p className="text-xs text-gray-400 mt-1">{report.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="primary" size="sm">PDF</Badge>
                      <Badge variant="primary" size="sm">Excel</Badge>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-700 flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      Last generated: {new Date(report.lastGenerated).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        leftIcon={<Download size={14} />}
                        onClick={(e) => {
                          e.stopPropagation();
                          generatePDFReport(report.id);
                        }}
                      >
                        PDF
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        leftIcon={<Download size={14} />}
                        onClick={(e) => {
                          e.stopPropagation();
                          generateExcelReport(report.id);
                        }}
                      >
                        Excel
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        <Card title="Report Settings">
          <div className="p-4">
            {selectedReport ? (
              <div className="space-y-6">
                {/* Organization Selection */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-300">Organization</label>
                  <select
                    value={selectedOrg}
                    onChange={(e) => setSelectedOrg(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="">All Organizations</option>
                    {mockOrganizations.map(org => (
                      <option key={org.id} value={org.id}>{org.name}</option>
                    ))}
                  </select>
                </div>

                <div className="p-4 rounded-lg bg-gray-750">
                  <h3 className="text-sm font-medium text-white mb-2">Date Range</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="date"
                      label="Start Date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                    />
                    <Input
                      type="date"
                      label="End Date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-gray-750">
                  <h3 className="text-sm font-medium text-white mb-2">Include Sections</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox text-blue-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-300">Student Information</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox text-blue-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-300">Certification Status</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox text-blue-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-300">Insurance Details</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox text-blue-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-300">Course Progress</span>
                    </label>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gray-750">
                  <h3 className="text-sm font-medium text-white mb-2">Report Format</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="format" 
                        value="pdf"
                        checked={selectedFormat === 'pdf'}
                        onChange={(e) => setSelectedFormat('pdf')}
                        className="text-blue-500" 
                      />
                      <span className="ml-2 text-sm text-gray-300">PDF Document</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="format" 
                        value="excel"
                        checked={selectedFormat === 'excel'}
                        onChange={(e) => setSelectedFormat('excel')}
                        className="text-blue-500" 
                      />
                      <span className="ml-2 text-sm text-gray-300">Excel Spreadsheet</span>
                    </label>
                  </div>
                </div>
                
                <Button 
                  variant="primary" 
                  fullWidth
                  onClick={handleGenerateReport}
                >
                  Generate Report
                </Button>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <FileText size={40} className="mx-auto mb-3" />
                <p>Select a report to customize settings</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Reports;