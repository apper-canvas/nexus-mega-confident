import { createContext, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from '@/store/userSlice';
import { getRouteConfig, verifyRouteAccess } from '@/router/route.utils';
import { ToastContainer } from 'react-toastify';
import Sidebar from '@/components/organisms/Sidebar';
import Loading from '@/components/ui/Loading';

export const AuthContext = createContext(null);

function Root() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, isInitialized } = useSelector((state) => state.user);
  const [authInitialized, setAuthInitialized] = useState(false);

  // Initialize ApperUI once when the app loads
  useEffect(() => {
    const { ApperClient, ApperUI } = window.ApperSDK;

    const client = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    ApperUI.setup(client, {
      target: '#authentication',
      clientId: import.meta.env.VITE_APPER_PROJECT_ID,
      view: 'both',
      onSuccess: function (user) {
        setAuthInitialized(true);
        let currentPath = window.location.pathname + window.location.search;
        let redirectPath = new URLSearchParams(window.location.search).get('redirect');
        const isAuthPage = currentPath.includes('/login') || currentPath.includes('/signup') ||
          currentPath.includes('/callback') || currentPath.includes('/error') ||
          currentPath.includes('/prompt-password') || currentPath.includes('/reset-password');

        if (user) {
          if (redirectPath) {
            navigate(redirectPath);
          } else if (!isAuthPage) {
            if (!currentPath.includes('/login') && !currentPath.includes('/signup')) {
              navigate(currentPath);
            } else {
              navigate('/');
            }
          } else {
            navigate('/');
          }
          dispatch(setUser(JSON.parse(JSON.stringify(user))));
        } else {
          if (!isAuthPage) {
            navigate(
              currentPath.includes('/signup')
                ? `/signup?redirect=${currentPath}`
                : currentPath.includes('/login')
                  ? `/login?redirect=${currentPath}`
                  : '/login'
            );
          } else if (redirectPath) {
            if (
              !['error', 'signup', 'login', 'callback', 'prompt-password', 'reset-password'].some((path) => currentPath.includes(path))
            ) {
              navigate(`/login?redirect=${redirectPath}`);
            } else {
              navigate(currentPath);
            }
          } else if (isAuthPage) {
            navigate(currentPath);
          } else {
            navigate('/login');
          }
          dispatch(clearUser());
        }
      },
      onError: function (error) {
        console.error("Authentication failed:", error);
        setAuthInitialized(true);
      }
    });
  }, []);

  // Route access verification
  useEffect(() => {
    if (!authInitialized || !isInitialized) return;

    const config = getRouteConfig(location.pathname);
    const { allowed, redirectTo, excludeRedirectQuery } = verifyRouteAccess(config.allow, user);

    if (!allowed && redirectTo) {
      const redirectPath = excludeRedirectQuery
        ? redirectTo
        : `${redirectTo}?redirect=${location.pathname}`;
      navigate(redirectPath);
    }
  }, [authInitialized, isInitialized, location.pathname, user, navigate]);

  const authMethods = {
    isInitialized: authInitialized && isInitialized,
    logout: async () => {
      try {
        const { ApperUI } = window.ApperSDK;
        await ApperUI.logout();
        dispatch(clearUser());
        navigate('/login');
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };

  if (!authInitialized || !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loading />
      </div>
    );
  }

  const isAuthPage = location.pathname.includes('/login') ||
    location.pathname.includes('/signup') ||
    location.pathname.includes('/callback') ||
    location.pathname.includes('/error') ||
    location.pathname.includes('/prompt-password') ||
    location.pathname.includes('/reset-password');

  return (
    <AuthContext.Provider value={authMethods}>
      <div className="min-h-screen bg-background">
        {!isAuthPage && <Sidebar />}
        <main className={!isAuthPage ? "lg:ml-60 p-6 lg:p-8 pt-20 lg:pt-8" : ""}>
          <div className={!isAuthPage ? "max-w-[1400px] mx-auto" : ""}>
            <Outlet />
          </div>
        </main>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </AuthContext.Provider>
  );
}

export default Root;