import { lazy } from 'react';
import { createHashRouter, Navigate} from 'react-router'

import { AdminLayout } from '@/admin/layouts/AdminLayout';
import { AdminPages} from '@/admin/pages/AdminPages';
import { AdminProductPage } from '@/admin/pages/AdminProductPage';
import { HeroesLayout } from '@/heroes/layouts/HeroesLayout';
import { HeroPage } from '@/heroes/pages/hero/HeroPage';
import { HomePage } from '@/heroes/pages/home/HomePage';
import { AuthLayout } from '@/auth/layouts/AuthLayout';
import { LoginPage } from '@/auth/pages/login/LoginPage';
import { RegisterPage } from '@/auth/pages/register/RegisterPage';
import { AdminRoute, AuthenticatedRoute, NotAuthenticatedRoute } from '@/components/routes/ProtectedRoute';

//import { SearchPage } from '@/heroes/pages/search/SearchPage';



const SearchPage = lazy( () => import('@/heroes/pages/search/SearchPage'));

//export const appRouter = createBrowserRouter([
export const appRouter = createHashRouter ([
    {
        path: "/",
        element: (<AuthenticatedRoute>
                    <HeroesLayout />
                 </AuthenticatedRoute> ),
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'hero/:idSlug',
                element: <HeroPage />
            },
            {
                path: 'search',
                element: <SearchPage />
            },
            {
                path: '*',
                element: <h1>404</h1>
            }
        ]
    },
    {
        path: '/admin',
        element: (<AdminRoute>
                    <AdminLayout />
                </AdminRoute>),
        children: [
            {
                index: true,
                element: <AdminPages />
            },
            {
                path: 'product/:id',
                element: <AdminProductPage />,
            },
        ]
    },
      // Auth Routes
    {
        path: '/auth',
        element: (<NotAuthenticatedRoute>
                    <AuthLayout />
                </NotAuthenticatedRoute>),
        children: [
            {
                index: true,
                /* element: <LoginPage />, */
                element: <Navigate to="/auth/login" />,
            },
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'register',
                element: <RegisterPage />,
            },
        ],
    }

]);

