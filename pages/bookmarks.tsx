import React from "react";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "@auth0/nextjs-auth0";
import Bookmarks from "../components/Bookmarks";
type Props = {};

function bookmarks({}: Props) {
  return <div>
    <Bookmarks/>
  </div>;
}

export default bookmarks;
export const getServerSidePropsWrapper = async ({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  const session = getSession(req, res);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/api/auth/login",
      },
      props: {},
    };
  }
  return {
    props: {},
  };
}
