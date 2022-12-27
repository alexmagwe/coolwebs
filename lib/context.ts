import { createContext, Dispatch, SetStateAction } from "react";
import bookmarks from '../pages/bookmarks';
export type bookmarkType={
    id:string
}
type bookmarkContextType={
    bookmarks:bookmarkType[]|undefined|null,
    setBookmarks:Dispatch<SetStateAction<bookmarkType[]|null>>
}

export const BookmarkContext=createContext<bookmarkContextType>({bookmarks:[],setBookmarks:()=>{}})