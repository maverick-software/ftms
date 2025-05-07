import React from 'react';
import { 
  User, 
  Building2, 
  Bell, 
  Shield, 
  Palette, 
  Mail,
  FileText,
  CreditCard
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const Settings: React.FC = () => {
  const { currentUser } = useAuth();
  
  const settingSections = [
    {
      title: 'Account',
      icon: User,
      items: [
        { name: 'Profile Information', description: 'Update your personal information and credentials' },
        { name: 'Password', description: 'Change your password and security settings' },
        { name: 'Two-Factor Authentication', description: 'Enable additional security for your account' }
      ]
    },
    {
      title: 'Organization',
      icon: Building2,
      items: [
        { name: 'Company Details', description: 'Manage your organization information' },
        { name: 'Branding', description: 'Customize logos and branding elements' },
        { name: 'Team Members', description: 'Manage instructors and staff access' }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { name: 'Email Preferences', description: 'Configure notification delivery settings' },
        { name: 'Alert Settings', description: 'Set up custom alerts and reminders' }
      ]
    },
    {
      title: 'Insurance',
      icon: Shield,
      items: [
        { name: 'Provider Settings', description: 'Configure insurance provider integrations' },
        { name: 'Verification Rules', description: 'Set up insurance verification requirements' }
      ]
    },
    {
      title: 'Appearance',
      icon: Palette,
      items: [
        { name: 'Theme', description: 'Customize the application appearance' },
        { name: 'Dashboard Layout', description: 'Configure your dashboard preferences' }
      ]
    },
    {
      title: 'Communications',
      icon: Mail,
      items: [
        { name: 'Email Templates', description: 'Customize notification and reminder templates' },
        { name: 'SMS Settings', description: 'Configure text message notifications' }
      ]
    },
    {
      title: 'Documents',
      icon: FileText,
      items: [
        { name: 'Certificate Templates', description: 'Customize certification documents' },
        { name: 'Report Templates', description: 'Configure report layouts and branding' }
      ]
    },
    {
      title: 'Billing',
      icon: CreditCard,
      items: [
        { name: 'Subscription', description: 'Manage your subscription and billing details' },
        { name: 'Payment Methods', description: 'Update payment information' },
        { name: 'Billing History', description: 'View past invoices and transactions' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-1">
          Manage your account and application preferences
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {settingSections.map(section => (
            <Card 
              key={section.title}
              title={section.title}
              headerAction={
                <section.icon size={20} className="text-gray-400" />
              }
            >
              <div className="p-4 space-y-4">
                {section.items.map((item, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-lg bg-gray-750 hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    <h3 className="text-sm font-medium text-white">{item.name}</h3>
                    <p className="mt-1 text-xs text-gray-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
        
        <div className="space-y-6">
          <Card>
            <div className="p-4">
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full bg-gray-700 overflow-hidden">
                  {currentUser?.profileImage ? (
                    <img 
                      src={currentUser.profileImage} 
                      alt={currentUser.name} 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-blue-600 text-white text-xl">
                      {currentUser?.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-medium text-white">{currentUser?.name}</h2>
                  <p className="text-sm text-gray-400">{currentUser?.email}</p>
                  <p className="text-xs text-gray-400 mt-1 capitalize">{currentUser?.role}</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <Button variant="secondary" fullWidth>
                  Edit Profile
                </Button>
              </div>
            </div>
          </Card>
          
          <Card title="Quick Actions">
            <div className="p-4 space-y-2">
              <Button variant="secondary" fullWidth leftIcon={<Bell size={16} />}>
                Notification Settings
              </Button>
              <Button variant="secondary" fullWidth leftIcon={<Shield size={16} />}>
                Security Settings
              </Button>
              <Button variant="secondary" fullWidth leftIcon={<CreditCard size={16} />}>
                Billing Settings
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;