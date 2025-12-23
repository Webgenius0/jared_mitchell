import { ShopCardProps } from "@/Types/type"
import Image from "next/image"
import { FiShoppingCart } from "react-icons/fi"

const ShopCard = ({data}:{data:ShopCardProps}) => {
  return (
    <div className='pb-5 rounded-2xl overflow-hidden custom_border custom_shadow bg-secondary-gray/15'>
      <div className='relative w-[358px] h-[378px]'>
        <div className='absolute size-full bg-black/10' />
        <Image src={data.image} width={358} height={378} alt='' className='size-full object-cover' />
        {data.tag && (
          <div className='absolute bg-white py-1 px-2 text-primary-blue text-sm top-6 right-9 rounded-full'>{data.tag}</div>
        )}
      </div>
      <div className='py-4 space-y-5 px-4'>
        <div className='space-y-2'>
          <h5 className='text-2xl text-primary-black font-medium'>{data.title}</h5>
          <p className='text-xl text-secondary-black'>{data.description}</p>
        </div>
        <div className='flex items-center justify-between'>
          <div className='text-2xl text-primary-black'>{data.price}</div>
          <button className='px-4 py-2 flex items-center gap-3 text-lg text-nowrap bg-primary-blue text-white rounded-full cursor-pointer hover:bg-secondary-blue'><FiShoppingCart className='text-xl' />Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default ShopCard
