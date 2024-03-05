import {useEffect, useState} from "react";
import axios from "../api/axios";

export const HomePage = () => {
    const [users, setUsers] = useState([])

    const getUsers = async () => {
        const response = await axios.get("/api/user")
        console.log(response.data)
        return response.data
    }

    useEffect(() => {
        getUsers().then(result => {
            setUsers(result)
        })
    }, [])

    return (
        <div className={"container"}>
            <div className={"welcomeContainer"}>
                <h1 className={"welcomeTitle"}><span>&#9886;</span> Welcome Users! <span>&#9887;</span></h1>
                {users.map((user) => {
                    return <div className={"userContainer"} key={user.id}><p
                        className={"userText"}>Hello, {user.firstname}.</p></div>
                })}
            </div>
        </div>

    )
}