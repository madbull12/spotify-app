import Image from 'next/image';
import React from 'react'
import Card from './Card';
import NoImage from '../public/img/no-image.jpg'


interface IProps {
    episode:SpotifyApi.EpisodeObjectSimplified;
}

function msToTime(ms:number) {
    let seconds = (ms / 1000).toFixed(0);
    let minutes = (ms / (1000 * 60)).toFixed(0);
    let hours = (ms / (1000 * 60 * 60)).toFixed(0);
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(0);
    if (Number(seconds) < 60) return `${seconds} Sec`
    else if (Number(minutes) < 60) return minutes + " Min";
    else if (Number(hours) < 24) return hours + " Hrs";
    else return days + " Days"
  }

const EpisodeSearchItem = ({ episode }:IProps ) => {

    return (
      <div >
          <Card>
              <div className='space-y-3 relative group '>
                  <div className='relative'>
                      <Image
                          src={episode.images[0].url ?? NoImage}
                          height={150}
                          width={150}
                          className="rounded-md"
                      />
                  
                  
                  </div>
              
                  <p className="font-semibold text-white truncate">
                      {episode.name}
                  </p>
                  <p className='text-gray-400 text-sm'>
                      {episode.release_date} . {msToTime(episode.duration_ms)}
                  </p>
              
              </div>
          </Card>
      </div>
    )
}

export default EpisodeSearchItem