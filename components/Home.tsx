import React from 'react'
import CoolWeb from './CoolWeb'
import { gql, useQuery } from '@apollo/client'
import { Toaster } from 'react-hot-toast'
import Link from 'next/link'
type Props = {}

const allWebsitesQuery = gql`
  query ($first: Int, $after: String) {
    websites(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          title
          id
          link
          imageUrl
          description
          category
        }
        cursor
      }
    }
  }
`
const Home = (props: Props) => {
  // const {data,loading:,error}=useQuery(bookmarksQuery)
  const bookmarkIds: string[] = []
  const { loading, error, data, fetchMore } = useQuery(allWebsitesQuery, {
    variables: {
      first: 6,
      last: '',
    },
  })
  // const { bookmarks } = useContext(BookmarkContext);
  if (loading) {
    return (
      <div className='text-center h-screen flex items-center justify-center'>
        <svg
          className='animate-spin h-5 w-5 mr-3 ...'
          viewBox='0 0 24 24'
        ></svg>
      </div>
    )
  }
  // console.log(data);
  if (error)
    return (
      <div className='flex justify-center pt-32 items-center text-4xl text-center mx-auto'>
        {error.message == 'unauthenticated' ? (
          <div className='w-full flex flex-col py-8 z-0 items-center justify-center  absolute '>
            <h2 className='text-4xl text-slate-800 my-4'>
              Sign in to start exploring and saving cool websites
            </h2>
            <Link href='api/auth/login'>
              <button className='px-12 py-3 text-white text-lg font-bold bg-purple-600 rounded-md'>
                login
              </button>
            </Link>
          </div>
        ) : (
          <span>{error.message}</span>
        )}
      </div>
    )
  if (data && data.user) {
    data.user.bookmarks.map((b: { id: string }) => bookmarkIds.push(b.id))
  }

  const { endCursor, hasNextPage } = data.websites.pageInfo

  // console.log(bookmarkIds)
  return (
    <div>
      <Toaster />
      {data && (
        <div className='px-12 xl:px-24 py-16 xl:py-24 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {data.websites.edges?.map((item: any, i: number) => {
            // console.log(item.node!)
            if (bookmarkIds.includes(item.node!.id)) {
              return <CoolWeb data={item.node!} key={i} bookmarked={true} />
            } else {
              return <CoolWeb data={item.node!} key={i} bookmarked={false} />
            }
          })}
        </div>
      )}
      {hasNextPage ? (
        <button
          className='px-4 py-2 bg-blue-500 text-white rounded my-10'
          onClick={() => {
            fetchMore({
              variables: { after: endCursor },
              updateQuery: (prevResult, { fetchMoreResult }) => {
                fetchMoreResult.websites.edges = [
                  ...prevResult.websites.edges,
                  ...fetchMoreResult.websites.edges,
                ]
                return fetchMoreResult
              },
            })
          }}
        >
          more
        </button>
      ) : (
        <p className='my-10 text-center font-medium'>
          You&apos;ve reached the end!{' '}
        </p>
      )}
    </div>
  )
}
export default Home
