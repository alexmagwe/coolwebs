import React, { useContext, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import CoolWeb from "./CoolWeb";
import { BookmarkContext } from "../lib/context";
import { Toaster } from "react-hot-toast";

type Props = {};
export const bookmarksQuery = gql`
  query {
    user {
      bookmarks{
      title
      id
      link
      imageUrl
      description
      category
      }
    }
  }
`;
const Bookmarks = (props: Props) => {
  const { data, loading, error } = useQuery(bookmarksQuery);
  if(loading){
    return <div className="animate-pulse w-full h-sceen"></div>
  }
  
  if(error){
    return <div className="w-full h-sceen">{error.message}</div>
  }
  return (
    <div className="px-12 xl:px-24 py-16 xl:py-24 gap-4">
        <Toaster/>
      {data.user.bookmarks.length>0 && <div className={`${loading&&'animate-pulse'} w-full grid md:grid-cols-2 lg:grid-cols-3 gap-6`}>
        {data.user.bookmarks.map((bookmark: any) => {
            return <CoolWeb key={bookmark.id} data={bookmark} bookmarked={true} />;
        })}
        </div>}
        {!(data.user.bookmarks.length>0)&&<p className=" block pt-32 text-4xl mx-auto text-center">No bookmarks yet</p>}
        </div>
  );
};

export default Bookmarks;
