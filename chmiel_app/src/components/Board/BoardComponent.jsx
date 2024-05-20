import './BoardComponent.css'
import { TaskComponent } from "../../components/Task/TaskComponent";
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export const BoardComponent = ({panel, sprint_tasks}) => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        setTasks(sprint_tasks.filter(task => task.status === panel.status))
    }, [sprint_tasks]);


    return(
        <div key={panel.id} className={"boardComponentContainer"}>
            <h5>{panel.name}</h5>
            <div>
            { tasks.length !== 0 ? 
               (
                    tasks.map((task) => {
                        return <TaskComponent task={task}/>
                    })
                ) : <><p></p></>
            }
        </div>
        </div>
    )
}