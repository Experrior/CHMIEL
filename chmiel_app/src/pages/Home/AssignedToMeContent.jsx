import React from "react";
import { TaskComponent } from "../../components/Task/TaskComponent";
import {useState} from "react";

const AssignedToMeContent = () => {
    const [tasks, setTasks] = useState([
        // {id: 1, name: "testTask1"},
        // {id: 2, name: "testTask2"},
        // {id: 3, name: "testTask3"},
        // {id: 4, name: "testTask4"}
    ])

    return (
        <div>
            { tasks.length !== 0 ? 
               (
                    tasks.map((task) => {
                        return <TaskComponent task={task}/>
                    })
                ) : <><p>You are free to go. No issues have been assigned to you!</p></>
            }
        </div>
            );
};

export default AssignedToMeContent;
