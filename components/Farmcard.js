import { Link } from '@chakra-ui/react'

export const FarmCard = ({ data }) => {
    return (
        <Link href={ `/farm/${data.farmname}`}>
            <div className='flex flex-col bg-green-100 rounded-md shadow-xl border-2 h-56 w-64 p-6'>
                <div className='quote text-2xl'>
                    <p>{data.farmname}</p>
                </div>
                <div className='category mt-auto text-slate-400'>
                    <p></p>
                </div>
            </div>
        </Link>
    )
}