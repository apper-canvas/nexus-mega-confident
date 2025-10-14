import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '@/layouts/Root';

function Login() {
  const { isInitialized } = useContext(AuthContext);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (isInitialized) {
      const { ApperUI } = window.ApperSDK;
      
      // Clear any previous errors
      setAuthError(null);
      
      // Show login with error callback
      ApperUI.showLogin("#authentication", {
        onError: (error) => {
          setAuthError(error?.message || 'Authentication failed. Please check your credentials and try again.');
        }
      });
    }
  }, [isInitialized]);
  return (
<div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8 glass-card">
        <div className="flex flex-col gap-6 items-center justify-center">
          <div className="w-14 h-14 shrink-0 rounded-xl flex items-center justify-center bg-gradient-to-r from-primary to-secondary text-white text-2xl 2xl:text-3xl font-bold">
            N
          </div>
          <div className="flex flex-col gap-1 items-center justify-center">
            <div className="text-center text-lg xl:text-xl font-bold gradient-text">
              Sign in to Nexus CRM
            </div>
            <div className="text-center text-sm text-gray-600">
              Welcome back, please sign in to continue
            </div>
          </div>
        </div>
        
        {authError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            <p className="font-medium">Authentication Error</p>
            <p className="mt-1">{authError}</p>
          </div>
        )}
        
        <div id="authentication" />
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-primary hover:text-accent">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;