import './BoardComponent.css'
import { TaskComponent } from "../../components/Task/TaskComponent";
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export const BoardComponent = ({panel, projectId}) => {

    const [tasks, setTasks] = useState([
        {id: 1, name: "testTask1"},
        {id: 2, name: "testTask2"},
        {id: 3, name: "testTask3"},
        {id: 4, name: "testTask4"}
    ]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`/api/task/getTasksByProjectId/${projectId}`);
                const filteredTasks = response.data.filter(task => task.status === panel.status);
                setTasks(filteredTasks);
                
            } catch (error) {
                console.log(error);
            }
        };

        fetchTasks();
    }, [panel.name]);

    return(
        <div key={panel.id} className={"boardComponentContainer"}>
            <h5>{panel.name}</h5>
            <div>
            { tasks.length !== 0 ? 
               (
                    tasks.map((task) => {
                        return <TaskComponent task={task}/>
                    })
                ) : <><p>You are free to go. No issues have been assigned to you!</p></>
            }
        </div>
        </div>
    )
}