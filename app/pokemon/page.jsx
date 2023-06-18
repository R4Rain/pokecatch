"use client"
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'

import PokemonCard from "@components/PokemonCard";
import SkeletonCard from '@components/SkeletonCard';
import Pagination from '@components/Pagination';

const PokemonPage = () => {
  const LIMIT_POKEMON = 20;
  const searchParams = useSearchParams();

  const [pokemons, setPokemons] = useState([]);
  const [currPage, setCurrPage] = useState(parseInt(searchParams.get('page')) || 1);
  const [paginate, setPaginate] = useState({
    count: 0,
    next: null,
    previous: null
  });
  const [loading, setLoading] = useState(true);

  const handlePrev = () => {
    setCurrPage(currPage - 1);
  }

  const handleNext = () => {
    setCurrPage(currPage + 1);
  }

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${(currPage - 1) * LIMIT_POKEMON}&limit=${LIMIT_POKEMON}`);
      const {count, next, previous, results} = await response.json();

      const pokemonDetails = await Promise.all(
        results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const data = await res.json();
          return data;
        })
      );
      
      setPaginate({count, next, previous});
      setPokemons(pokemonDetails);
      setLoading(false);
    }
    
    fetchPokemons();
  }, [currPage]);

  return (
    <div className="w-full h-full">
      { loading ?
        <div className="grid gap-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 animate-pulse" role="status">
          {[...Array(20)].map((_, index) => <SkeletonCard key={index}/>)}
        </div>
        :
        <>
          <div className="grid gap-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2">
            {pokemons.map((pokemon,index) => (
              <PokemonCard 
                key={index}
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.sprites.front_default}
                types={pokemon.types}
              /> 
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Pagination
              currPage={currPage}
              limit={LIMIT_POKEMON}
              paginate={paginate}
              handlePrev={handlePrev}
              handleNext={handleNext}
            />
          </div>
        </>
      }
    </div>
  )
}

export default PokemonPage;