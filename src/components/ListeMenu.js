import React from 'react';

import Menu from './Menu';

export default class ListeMenu extends React.Component {
    render() {
        return (
            <div class="coursemeal__div ">

                <picture class="responsive-img">
                    <img src={this.props.menu.image} alt={this.props.menu.nom} />
                </picture>

                <div class="coursemeal-info">
                    <Menu menu={this.props.menu} plats={this.props.menu.plats} />
                </div>
            </div>
        )
    }
}