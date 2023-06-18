import { Spinner } from "@material-tailwind/react"

const Loading = () => {
  return (
    <div className="mt-24 w-full flex justify-center items-center">
      <Spinner className="h-10 w-10" />
    </div>
  )
}

export default Loading