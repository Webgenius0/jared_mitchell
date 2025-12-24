import Container from '@/Components/Common/Container'
import { featuredShopData } from '@/Components/Data/data'
import ShopCard from './ShopCard'

const FeaturedShop = () => {
  return (
      <section>
        <Container>
          <div className="section rounded-[20px] custom_border bg-secondary-gray space-y-11">
            <div>
              <h2 className="section_title 2xl:!text-7xl">Featured from the OSI Shop</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 px-8">
              {featuredShopData?.map((data, index) => (
                <ShopCard data={data} />
              ))}
            </div>
          </div>
        </Container>
      </section>
  )
}

export default FeaturedShop
