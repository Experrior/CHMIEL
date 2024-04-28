import Navbar from 'react-bootstrap/Navbar';
import {Container, Nav} from "react-bootstrap";
import "./Navigation.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser} from "@fortawesome/free-regular-svg-icons";
import {faArrowRightFromBracket, faBars, faGear} from "@fortawesome/free-solid-svg-icons";
import {useCookies} from "react-cookie";

export const Navigation = ({sticky, fixed}) => {
    const [cookies, setCookies, removeCookie] = useCookies(['token']);

    const logout = () => {
        removeCookie('token')
    }

    return (
        <Navbar id={"navigation-custom-top"} sticky={sticky} fixed={fixed} expand={"md"}>
            <Container fluid={"md"}>
                <a className={"navbar-brand brand-name-large"} href={"/"}>CHMIEL</a>
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <FontAwesomeIcon icon={faBars}/>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav" className={"collapsable-menu"}>
                    <Nav>
                        <Container className={"tabs-container"}>
                            <Nav.Link href={"/"}>Work</Nav.Link>
                            <Nav.Link>Projects</Nav.Link>
                            <Nav.Link href={"/charts"}>Charts</Nav.Link>
                        </Container>
                    </Nav>
                </Navbar.Collapse>

                <a className={"navbar-brand brand-name-small"} href={"/"}>CHMIEL</a>
                <Nav className={"account-links-container"}>
                    <Nav.Link href={"/settings"} className={"account-link"}>
                        <div className={"cartIcon"}>
                            <FontAwesomeIcon icon={faGear}/>
                        </div>
                        <p className={"link-text"}>Settings</p>
                    </Nav.Link>

                    <Nav.Link href={"/profile"} className={"account-link"}>
                        <FontAwesomeIcon icon={faCircleUser}/>
                        <p className={"link-text"}>Profile</p>
                    </Nav.Link>

                    <Nav.Link className={"account-link"} onClick={logout}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket}/>
                        <p className={"link-text"}>Logout</p>
                    </Nav.Link>


                </Nav>
            </Container>
        </Navbar>
    )
}