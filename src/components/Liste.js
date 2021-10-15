import React from 'react';

import ListePlats from './ListePlat.js';
import ListeMenus from './ListeMenu.js';

import { Header, List, Grid, Image } from 'semantic-ui-react'

const Liste = ({ plats, menus, match }) => {
    let filtrage; let isMenu = false;

    switch (match.params.filter) {
        case "entrees":
            isMenu = false;
            filtrage = plats.filter(function (plat) {
                return plat.category.nom === "Entrée";
            });
            break;
        case "plats":
            isMenu = false;
            filtrage = plats.filter(function (plat) {
                return plat.category.nom === "Plat";
            });
            break;
        case "desserts":
            isMenu = false;
            filtrage = plats.filter(function (plat) {
                return plat.category.nom === "Dessert";
            });
            break;
        case "boissons":
            isMenu = false;
            filtrage = plats.filter(function (plat) {
                return plat.category.nom === "Boisson";
            });
            break;
        default:
            isMenu = true;
            filtrage = menus;
    }

    if (isMenu) {
        return (
            <>
                <div class="banner">
                    <div class="border"> </div>
                    <h2>Straπ Food</h2>
                    <p>by Valentin, Maud, Asthino, Hadrien</p>
                    <div class="border border-bottom">
                    </div>
                </div>
            <Header as='h1' color='white'>Liste des Menus</Header>
                <List>
                    {
                        filtrage.map((menu) => < ListeMenus menu={menu} key={menu.id} />)
                    }
                </List>
            </>
        )
    } else {
    return (
        <>
            <Header as='h1' color='brown'>Liste des Plats</Header>
            <List itemsPerRow={4} centered>
                {
                    filtrage.map((plat) => < ListePlats plat={plat} key={plat.id} />)
                }
            </List>
        </>
    )
}
}

export default Liste