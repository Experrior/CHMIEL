import React from "react";
import { TaskComponent } from "../../components/Task/TaskComponent";
import {useState} from "react";

const ViewedContent = () => {
    const [tasks, setTasks] = useState([
        {id: 1, name: "testTask1"},
        {id: 2, name: "testTask2"},
        {id: 3, name: "testTask3"},
        {id: 4, name: "testTask4"}
    ])

    return (
        <div>
            { tasks.length !== 0 ? 
               (
                    tasks.map((task) => {
                        return <TaskComponent task={task}/>
                    })
                ) : <><p>Oops! It seems like you haven't viewed anything yet. How is that even possible, huh?</p></>
            }
        </div>
            );
};

export default ViewedContent;
