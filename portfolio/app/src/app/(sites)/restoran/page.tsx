import { RestaurantAbout } from '@/components/sites/restoran/RestaurantAbout'
import { RestaurantChef } from '@/components/sites/restoran/RestaurantChef'
import { RestaurantEvents } from '@/components/sites/restoran/RestaurantEvents'
import { RestaurantFooter } from '@/components/sites/restoran/RestaurantFooter'
import { RestaurantGallery } from '@/components/sites/restoran/RestaurantGallery'
import { RestaurantHero } from '@/components/sites/restoran/RestaurantHero'
import { RestaurantLocation } from '@/components/sites/restoran/RestaurantLocation'
import { RestaurantMenu } from '@/components/sites/restoran/RestaurantMenu'
import { RestaurantNav } from '@/components/sites/restoran/RestaurantNav'
import { RestaurantReservation } from '@/components/sites/restoran/RestaurantReservation'
import { RestaurantReviews } from '@/components/sites/restoran/RestaurantReviews'

export default function RestoranPage() {
  return (
    <>
      <RestaurantNav />
      <RestaurantHero />
      <RestaurantAbout />
      <RestaurantMenu />
      <RestaurantChef />
      <RestaurantGallery />
      <RestaurantReviews />
      <RestaurantEvents />
      <RestaurantLocation />
      <RestaurantReservation />
      <RestaurantFooter />
    </>
  )
}
