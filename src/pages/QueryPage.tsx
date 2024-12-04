import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { QueryInput } from '../components/QueryInput';
import { useAuth } from '../context/AuthContext';
import { executeQuery } from '../services/api';

export function QueryPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleQuerySubmit = async (input: string) => {
    try {
      setIsLoading(true);
      const result = await executeQuery(input);
      navigate('/results', { state: { result } });
    } catch (error) {
      console.error('Query execution failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Logo />
          <div className="text-sm text-gray-600">
            Welcome, {user?.username}
          </div>
        </div>
        <QueryInput onSubmit={handleQuerySubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}