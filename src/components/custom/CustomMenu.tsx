
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '../ui/navigation-menu'
import { Link, useLocation } from 'react-router'
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { useAuthStore } from '@/auth/store/auth.store';

export const CustomMenu = () => {

  const { pathname } = useLocation();
  const { authStatus, logout, isAdmin } = useAuthStore();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <NavigationMenu className="py-5">
      <NavigationMenuList>
        {/* Home */}
        <NavigationMenuItem>
          <NavigationMenuLink
            className={cn(isActive('/') && 'bg-slate-200', 'p-2 rounded-md')}
          >
            <Link to="/">Inicio</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Search */}
        <NavigationMenuItem>
          <NavigationMenuLink
            className={cn(
              isActive('/search') && 'bg-slate-200',
              'p-2 rounded-md'
            )}
          >
            <Link to="/search">Buscar superhéroes</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Cerrar Sesion */}
        <NavigationMenuItem>
          <NavigationMenuLink
            className='bg-slate-200'
          >
            {
              (authStatus === 'not-authenticated') ? (
                 <Link to="/auth/login">Iniciar Sesion</Link>
              ): (
                <Link to={'/auth/login'} >
                  <Button
                    onClick={logout}
                  >Cerrar Sesion
                  </Button>
                </Link>
              )

            }  
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Boton Admin */}
        <NavigationMenuItem>
          <NavigationMenuLink
            className='bg-slate-200'
          >
            {
              isAdmin() && (
                <Link to={"admin/product/new"}>
                  <Button >
                    Admin
                  </Button>
                </Link>

              )
            }  
          </NavigationMenuLink>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  )
}

