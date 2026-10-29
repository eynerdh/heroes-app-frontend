import { lazy } from 'react';
import { createHashRouter} from 'react-router'

import { AdminLayout } from '@/admin/layouts/AdminLayout';
import { AdminPages } from '@/admin/pages/AdminPages';
import { HeroesLayout } from '@/heroes/layouts/HeroesLayout';
import { HeroPage } from '@/heroes/pages/hero/HeroPage';
import { HomePage } from '@/heroes/pages/home/HomePage';
//import { SearchPage } from '@/heroes/pages/search/SearchPage';



const SearchPage = lazy( () => import('@/heroes/pages/search/SearchPage'));

//export const appRouter = createBrowserRouter([
export const appRouter = createHashRouter ([
    {
        path: "/",
        element: <HeroesLayout />,
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
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <AdminPages />
            }
        ]
    },

]);

