const ShowPaths = ({ path }: { path?: string }) => (
    <div className='rounded-lg bg-violet-300 w-max px-2 py-1'>
        {path ? (
            <a href={path} target='_blank' rel='noopener noreferrer'>
                {path}
            </a>
        ) : (
            <div>Processing...</div>
        )}
        {/*TODO: add share and delete or edit button */}
    </div>
)

export default ShowPaths
