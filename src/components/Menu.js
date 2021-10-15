import React from 'react';

import { Button, Icon, Image, Modal, Divider, Header, Card } from 'semantic-ui-react'

const Menu = ({ menu, plats }) => {

    const [open, setOpen] = React.useState(false)

    let entree = [], plat = [], dessert = [], boisson = [];

    console.log(plats)

    console.log("Le menu " + menu.nom + " a comme plat :")

    for (let i = 0; i < plats.length; i++) {
        console.log(plats[i].nom)
        switch (plats[i].category) {
            case 1:
                entree.push(plats[i]);
                break;
            case 2:
                plat.push(plats[i]);
                break;
            case 3:
                dessert.push(plats[i]);
                break;
            case 4:
                boisson.push(plats[i]);
                break;
            default:
                console.log("Aucune catégorie")
                break;
        }

    }

    function generateCard(categorie) {
        return categorie.map((cate) =>
            <Card>
                <Image src={cate.image} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{cate.nom}</Card.Header>
                    <Card.Description>
                        {cate.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Icon name='eur' />
                    {cate.prix} euros
                </Card.Content>
            </Card>

        )
    }


    return (
        <>
            <Modal
                size='large'
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                trigger={<Button>Voir le {menu.nom}</Button>}
            >
                <Modal.Header>{menu.nom}</Modal.Header>
                <Modal.Content image scrolling>
                    <Image size='medium' wrapped src={menu.image} />

                    <Modal.Description>
                        <Divider horizontal>
                            <Header as='h4'>
                                <Icon name='glass martini' />
                                Entrées
                            </Header>
                        </Divider>


                        <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>
                        <Card.Group itemsPerRow={3}>
                            {
                                generateCard(entree)
                            }
                        </Card.Group>

                        <Divider horizontal>
                            <Header as='h4'>
                                <Icon name='utensils' />
                                Plats
                            </Header>
                        </Divider>

                        <Card.Group itemsPerRow={3}>
                            {
                                generateCard(plat)
                            }
                        </Card.Group>

                        <Divider horizontal>
                            <Header as='h4'>
                                <Icon name='spoon' />
                                Desserts
                            </Header>
                        </Divider>

                        <Card.Group itemsPerRow={3}>
                            {
                                generateCard(dessert)
                            }
                        </Card.Group>

                        <Divider horizontal>
                            <Header as='h4'>
                                <Icon name='coffee' />
                                Boissons
                            </Header>
                        </Divider>

                        <Card.Group itemsPerRow={3}>
                            {
                                generateCard(boisson)
                            }
                        </Card.Group>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Header as='h3' float='center'>
                        {menu.description}
                    </Header>
                </Modal.Actions>
            </Modal>
        </>
    )
}

export default Menu;