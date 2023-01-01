const ShowPaths = ({ path }: { path?: string }) => (
    <li>
        {path ? (
            <a
                href={path}
                target='_blank'
                rel='noopener noreferrer'
                className='bg-blue-300 bg-opacity-30 text-blue-700 transition-all px-2 py-1.5 hover:bg-opacity-80 hover:text-blue-100 hover:bg-blue-600 rounded-xl'
            >
                {path}
            </a>
        ) : (
            <div>Processing...</div>
        )}
        {/*TODO: add share and delete or edit button */}
    </li>
)

export default ShowPaths
