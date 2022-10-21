import React, { useState } from 'react'
import { v4 } from 'uuid'
import PodcastSearchItem from './PodcastSearchItem'

interface IProps {
    shows:SpotifyApi.ShowObjectSimplified[] | undefined
}
const PodcastSearch = ({ shows }:IProps) => {
  const [showMore,setShowMore] = useState<boolean>(false);

  return (
    <div>
     <div className='flex justify-between items-center '>
          <h1 className='font-bold text-white mb-4 text-2xl'>Podcasts</h1>
          <button onClick={()=>setShowMore(!showMore)} className='font-bold  rounded-full px-4 py-2 hover:-translate-y-1 ease-in-out duration-100 transition-all bg-white text-black'>{showMore ? "Show less" : "Show more"}</button>
      </div>
    
    <div className='grid scrollbar overflow-x-scroll  auto-cols-max grid-flow-col auto-rows-auto gap-x-2   scrollbar-thumb-gray-900 scrollbar-track-gray-100'>
        {shows?.slice(0,showMore ? shows?.length : 5).map((show)=>(
            <PodcastSearchItem key={v4()} show={show} />
    
        ))}
        
    </div>

</div>
  )
}

export default PodcastSearch