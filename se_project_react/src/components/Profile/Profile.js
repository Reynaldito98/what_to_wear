import './Profile.css';
import SideBar from '../SideBar/SideBar';
import ClothesSection from '../ClothesSection/ClothesSection';

function Profile(props) {
    return (
        <main className="profile">
            <SideBar user={props.user} openModal={props.openEditModal} handleSignOut={props.handleSignOut}/>
            <ClothesSection defaultClothingItems = {props.defaultClothingItems} openModal={props.openModal} openImageModal={props.openImageModal} user={props.user} onCardLike = {props.onCardLike} isLoggedIn={props.isLoggedIn}/>
        </main>
    )
}

export default Profile;