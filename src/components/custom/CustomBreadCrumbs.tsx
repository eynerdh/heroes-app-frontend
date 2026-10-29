import { Link } from 'react-router'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '../ui/breadcrumb'

interface Breadcrumb {
    to: string;
    label: string;
}

interface Props {
    currentPage: string;
    breadcrumbs?: Breadcrumb[];
}



export const CustomBreadCrumbs = ( {currentPage, breadcrumbs=[]}: Props) => {
  return (
    <Breadcrumb className='my-5'>
        <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbLink>
                    <Link to="/" >Inicio</Link>
                </BreadcrumbLink>
            </BreadcrumbItem>

            {
                breadcrumbs.map((crum) => (
                    <div className='flex items-center'>
                        <BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbLink>
                                <Link to={crum.to} >{crum.label}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </div>
                ))
            }

            <BreadcrumbItem>
                <BreadcrumbLink className='text-black'>{currentPage}</BreadcrumbLink>
            </BreadcrumbItem>

        </BreadcrumbList>
    </Breadcrumb>
  )
}


