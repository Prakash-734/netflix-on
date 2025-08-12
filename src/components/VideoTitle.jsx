const VideoTitle = ({title, overview}) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black ">
        <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
        <p className="hidden md:inline-block py-6 text-lg lg:w-1/2">{overview}</p>
        <div className="my-4 md:m-0" >
            <button className="bg-white text-black py-1 md:py-3 px-2  text-xl hover:opacity-80 cursor-pointer">▶ Play</button>
            <button className="hidden md:inline-block mx-2  bg-gray-500 text-white p-3 px-10 text-xl opacity-80 rounded-xs">More Info</button>
        </div>
    </div>
  )
}
export default VideoTitle