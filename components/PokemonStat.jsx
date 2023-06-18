import { 
  Progress,
  Typography 
} from '@material-tailwind/react';

const PokemonStat = ({ name, baseStat }) => {
  return (
    <div className='w-full flex flex-col gap-2'>
      <div className="flex flex-row justify-between gap-4">
        <Typography variant="h6">{name}</Typography>
        <Typography variant="h6">{baseStat}</Typography>
      </div>
      <Progress value={(baseStat / 270) * 100} color="blue" size="lg"/>
    </div>
  )
}

export default PokemonStat