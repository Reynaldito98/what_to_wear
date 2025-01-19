import './CardSection.css';
import ItemCard from '../ItemCard/ItemCard';

function CardSection(props) {
    const filteredCards = props.defaultClothingItems.filter(card => card.weather === props.tempDescription)

    return (
            <section className="card-section">
                <p className="card-section__heading">Today is {props.weatherData.temperature[props.temperatureUnit.currentTemperatureUnit]}/ You may want to wear:</p>

                <ul className="card-section__list">
                    {
                        filteredCards.map(item => (
                            <ItemCard key={item._id} openModal={props.openModal} item={item} onCardLike={props.onCardLike} isLoggedIn={props.isLoggedIn}/>
                        ))
                    }
                </ul>
            </section>
    )
}

export default CardSection;