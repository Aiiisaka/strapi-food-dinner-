import React from 'react';

import { NavLink } from 'react-router-dom';

import { Menu, Header, Image, Segment } from 'semantic-ui-react';

class Navigation extends React.Component {
    state = {
        activeItem: 'menus'
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {

        const { activeItem } = this.state

        return (
            <>
                <Segment basic inverted style={{margin: "0px"}}>
                    <Header as='h3' color="blue" textAlign='center'>
                        <Image src='https://usercontent.one/wp/www.coperbee.fr/wp-content/uploads/2021/01/strapi-1-e1609834851191.png' /><br></br>
                        Straπ Food
                    </Header>
                </Segment>
                <Menu inverted size="huge" borderless className="no-radius sticky" style={{margin: "0px"}}>
                    <NavLink to="/">
                        <Menu.Item
                            name='menus'
                            active={activeItem === 'menus'}
                            onClick={this.handleItemClick}
                        />
                    </NavLink>
                    <NavLink to="/entrees">
                        <Menu.Item
                            name='entrees'
                            active={activeItem === 'entrees'}
                            onClick={this.handleItemClick}
                        />
                    </NavLink>
                    <NavLink to="/plats">
                        <Menu.Item
                            name='plats'
                            active={activeItem === 'plats'}
                            onClick={this.handleItemClick}
                        />
                    </NavLink>
                    <NavLink to="/desserts">
                        <Menu.Item
                            name='desserts'
                            active={activeItem === 'desserts'}
                            onClick={this.handleItemClick}
                        />
                    </NavLink>
                    <NavLink to="/boissons">
                        <Menu.Item
                            name='boissons'
                            active={activeItem === 'boissons'}
                            onClick={this.handleItemClick}
                        />
                    </NavLink>

                    <Menu.Menu position='center'>
                        <NavLink to="/add">
                            <Menu.Item
                                icon='add'
                                iconPosition='left'
                                name='ajouter'
                                active={activeItem === 'ajouter'}
                                onClick={this.handleItemClick}
                            />
                        </NavLink>
                    </Menu.Menu>

                    <Menu.Menu position='right'>
                        <NavLink to="/strapi-food">
                            <Menu.Item
                                name='straπ food'
                                active={activeItem === 'straπ food'}
                                onClick={this.handleItemClick}
                            />
                        </NavLink>
                    </Menu.Menu>
                </Menu>
            </>
        )
    }

}

export default Navigation;