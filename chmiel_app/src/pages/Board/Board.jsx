import {Container, Nav, Col, Row, Button} from "react-bootstrap";
import ReactSearchBox from "react-search-box";
import {Navigation} from "../../components/Navigation/Navigation";
import {SidebarMenu} from "../../components/Sidebar/Sidebar";
import "./Board.css"
import {useEffect, useState} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import default_profile_picture from "../../assets/default_profile_picture.jpg";
import useScreenSize from "../../other/useScreenSize";
import axios from "../../api/axios";
import {useCookies} from "react-cookie";
import { BoardComponent } from "../../components/Board/BoardComponent";
import {useParams} from "react-router-dom";

export const Board = (props) => {
    let { projectId } = useParams();
    const [project, setProject] = useState([])
    const [cookies] = useCookies(["token"]);
    const screenSize = useScreenSize();
    const [columnNum, setColumnNum] = useState(0);

    useEffect(() => {
        const getProject = async () => {
            try {
                const response = await axios.get(`/api/project/getProjectByProjectId/${projectId}`)
                console.log(response.data)
                setProject(response.data);
            } catch (error) {
                console.log(error)
            }
        };

        getProject()
        console.log(projectId)
    }, [])

    useEffect(() => {
        if (screenSize.width < 840) {
            setColumnNum(1)
        } else if (screenSize.width < 992) {
            setColumnNum(2)
        } else setColumnNum(3)
        console.log(columnNum)
    }, [screenSize.width])

    const [responseData, setResponseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [boardName, setBoardName] = useState('Board Name');
    const [isEditing, setIsEditing] = useState(false);
    const [newBoardName, setNewBoardName] = useState('');

    const handleEditClick = () => {
        setIsEditing(true);
        setNewBoardName(boardName);
    };

    const handleInputChange = (event) => {
        setNewBoardName(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            saveChanges();
        }
    };
    const handleBlur = () => {
        saveChanges();
    };

    const saveChanges = () => {
        setBoardName(newBoardName);
        setIsEditing(false);
    };

    const [groupMembers, setGroupMembers] = useState([
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5},
        {id: 6}
    ]);

    const [showAllMembers, setShowAllMembers] = useState(false);
    const maxDisplayedMembers = 5;
    const maxTotalMembers = 10;

    const toggleShowAllMembers = () => {
        setShowAllMembers(!showAllMembers);
    };

    const [panels, setPanels] = useState([
        {id: 1, name: "TO-DO"},
        {id: 2, name: "IN PROGRESS"},
        {id: 3, name: "DONE"},
        // {id: 11, name: "TO-DO"},
        // {id: 22, name: "IN PROGRESS"},
        // {id: 33, name: "DONE"},
        // {id: 111, name: "TO-DO"},
        // {id: 222, name: "IN PROGRESS"},
        // {id: 333, name: "DONE"},
        // {id: 1111, name: "TO-DO"},
        // {id: 2222, name: "IN PROGRESS"},
        // {id: 3333, name: "DONE"},
    ]);

    return (
        <>
        <Navigation/>
        <div style={{display: "flex"}}>
            <SidebarMenu project={project} from={"board"}/>
            <Container fluid={"md"} className="boardContainer">
                <div className="boardHeader">
                    <div className="projectLocation">
                        <Nav.Link href="" className="nav-link">Projects</Nav.Link>
                        <span style={{padding: '0px 8px'}}>/</span>
                        <Nav.Link href="/board" className="nav-link">Project Name</Nav.Link>
                    </div>
                    <div className="boardName">
                    {isEditing ? (
                        <h2>
                            <input
                                type="text"
                                value={newBoardName}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                onBlur={handleBlur}
                                autoFocus
                                />
                            </h2>
                                
                            ) : (
                                <h2>
                                    <span onClick={handleEditClick}>
                                        {boardName}
                                    </span>
                                </h2>)}
                    </div>
                    <div className="searchLevel">
                        <div className="searchBar">
                            <input type="text" placeholder="Search..." />
                        </div>
                        <div className="members">
                            <Row>
                                {groupMembers.slice(0, showAllMembers ? maxTotalMembers : maxDisplayedMembers).map((groupMember, index) => (
                                    <Col key={index} xs={2} md={3} lg={2} xxxl={1}>
                                        <img
                                            style={{ width: '30px', borderRadius: '50%' }}
                                            src={groupMember.profilePicture || default_profile_picture}
                                            alt={`Profile picture of ${groupMember.name}`}
                                        />
                                    </Col>
                                ))}
                            </Row>
                            {/* {groupMembers.length > maxDisplayedMembers && !showAllMembers && (
                                <Button onClick={toggleShowAllMembers}>Show all members</Button>
                            )} */}
                        </div>
                    </div>
                </div>
                <div className="innerBoardContainer">
                    {
                        panels.map((panel) => {
                            return <BoardComponent panel={panel}/>
                        })
                    }
                </div>
            </Container>
        </div>
            
        </>
    )
}
