import { Path, Url } from '@prisma/client'
import { createContext, Dispatch, SetStateAction } from 'react'

export const URLsContext = createContext<URLsContextType>({
	urls: [],
	setUrls: () => {}
})

export interface UrlWithPaths extends Url {
	paths: Path[]
}

export interface URLsContextType {
	urls: UrlWithPaths[]
	setUrls: Dispatch<SetStateAction<UrlWithPaths[]>>
}
