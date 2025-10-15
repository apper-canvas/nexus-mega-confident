import { useSearchParams, Link } from 'react-router-dom';

const ErrorPage = () => {
  const [searchParams] = useSearchParams();
  const errorMessage = searchParams.get('message') || 'An error occurred';

  return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
<div className="w-full max-w-md p-8 bg-white border border-slate-300 rounded-xl shadow-xl text-center">
<h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h1>
          <p className="text-slate-900 mb-6">{errorMessage}</p>
<Link to="/login" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg">
            Return to Login
          </Link>
      </div>
    </div>
  );
};

export default ErrorPage;