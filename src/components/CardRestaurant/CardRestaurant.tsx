import { FC } from 'react'
import StarIcon from '../../assets/star.svg?react'
import "./CardRestaurant.css"
import { Restaurant } from '../../api/api'

interface CardProps {
    restaurant: Restaurant,
    onRate: (id: string, newRating: number, currentRating: number) => void
}

export const Card: FC<CardProps> = ({ restaurant, onRate}) => {
    return (
        <div className="card">
            <img className='card__img' alt="card" src={restaurant.url} />
            <h2 className="card__title">{restaurant.name}</h2>
            <span className="card__text">{restaurant.description}</span>
            <div className="card__stars">
                {[...Array(5)].map((_, index) => {
                    const starNumber = index + 1;
                    return (
                        <StarIcon
                            key={index}
                            onClick={() => onRate(restaurant.id, starNumber, restaurant.raiting)}
                            width={20}
                            height={20}
                            className={`card__icon ${index < restaurant.raiting ? 'card__icon--filled' : ''}`}
                        />
                    )
                })}
            </div>
        </div>
    )
}