import Container from '@/Components/Common/Container'
import { limitedDrops } from '@/Components/Data/data'
import ShopCard from './ShopCard'

const LimitedDrops = () => {
  return (
      <section>
        <Container>
          <div className="section rounded-[20px] custom_border bg-secondary-gray space-y-11">
            <div>
              <h2 className="section_title 2xl:!text-7xl">Featured from the OSI Shop</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-8">
              {limitedDrops?.map((data, index) => (
                <ShopCard data={data} key={index}/>
              ))}
            </div>
          </div>
        </Container>
      </section>
  )
}

export default LimitedDrops
