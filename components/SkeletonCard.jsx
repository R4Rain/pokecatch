
const SkeletonCard = () => {
  return (
    <div className='w-full h-full flex flex-col items-center rounded-3xl shadow border border-gray-200 py-5 px-4'>
      <div className="w-full h-16 bg-gray-300 rounded-xl"/>
      <div className="w-full mt-7">
        <div className="h-5 bg-gray-300 rounded-full mb-4"/>
        <div className="mt-2 flex flex-row justify-center gap-3">
          <div className="w-full h-5 bg-gray-300 rounded-full"/>
          <div className="w-full h-5 bg-gray-300 rounded-full"/>
        </div>
      </div>
    </div>
  )
}

export default SkeletonCard