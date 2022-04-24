
export const FarmCard = ({data}) => {
    console.log(data.farmname);
    console.log("asdasdas");
    return (
            <div className='flex flex-col bg-green-100 rounded-md shadow-xl border-2 h-56 w-64 p-6'>
                <div className='quote text-2xl'>
                    <p>{data.farmname}</p>
                </div>
                <div className='category mt-auto text-slate-400'>
                    <p></p>
                </div>
            </div>
    )
}