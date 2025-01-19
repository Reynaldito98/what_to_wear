import './ClothesSection.css';
import ItemCard from '../ItemCard/ItemCard';
import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentTemperatureUnitContext';

function ClothesSection(props) {
    const user = React.useContext(CurrentUserContext);

    return (
        <section className="clothes-section">
            <div className="clothes-section__heading">
                <p className="clothes-section__your-items">Your items</p>
                <button className="clothes-section__button" onClick={props.openModal}>+ Add new</button>
            </div>

            <ul className="clothes-section__list">
                    {
                        props.defaultClothingItems.map(item => (
                            (item.owner===user.currentUser._id)?<ItemCard key={item._id} openModal={props.openImageModal} item={item} onCardLike={props.onCardLike} isLoggedIn={props.isLoggedIn}/>:''
                        ))
                    }
            </ul>
        </section>
    )
}

export default ClothesSection;