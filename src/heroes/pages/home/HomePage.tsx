import { useSearchParams } from "react-router"

import { Filter} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CustomJumbotron from "@/components/custom/CustomJumbotron"
import HeroStats from "@/heroes/components/HeroStats"
import HeroGrid from "@/heroes/components/HeroGrid"

import CustomPagination from "@/components/custom/CustomPagination"
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs"

import { use, useMemo } from "react"
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary"
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero"
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext"


export const HomePage = () => {

/*  antigua forma de obtener el tab actual 
    const [activeTab, setAtiveTab] = useState<
    'all' | 'favorites' | 'heroes' | 'villains'
  >('all'); */

  const [searchParams, setSearchParams] = useSearchParams();
  const {favoriteCount, favorites} = use(FavoriteHeroContext);

  const activeTab = searchParams.get('tab') ?? 'all';
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '6';
  const category = searchParams.get('category') ?? 'all';

  console.log({page});

  const selectedTab = useMemo( () =>{
    const validTabs = ['all' , 'favorites' , 'heroes' , 'villains'];
    return validTabs.includes(activeTab) ? activeTab : 'all';
  }, [activeTab])

  const {data: heroesResponse} = usePaginatedHero(+page, +limit, category);  

  const {data: summary} = useHeroSummary();

  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron 
          title="Universo de SuperHeroes"
          description="Descubre, explora y administra super heroes y villanos"
        />

        <CustomBreadCrumbs currentPage="--Inicio--" 
          breadcrumbs={[
            {label: 'Home', to: '/'},
          ]}
        />

        {/* Stats Dashboard */}
        <HeroStats />
        

        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" 
              onClick={ () => 
                setSearchParams((prev) => {
                  prev.set('tab', 'all');
                  prev.set('category', 'all');
                  prev.set('page', '1');
                  return prev;
                }) 
              }>
              All Characters ({summary?.totalHeroes})
            </TabsTrigger>
            <TabsTrigger 
                value="favorites" 
                className="flex items-center gap-2"
                onClick={ () => 
                  setSearchParams((prev) => {
                    prev.set('tab', 'favorites');
                    return prev;
                  }) 
                }>
              Favorites ({favoriteCount})
            </TabsTrigger>
            <TabsTrigger value="heroes" 
                onClick={ () => 
                  setSearchParams((prev) => {
                    prev.set('tab', 'heroes');
                    prev.set('category', 'hero');
                    prev.set('page', '1');
                    return prev;
                  }) 
                }>
              Heroes ({summary?.heroCount})
            </TabsTrigger>
            <TabsTrigger value="villains" 
                onClick={ () => 
                  setSearchParams((prev) => {
                    prev.set('tab', 'villains');
                    prev.set('category', 'villain');
                    prev.set('page', '1');
                    return prev;
                  })
                }>
              Villains ({summary?.villainCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <h1>Todos los personajes</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []}/>
          </TabsContent>
          <TabsContent value="favorites">
            <h1>Favoritos</h1>
            <HeroGrid heroes={favorites}/>
          </TabsContent>
          <TabsContent value="heroes">
            <h1>Heroes</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []}/>
          </TabsContent>
          <TabsContent value="villains">
            <h1>Villanos</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []}/>
          </TabsContent>
        </Tabs>

        {/* Results info */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <p className="text-gray-600">Showing 6 of 16 characters</p>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Filter className="h-3 w-3" />
              Filtered
            </Badge>
          </div>
        </div>

        {/* Character Grid */}
        

        {/* Pagination */}
        {
          selectedTab !== 'favorites' && (
             <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
          )
        }
      </>
    </>
  )
}