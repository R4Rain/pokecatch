"use client"
import {
  Typography,
  Chip,
  IconButton
} from "@material-tailwind/react";
import { pad, removeHyphen } from '@utils/utility';
import Link from "next/link";
import {
  XMarkIcon
} from "@heroicons/react/24/solid";

const PokemonCard = ({ id, name, image, types, canRelease, handleRemove, index}) => {
  return (
    <div className="relative w-full flex flex-col items-center rounded-3xl bg-white shadow p-6">
        <div className="relative">
          <img 
            src={image}
            alt={name} 
            className="w-16 h-16"
          />
        </div>

        <div className="mt-2 w-full">
          <Typography variant="small" color="gray" className="text-center">
            {"#"}{pad(id, 4)}
          </Typography>
          <Link href={`/pokemon/${id}`}>
            <Typography variant="h5" color="blue-gray" className="text-center capitalize text-gray-600 hover:text-gray-900">
              { removeHyphen(name) }
            </Typography>
          </Link>
          <div className="mt-2 flex justify-center items-center gap-3 lg:flex-row md:flex-col">
            {types.map((item, index) => (
              <Chip key={index} variant="ghost" value={item.type.name} color="green" size="sm" className="flex-none"/>
            ))}
          </div>
        </div>

        { canRelease && 
          <div className="absolute top-4 right-4">
            <IconButton variant="text" color="red" className="rounded-full" onClick={() => handleRemove(index)}>
              <XMarkIcon className="w-6 h-6"/>
            </IconButton>
          </div>
        }
    </div>
  )
}

export default PokemonCard