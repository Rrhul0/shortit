const ShowPaths = ({ path }: { path: string }) => (
    <div className='rounded-lg bg-violet-300 w-max px-2 py-1'>
        <a href={path} target='_blank' rel='noopener noreferrer'>
            {path}
        </a>
        {/*TODO: add share and delete or edit button */}
    </div>
)

export default ShowPaths
