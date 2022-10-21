import React from 'react'

interface IProps {
    episode:SpotifyApi.EpisodeObjectSimplified
}
const EpisodeCard = ({ episode }:IProps) => {
  return (
    <div>EpisodeCard</div>
  )
}

export default EpisodeCard