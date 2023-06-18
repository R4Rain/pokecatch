'use client'
import {useState, useEffect, useContext } from 'react';
import PokemonCard from "@components/PokemonCard";
import SkeletonCard from '@components/SkeletonCard';
import { AlertContext } from '@components/AlertProvider';
import { Typography } from '@material-tailwind/react';

const OwnedPokemon = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setAlert, setOpen } = useContext(AlertContext);

  useEffect(() => {
    const fetchOwned = async () => {
      setLoading(true);
      const data = localStorage.getItem('pokemon');
      if(data) {
        const parsed = JSON.parse(data);
        const pokemonData = await Promise.all(
          parsed.map(async (item, index) => {
            if(item?.id) {
              const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${item.id}`);
              const res = await response.json();
              return res;
            }
            return null;
          })
        )
        const filtered = pokemonData.filter(function(item){
          return !!item;
        })
        setPokemons(filtered);
      }
      setLoading(false);
    };

    fetchOwned();
  }, []);

  const handleRemove = (index) => {
    if(index >= 0 && index < pokemons.length) {
      let removed = pokemons
      removed.splice(index, 1);
      localStorage.setItem('pokemon', JSON.stringify(removed));
      setPokemons(removed);
      setAlert({
        type: 'success',
        message: 'Successfully release a pokemon!'
      });
    } else{
      setAlert({
        type: 'failed',
        message: 'Failed to release pokemon!'
      });
    }
    setOpen(true);
  };

  return (
    <div className="w-full h-full">
      { loading ?
        <div className="grid gap-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 animate-pulse" role="status">
          {[...Array(20)].map((_, index) => <SkeletonCard key={index}/>)}
        </div>
        :
        pokemons.length ? 
        <div className="grid gap-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2">
            {pokemons.map((pokemon,index) => (
              <PokemonCard 
                key={index}
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.sprites.front_default}
                types={pokemon.types}
                canRelease={true}
                handleRemove={handleRemove}
                index={index}
              /> 
            ))}
        </div>
        :
        <div className='w-full h-28 flex justify-center items-center'>
          <Typography variant="small" className="text-center">
             You have no pokemons...
          </Typography>
        </div>
      }
    </div>
  )
}

export default OwnedPokemon