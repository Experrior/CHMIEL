import './UserComponent.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export const UserComponent = ({user, deleteUser}) => {
    return(
        <div key={user.id} className={"userComponentContainer"}>
            <span className="btn-custom-circle">
                <p className="userLetters">
                    {user.firstName[0]}{user.lastName[0]}
                </p>
            </span>
            <p>{user.firstName} {user.lastName}</p>
            <div className={"icon"}><FontAwesomeIcon icon={faTrashAlt} onClick={deleteUser}/></div>
        </div>
    )
}