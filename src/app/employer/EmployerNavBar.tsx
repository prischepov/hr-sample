import { Link, NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

export default function EmployerNavBar() {
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
        </Menu>
    )
}
