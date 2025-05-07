import React from 'react';
import { Users, BookOpen, Award, ShieldAlert } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import RecentStudents from '../components/dashboard/RecentStudents';
import CourseCompletionChart from '../components/dashboard/CourseCompletionChart';
import InsuranceStatusCard from '../components/dashboard/InsuranceStatusCard';
import RenewalCard from '../components/dashboard/RenewalCard';
import { mockStudents, mockDashboardStats } from '../data/mockData';

const Dashboard: React.FC = () => {
  // Chart data for course completions
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [8, 12, 15, 10, 14, 8]
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Students"
          value={mockDashboardStats.totalStudents}
          icon={<Users size={20} />}
          change={{ value: 12, isPositive: true }}
          variant="primary"
        />
        
        <StatCard 
          title="Active Students"
          value={mockDashboardStats.activeStudents}
          icon={<Users size={20} />}
          footer="83% of total students"
        />
        
        <StatCard 
          title="Completed Courses"
          value={mockDashboardStats.completedCourses}
          icon={<BookOpen size={20} />}
          change={{ value: 8, isPositive: true }}
          variant="success"
        />
        
        <StatCard 
          title="Insurance Expiring"
          value={mockDashboardStats.expiringInsurance}
          icon={<ShieldAlert size={20} />}
          footer="In the next 30 days"
          variant="warning"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RenewalCard renewals={mockDashboardStats.upcomingRenewals} />
        <CourseCompletionChart data={chartData} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InsuranceStatusCard students={mockStudents} />
        <RecentStudents students={mockStudents} />
      </div>
    </div>
  );
};

export default Dashboard;