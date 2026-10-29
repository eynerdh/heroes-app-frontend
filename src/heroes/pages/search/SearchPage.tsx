import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import CustomJumbotron from "@/components/custom/CustomJumbotron";
import HeroStats from "@/heroes/components/HeroStats";
import SearchControls from "./ui/SearchControls";
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs";
import { searchHeroesAction } from "@/heroes/actions/search-heroes.action";
import HeroGrid from "@/heroes/components/HeroGrid";



export const SearchPage = () => {

  const [ searchParams ] = useSearchParams();

  const name = searchParams.get('name') ?? undefined;
  const strength = searchParams.get('strength') ?? undefined;

  const {data: heroes = []} = useQuery({
    queryKey: ['hero', 'search', {name, strength}],
    queryFn: () => searchHeroesAction({name, strength}),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <>
        <CustomJumbotron 
          title="Busquedad de SuperHeroes"
          description="Descubre, explora y administra super heroes y villanos"
        />

      <CustomBreadCrumbs currentPage="--Buscador de Heroes --"
          breadcrumbs={[
            { label: 'home', to: '/'},
            { label: 'search', to: '/search'}
          ]}
        />

        { /* Stats Dashboard  */ }
        <HeroStats />

        { /*Filter and Search */ }
        <SearchControls />

        { /*Grid de resultados  */ }
        <HeroGrid heroes={heroes} />
    </>
  )
}

export default SearchPage;