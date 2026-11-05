import { create } from 'zustand'
import type { User } from '../interfaces/user.interface';
import { loginAction } from '../actions/login.action';
import { checkAuthAction } from '../actions/check-auth.action';


type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking';

type Authstate = {
    //properties
    user: User | null;
    token: string | null;
    authStatus: AuthStatus;

    //getters
    isAdmin: () => boolean;

    //actions
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    checkAuthStatus: () => Promise<boolean>;
}

export const useAuthStore = create<Authstate>()((set, get) => ({
    //implementacion del store
    user: null,
    token: null,
    authStatus: 'checking',

    //getters
    isAdmin: () => {
        const roles = get().user?.roles || [];
        return roles?.includes('admin');
    },

    //actions
    login: async (email: string, password: string) => {

        try {
            const data =await loginAction(email, password);
            localStorage.setItem('token', data.token);
            set({user: data.user, token: data.token, authStatus: 'authenticated'});
            return true;
            
        } catch (error) {
            localStorage.removeItem('token');
            set({user: null, token: null, authStatus: 'not-authenticated'});
            return false;
        }
        
    },

    logout: () => {
        localStorage.removeItem('token');
        set({user: null, token: null, authStatus: 'not-authenticated'});
    },
    
    checkAuthStatus: async() => {
        try {
            const { user, token} = await checkAuthAction();
            set({
                user: user,
                token: token,
                authStatus: 'authenticated',
            });

            return true;
        } catch (error) {
            set({
                user: null,
                token: null,
                authStatus: 'not-authenticated',
            });
            return false;           
        };
    },
}));

