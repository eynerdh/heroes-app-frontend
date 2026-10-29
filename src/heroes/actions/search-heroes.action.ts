import { heroApi } from "../api/heroe.api";
import type { Hero } from "../types/hero.interface";

interface Options{
    name?: string;
    team?: string;
    category?: string;
    universe?: string;
    status?:string;
    strength?: string;
}

const BASE_URL = import.meta.env.VITE_API_URL;

export const searchHeroesAction = async (options: Options): Promise<Hero[]> => {

    const {name, category, status, strength, team, universe} = options;

    if (!name && !category && !status && !strength && !team && !universe){
        return [];
    }

    const {data} = await heroApi.get<Hero[]> ('/search', {
        params: {
            name,
            category,
            status,
            strength,
            team,
            universe
        }
    });

    const heroes = data.map((hero) => ({
        ...hero,
        image: `${BASE_URL}/images/${hero.image}`,
    }));
    
    return heroes;
}