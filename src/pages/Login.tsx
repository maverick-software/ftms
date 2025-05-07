import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { supabase } from '../lib/supabase';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      const { error: supabaseError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (supabaseError) {
        throw supabaseError;
      }
      console.log('Login successful, attempting to navigate to / ');
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center">
            <Lock size={28} className="text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Firearms Training Management
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Sign in to your account to continue
        </p>
      </div>
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-700">
          {error && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-800 rounded-md flex items-start">
              <AlertCircle size={18} className="text-red-400 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Email address"
              type="email"
              id="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail size={16} />}
              required
            />
            
            <Input
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock size={16} />}
              required
            />
            
            <div>
              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={isLoading}
              >
                Sign in
              </Button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="flex items-center justify-center">
              <p className="text-sm text-gray-400">
                Demo credentials: admin@example.com / password
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;