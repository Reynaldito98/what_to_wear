import './ItemCard.css';
import likeButton from '../../images/like.png';
import dislikeButton from '../../images/dislike.png';
import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentTemperatureUnitContext';

function ItemCard(props) {
    const user = React.useContext(CurrentUserContext)
    const isLiked = props.item.likes.some(id => id === user.currentUser._id);

    return (
            <li className="item-card">
                <img src={props.item.imageUrl} alt={props.item.name} className="item-card__image" onClick={()=>{props.openModal(props.item)}}></img>
                {props.isLoggedIn ? 
                    <div className="item-card__info-container">
                        <p className="item-card__title">{props.item.name}</p>
                        <button className="item-card__like-btn"><img src={isLiked?likeButton:dislikeButton} alt="like-btn" className="item-card__like-image" onClick={() => props.onCardLike(props.item._id, isLiked)}/></button>
                    </div>:""
                }
            </li>
    )
}

export default ItemCard;