import { Menu } from 'semantic-ui-react'

export default function EmployerNavBar() {
    return (
        <Menu inverted>
            <Menu.Item header>
                <img src="../assets/logo.png" alt="logo"/>
                HR Sample
            </Menu.Item>
            <Menu.Item name="Personnel"/>
            <Menu.Item name="Schedule" disabled/>
            <Menu.Item name="Vacancies"/>
            <Menu.Item name="Interviews"/>
        </Menu>
    )
}
