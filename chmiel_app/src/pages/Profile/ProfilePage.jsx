import {Button, Col, Container, Row} from "react-bootstrap";
import {Navigation} from "../../components/Navigation/Navigation";
import "./ProfilePage.css"
import default_profile_picture from "../../assets/default_profile_picture.jpg"
export const ProfilePage = () => {
    return (
        <>
            <Navigation />
            <div className={"profileImageBackground"}/>
            <div className={"profileContainer"}>
                <div className={"profileDetails"}>
                    <img className={"profilePicture"} src={default_profile_picture}  alt={"default profile picture"}/>
                    <h2>Jane Doe</h2>
                    <Button variant={"custom-primary"}>Edit details</Button>
                </div>
                <div className={"profileProjects"}></div>
            </div>
        </>
    )
}