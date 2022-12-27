/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
// import { LinkPreview } from '@dhaiwat10/react-link-preview';
// import { ReactTinyLink } from "react-tiny-link";
import { BsFillBookmarkFill, BsFillStarFill } from 'react-icons/bs'
import { LinkType } from '../data'
import { toast } from 'react-hot-toast'
import { bookmarksQuery } from './Bookmarks'
import { useUser } from '@auth0/nextjs-auth0'
type Props = {
  data: LinkType
  bookmarked: boolean
}
const bookmarkWebsite = gql`
  mutation ($id: String!, $bookmarked: Boolean!) {
    bookmarkWebsite(id: $id, bookmarked: $bookmarked) {
      bookmarks {
        id
      }
    }
  }
`
const CoolWeb = (props: Props) => {
  const { user } = useUser()
  const [bookmarked, setBookmarked] = useState(props.bookmarked)
  const { id, imageUrl, category, title, description, link } = props.data
  const [bookmarkWebsiteMutation, { loading, error }] = useMutation(
    bookmarkWebsite,
    {
      onCompleted: ({ data }) => {
        setBookmarked((bookmarked) => !bookmarked)
      },
      refetchQueries: [bookmarksQuery],
    }
  )
  const handleBookmark = (id: string, bookmarked: boolean) => {
    if (!user) {
      toast.error('you must be logged in to bookmark a website')
      return
    }
    const variables = { id, bookmarked }
    // console.log(variables);
    toast.promise(bookmarkWebsiteMutation({ variables }), {
      loading: !bookmarked
        ? `bookmarking ${title}`
        : `removing ${title} from bookmarks`,
      success: bookmarked
        ? `${title} removed from bookmarks`
        : `${title} bookmarked succesfully`,
      error: `${error}`,
    })
  }

  return (
    <div className='shadow relative  max-w-md  rounded'>
      {/* <LinkPreview imageHeight={300} showLoader url={link}></LinkPreview> */}
      {/* <embed width={300} height={300} src={link}> */}
      {/* </embed> */}
      {/* <img className="w-full bg-cover" src={imageUrl} alt="cool website" /> */}
      <div className='p-5 flex flex-col space-y-2'>
        <p className='text-sm text-blue-500'>{category}</p>
        <p className='text-lg font-medium'>{title}</p>
        <p className='text-gray-600'>{description}</p>
        <a href={link} className='flex hover:text-blue-500'>
          {/* removes https from link */}
          {link.replace(/(^\w+:|^)\/\//, '')}
          <svg
            className='w-6 h-6'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z'></path>
            <path d='M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z'></path>
          </svg>
        </a>
      </div>
      <button
        onClick={() => handleBookmark(id, props.bookmarked)}
        className=' focus:animate-ping absolute bottom-2 right-2'
      >
        {bookmarked ? (
          <BsFillStarFill size={25} color='gold' />
        ) : (
          <BsFillBookmarkFill size={25} color='blue' />
        )}
      </button>
    </div>
  )
}

export default CoolWeb
