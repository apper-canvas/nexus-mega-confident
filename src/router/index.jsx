import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Loading from '@/components/ui/Loading';
import Root from '@/layouts/Root';

// Lazy load components
const Dashboard = lazy(() => import('@/components/pages/Dashboard'));
const Contacts = lazy(() => import('@/components/pages/Contacts'));
const ContactDetail = lazy(() => import('@/components/pages/ContactDetail'));
const Companies = lazy(() => import('@/components/pages/Companies'));
const Deals = lazy(() => import('@/components/pages/Deals'));
const Analytics = lazy(() => import('@/components/pages/Analytics'));
const Login = lazy(() => import('@/components/pages/Login'));
const Signup = lazy(() => import('@/components/pages/Signup'));
const Callback = lazy(() => import('@/components/pages/Callback'));
const ErrorPage = lazy(() => import('@/components/pages/ErrorPage'));
const PromptPassword = lazy(() => import('@/components/pages/PromptPassword'));
const ResetPassword = lazy(() => import('@/components/pages/ResetPassword'));

// Helper to wrap components with Suspense
const createRoute = (Element) => {
  return (
    <Suspense fallback={<Loading />}>
      <Element />
    </Suspense>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'login',
        element: createRoute(Login),
      },
      {
        path: 'signup',
        element: createRoute(Signup),
      },
      {
        path: 'callback',
        element: createRoute(Callback),
      },
      {
        path: 'error',
        element: createRoute(ErrorPage),
      },
      {
        path: 'prompt-password/:appId/:emailAddress/:provider',
        element: createRoute(PromptPassword),
      },
      {
        path: 'reset-password/:appId/:fields',
        element: createRoute(ResetPassword),
      },
      {
        index: true,
        element: createRoute(Dashboard),
      },
      {
        path: 'contacts',
        element: createRoute(Contacts),
      },
      {
        path: 'contacts/:id',
        element: createRoute(ContactDetail),
      },
      {
        path: 'companies',
        element: createRoute(Companies),
      },
      {
        path: 'deals',
        element: createRoute(Deals),
      },
      {
        path: 'analytics',
        element: createRoute(Analytics),
      },
    ],
  },
]);