import React, { useEffect, useState } from 'react';

import ListePlats from './ListePlat.js';
import ListeMenus from './ListeMenu.js';

import { Header } from 'semantic-ui-react'

const Liste = ({plats, menus, match }) => {
    const [data, setData] = useState([]);
    const [filtrage, setFiltrage] = useState([]);
    const [isMenu, setIsMenu] = useState(false);

    useEffect(() => {
        setData(plats);
    },[plats]);

    useEffect(() => {
        switch (match.params.filter) {
            case "entrees":
                setIsMenu(false);
                setFiltrage(data.filter(function (plat) {
                    return plat.category.nom === "Entrée";
                }));
                break;
            case "plats":
                setIsMenu(false);
                setFiltrage(data.filter(function (plat) {
                    return plat.category.nom === "Plat";
                }));
                break;
            case "desserts":
                setIsMenu(false);
                setFiltrage(data.filter(function (plat) {
                    return plat.category.nom === "Dessert";
                }));
                break;
            case "boissons":
                setIsMenu(false);
                setFiltrage(data.filter(function (plat) {
                    return plat.category.nom === "Boisson";
                }));
                break;
            default:
                setIsMenu(true);
                setFiltrage(menus);
        }
    },[data, match]);

    if (isMenu) {
            return (
                <>
                    <div className="banner">
                        <div className="border"> </div>
                        <h2>Straπ Food</h2>
                        <p>by Valentin, Maud, Asthino, Hadrien</p>
                        <div className="border border-bottom">
                        </div>
                    </div>
                    <div className="menu-list">
                        <div className="demo-description">
                            <h1 className="demo-description__title">StraPi Food Dinner</h1>
                            <p className="demo-description__p">Cliquez sur les noms des menus pour voir les compositions</p>
                        </div>
                        <div className="demo coursemeal">
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
                    <div className="masonry">
                        {
                            filtrage.map((plat) => < ListePlats 
                                onDeletePlat = {
                                    (idPlat) => setData(prevData => {
                                        prevData.splice(prevData.findIndex(element => element.id === idPlat),1); 
                                        return [...prevData]
                                    })
                                } 
                            plat={plat} key={plat.id} />)
                        }
                    </div>
                </>
            )
        }
}

export default Liste