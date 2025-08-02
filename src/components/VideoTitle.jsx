const VideoTitle = ({title, overview}) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black ">
        <h1 className="text-6xl font-bold">{title}</h1>
        <p className="py-6 text-lg lg:w-1/2">{overview}</p>
        <div className="">
            <button className="bg-white text-black p-3  text-xl hover:opacity-80 cursor-pointer">▶ Play</button>
            <button className="mx-2 bg-gray-500 text-white p-3 px-10 text-xl opacity-80 rounded-xs">More Info</button>
        </div>
    </div>
  )
}
export default VideoTitle