import Link from 'next/link'
import React from 'react'

const SearchNav = () => {
  return (
  
      <ul className="flex bg-black items-center gap-x-4 ">
        <li className="link-tag">
          <Link href={`/search/tracks`}>
            Tracks
          </Link>
        </li>
        <li className="link-tag">
          <Link href={`/search/tracks`}>
            Tracks
          </Link>
        </li>
        <li className="link-tag">
          <Link href={`/search/tracks`}>
            Tracks
          </Link>
        </li>
        <li className="link-tag">
          <Link href={`/search/tracks`}>
            Tracks
          </Link>
        </li>
      </ul>
  )
}

export default SearchNav