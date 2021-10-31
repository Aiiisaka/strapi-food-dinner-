import React from 'react';
import { Container, Divider, Header, Icon } from 'semantic-ui-react'

export default class StrapiFood extends React.Component {
    render() {
        return (
            <>
                <Header as='h1' size='huge' icon textAlign='center' color='brown'>
                    <Icon name='users' circular />
                    <Header.Content>Straπ Food</Header.Content>
                </Header>

                <br></br>

                <Container textAlign='justified'>
                    <b>Le Restaurant : Straπ Food</b>

                    <Divider />

                    <p>
                        Ce site a pour but éducatif.<br></br>
                        Afin d'apprendre le React, nous avons mis en place un site simple qui permet de comprendre le fonctionnement de React et de Strapi.<br></br>
                        Ce travail a été réalisé en équipe de 4 (les noms des participants sont accesibles en bas de cette page).
                    </p>
                    <p>
                        Ce site a différents onglets.<br></br>

                        Vous pouvez accéder aux différents menus qui composent le restaurant Straπ Food grâce à l'onglet menus.<br></br>
                        En cliquant sur un menu, vous avez accès aux détails du menu soit :<br></br>

                        <ul>
                            <li> Nom du Menu </li>
                            <li> Image du Menu </li>
                            <li> Description du Menu </li>
                            <li> Entrées du Menu (avec image, nom, description et prix) </li>
                            <li> Plats du Menu (avec image, nom, description et prix) </li>
                            <li> Desserts du Menu (avec image, nom, description et prix) </li>
                            <li> Boissons du Menu (avec image, nom, description et prix) </li>
                        </ul>
                        
                        Différents onglets permet d'accéder à la liste des entrées, plats, desserts et boissons présents au sein du restaurant.<br></br>
                        Chacune de ses listes permettent de décrire chaque plat par catégorie. Cette description contient :<br></br>
                        <ul>
                            <li> Image du Plat </li>
                            <li> Nom du Plat </li>
                            <li> Description du Plat </li>
                            <li> Prix du Plat </li>
                        </ul>

                        Un dernier onglet permet d'ajouter soit un plat, soit un menu.<br></br>
                        Pour ajouter un menu, il suffit de remplir le formulaire en rentrant une image (facultatif), le nom du menu et sa description.<br></br>
                        Pour ajouter un plat, il suffit de remplir le deuxième formulaire en rentrant une image (facultatif), le nom du plat, sa description, son prix, une catégorie (facultatif) et un menu (facultatif).
                    </p>

                    <br></br>

                    <b>L'Équipe</b>

                    <Divider />

                    <p>
                        L'équipe se compose de :<br></br>
      
                        <ul>
                            <li> HUARD Valentin </li>
                            <li> LEFORT Maud </li>
                            <li> POULENC Hadrien </li>
                            <li> ZAFIAMY BANMI Asthino</li>
                        </ul>
                    </p>
                    <p>
                        Merci de bien vouloir respecter ce projet et de ne pas copier sans autorisation.
                    </p>
                    
                    <br></br>
                </Container>
            </>
        )
    }
}
