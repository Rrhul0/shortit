import { useContext } from 'react'
import { ErrorContext } from './contexts/ErrorContext'

const Footer = () => {
    const { error } = useContext(ErrorContext)

    return (
        <footer className='text-center border-t flex flex-col justify-center items-center'>
            {error ? <div className='w-full bg-red-500'>Error Occoured: {error.message}</div> : null}
            <div>
                Created by{' '}
                <a href='https://github.com/rrhul0' target='_blank' rel='noopener noreferrer'>
                    Rahul Raj
                </a>
            </div>
        </footer>
    )
}

export default Footer
