import { createContext, Dispatch, SetStateAction } from 'react'

export const ErrorContext = createContext<ErrorContextType>({
    error: null,
    setError: () => {},
})

export interface ErrorContextType {
    error: Error | null
    setError: Dispatch<SetStateAction<Error | null>>
}
