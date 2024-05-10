import React from "react";
import { TaskComponent } from "../../components/Task/TaskComponent";
import {useState} from "react";


const WorkedOnContent = () => {

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
                ) : <><p>You haven't worked on any anything yet. <a href="#">View all projects.</a></p></>
            }
        </div>
            );
};

export default WorkedOnContent;
