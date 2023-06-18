"use client"
import { 
  Button,
  Chip,
  Typography 
} from '@material-tailwind/react';
import { useState, useEffect, useContext } from 'react';
import { pad, removeHyphen } from '@utils/utility';
import PokemonStat from '@components/PokemonStat';
import Loading from '@components/Loading';
import { AlertContext } from '@components/AlertProvider';

const STAT_NAMES = {
  "hp": "HP",
  "defense": "DEF",
  "special-defense": "S.DEF",
  "attack": "ATK",
  "special-attack": "S.ATK",
  "speed": "SPD"
}

const PokemonDetails = ({ params }) => {
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);
  const [disable, setDisable] = useState(false);

	const { setAlert, setOpen } = useContext(AlertContext);
  const { id } = params;

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id.toString()}`);
      const data = await response.json();
      setPokemon(data);
      setLoading(false);
    };

    fetchPokemon();
  }, []);

  const catchPokemon = (thisId) => {
    setDisable(true);
    const randomValue = Math.random();
    if(randomValue < 0.5) {
      setAlert({
        'type': 'failed',
        'message': 'You have failed to capture this pokemon! Try to catch it again...'
      });
    } else{
      const data = JSON.parse(localStorage.getItem('pokemon'));
      if(data) {
        localStorage.setItem('pokemon', JSON.stringify([...data, {id: thisId}]));
      } else{
        localStorage.setItem('pokemon', JSON.stringify([{ id: thisId }]));
      }
      setAlert({
        'type': 'success',
        'message': 'You have successfully capture this pokemon!'
      });
    }
    setOpen(true);
    setDisable(false);
  };

  if(loading) return <Loading/>

  return (
    <div className="w-full h-full">
      <div className="relative flex flex-col gap-10 bg-white rounded-3xl shadow p-10">
          <div className="absolute top-4 right-4">
            <Button variant='filled' color='green' onClick={() => {setTimeout(catchPokemon(pokemon.id), 400)}} disabled={disable}>Catch</Button>
          </div>
          <div className='flex lg:flex-row sm:flex-col gap-20'>
            <div className='relative flex lg:justify-start sm:justify-center'>
              <img 
                src={pokemon.sprites?.other["official-artwork"]?.front_default}
                alt={pokemon.name}
                className="max-w-[250px] max-h-[250px]"
              />
            </div>

            <div className='flex flex-col justify-center lg:items-start sm:items-center'>
              <Typography variant="lead" className="text-blue-gray-300">
                {"#"}{pad(pokemon.id, 4)}
              </Typography>
              <Typography variant="h2" className="capitalize">
                { removeHyphen(pokemon.name) }
              </Typography>
              <div className='my-4 flex gap-x-10 gap-y-6 border border-gray-300 rounded-xl px-6 py-4'>
                <div>
                  <Typography variant="lead" className="text-indigo-300">
                    Height
                  </Typography>
                  <Typography variant="small">
                    { pokemon.height }{" dm"}
                  </Typography>
                </div>
                <div>
                  <Typography variant="lead" className="text-indigo-300">
                    Weight
                  </Typography>
                  <Typography variant="small">
                    { pokemon.weight }{" hg"}
                  </Typography>
                </div>
              </div>
              <div className="mt-2 flex gap-3 flex-row">
                { pokemon.types.map((item, index) => (
                  <Chip key={index} variant="ghost" value={item.type.name} color="green" className="flex-none"/>
                ))}
              </div>
            </div>
        </div>
        <div className='flex flex-col gap-8'>

          <div className='w-full'>
            <Typography variant="h5">
              Abilities
            </Typography>
            <div className='mt-2 flex gap-3 flex-row'>
              { pokemon.abilities.map((item, index) => (
                <Chip key={index} variant="ghost" value={item.ability.name} color="blue-gray" className="flex-none"/>
              ))}
            </div>
          </div>

          <div className='w-full'>
            <Typography variant="h5">
              Moves
            </Typography>
            <div className='mt-2 flex gap-3 flex-row flex-wrap'>
              { pokemon.moves.map((item, index) => (
                <Chip key={index} variant="ghost" value={removeHyphen(item.move.name)} color="blue-gray" className="flex-none"/>
              ))}
            </div>
          </div>

          <div className='w-full'>
            <Typography variant="h5">
              Base stats
            </Typography>
            <div className='mt-2 grid lg:grid-cols-2 md:grid-cols-1 lg:gap-6 md:gap-4'>
                { pokemon.stats.map((item, index) => (
                  <PokemonStat
                    key={index}
                    name={STAT_NAMES[item.stat.name]}
                    baseStat={item.base_stat}
                  />
                ))}
            </div>
          </div>
        </div>  
      </div>
    </div>
  )
}

export default PokemonDetails