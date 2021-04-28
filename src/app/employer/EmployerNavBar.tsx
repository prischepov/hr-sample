import { Link, NavLink, useHistory } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { useStore } from '../stores/store';

export default function EmployerNavBar() {
    const {userStore} = useStore();
    const history = useHistory();
    
    function signOut(){
        userStore.signOut().then(() => {
            history.push("/");
        });
    }

    return (
        <Menu>
            <Menu.Item as={Link} to="/employer/personnel" header>
                <img src={`${window.location.origin}/assets/logo.png`} alt="logo"/>
                HR Sample
            </Menu.Item>
            <Menu.Item as={NavLink} to="/employer/personnel" name="Personnel"/>
            <Menu.Item name="Schedule" disabled/>
            <Menu.Item as={NavLink} to="/employer/vacancies" name="Vacancies" />
            <Menu.Item name="Interviews"/>
            <Menu.Item name="Sign out" 
                position="right" icon="power"
                onClick={signOut}/>
        </Menu>
    )
}
