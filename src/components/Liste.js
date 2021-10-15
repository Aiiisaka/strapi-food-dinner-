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
                <div class="menu-list">
                    <div class="demo-description">
                        <h1 class="demo-description__title">StraPi Food Dinner</h1>
                        <p class="demo-description__p">Cliquez sur les noms des menus pour voir les compositions</p>
                    </div>
                    <div class="demo coursemeal">
                        {
                            filtrage.map((menu) => < ListeMenus menu={menu} key={menu.id} />)
                        }
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <Header as='h1' color='brown' textAlign="center">Liste des Plats</Header>
                <div class="masonry">
                    {
                        filtrage.map((plat) => < ListePlats plat={plat} key={plat.id} />)
                    }
                </div>
            </>
        )
    }
}

export default Liste