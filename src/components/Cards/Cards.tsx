import { FC } from "react"
import { Restaurant } from "../../api/api"
import { Card } from "../CardRestaurant/CardRestaurant"
import "./Cards.css"

interface CardsProps {
  restaurantList: Restaurant[],
  onRate: (id: string, newRating: number, currentRating: number) => void
}

export const Cards: FC<CardsProps> = ({ restaurantList, onRate }) => {
  console.log('Cards received:', restaurantList);
  return (
    <ul className="cards">
      {restaurantList.map((restaurant) => (
        <li key={restaurant.id}>
          <Card restaurant={restaurant} onRate={onRate}/>
        </li>
      ))}
    </ul>
  )
}