import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '@/layouts/Root';

function Signup() {
  const { isInitialized } = useContext(AuthContext);

  useEffect(() => {
    if (isInitialized) {
      const { ApperUI } = window.ApperSDK;
      ApperUI.showSignup("#authentication");
    }
  }, [isInitialized]);

  return (
<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#1E40AF]">
      <div className="w-full max-w-md space-y-8 p-8 glass-card">
        <div className="flex flex-col gap-6 items-center justify-center">
<div className="w-14 h-14 shrink-0 rounded-xl flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white text-2xl 2xl:text-3xl font-bold shadow-lg">
            N
          </div>
          <div className="flex flex-col gap-1 items-center justify-center">
<div className="text-center text-lg xl:text-xl font-bold text-slate-900">
              Create Account
            </div>
<div className="text-center text-sm text-slate-600">
              Please create an account to continue
            </div>
          </div>
        </div>
        <div id="authentication" />
        <div className="text-center mt-4">
<p className="text-sm text-slate-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-700">
                Sign in
              </Link>
            </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;