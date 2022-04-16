
export const FarmCard = ({data}) => {
    return (
            <div className='flex flex-col bg-green-100 rounded-md shadow-xl border-2 h-56 w-64 p-6'>
                <div className='quote font-delius text-2xl'>
                    <p>{data.name}</p>
                </div>
                <div className='category mt-auto text-slate-400'>
                    <p>{data.activity}</p>
                </div>
            </div>
    )
}