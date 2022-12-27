import React from 'react'
import CreateForm from '../components/CreateForm'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '@auth0/nextjs-auth0'

type Props = {}

function admin({}: Props) {
  return (
    <div>
      <CreateForm />
    </div>
  )
}

export default admin
export const getServerSidePropsWrapper = async ({
  req,
  res,
}: {
  req: NextApiRequest
  res: NextApiResponse
}) => {
  const session = getSession(req, res)
  console.log('session', session)
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/api/auth/login',
      },
      props: {},
    }
  }
  return { props: {} }
}
