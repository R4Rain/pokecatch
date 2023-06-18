"use client"
import { 
  IconButton, Typography 
} from "@material-tailwind/react";
import { 
  ArrowRightIcon, ArrowLeftIcon 
} from "@heroicons/react/24/outline";
import Link from "next/link";

const Pagination = ({ currPage, limit, paginate, handlePrev, handleNext }) => {
  const { count, next, previous } = paginate;
  const maxPage = Math.ceil(count / limit);
  return (
    <div className="flex items-center gap-8">
      <Link href={previous ? { pathname: '/pokemon', query: {page: currPage - 1}} : '#'} className={!previous ? 'pointer-events-none' : 'pointer-events-auto'}>
        <IconButton
          size="sm"
          variant="outlined"
          color="blue-gray"
          disabled={!previous}
          onClick={handlePrev}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
        </IconButton>
      </Link>
      <Typography color="gray" className="font-normal">
        Page <strong className="text-blue-gray-900">{currPage}</strong> of{" "}
        <strong className="text-blue-gray-900">{maxPage}</strong>
      </Typography>
      <Link href={next ? { pathname: '/pokemon', query: {page: currPage + 1}} : '#'} className={!next ? 'pointer-events-none' : 'pointer-events-auto'}>
        <IconButton
          size="sm"
          variant="outlined"
          color="blue-gray"
          disabled={!next}
          onClick={handleNext}
        >
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </IconButton>
      </Link>
    </div>
  )
}

export default Pagination