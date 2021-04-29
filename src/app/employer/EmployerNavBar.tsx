import { Link, NavLink, useHistory } from 'react-router-dom'
import { Icon, Menu } from 'semantic-ui-react'
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
        <Menu stackable>
            <Menu.Item as={Link} to="/employer/personnel" header>
                <Icon name="cogs" size="large"/>
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
