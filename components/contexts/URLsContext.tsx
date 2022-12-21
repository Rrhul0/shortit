import { path, URL } from '@prisma/client'
import { createContext, Dispatch, SetStateAction } from 'react'

export const URLsContext = createContext<URLsContextType>({
    urls: [],
    setUrls: () => {},
})

export interface UrlWithPaths extends URL {
    paths: path[]
}

export interface URLsContextType {
    urls: UrlWithPaths[]
    setUrls: Dispatch<SetStateAction<UrlWithPaths[]>>
}
