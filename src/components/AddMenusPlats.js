import React from 'react';

import { Button, Divider, Form, Grid, Segment, Message, Header, Icon } from 'semantic-ui-react'

// Analyse JSON grâce à la requête réseau
const parseJSON = resp => (resp.json ? resp.json() : resp);

// Détection si la requête réseau est bonne sinon retourne une erreur
const checkStatus = resp => {
    if (resp.status >= 200 && resp.status < 300) {
        return resp;
    }
    return parseJSON(resp).then(resp => {
        throw resp;
    });
};

// JSON
const headers = {
    'Content-Type': 'application/json',
};

// Permet d'ajouter des plats ou des menus sur le site !
export default class AddMenusPlats extends React.Component {
    // Contructeur des états
    constructor(props) {
        super(props);
        this.state = {
            modifiedDataPlat: {
                image: '',
                nom: '',
                description: '',
                prix: '',
                category: [],
                menu: [],
            },
            allCategories: [],
            allMenus: [],
            modifiedDataMenu: {
                image: '',
                nom: '',
                description: '',
            },
            error: null,
        };
    }

    // Récupérer les données des catégories et des menus (Strapi)
    componentDidMount = async () => {
        try {
            const allCategories = await fetch('http://54.37.165.18:1337/categories', {
                method: 'GET',
                headers: headers,
            }).then(checkStatus).then(parseJSON);
            this.setState({ allCategories });
        } catch (error) {
            this.setState({ error });
        }

        try {
            const allMenus = await fetch('http://54.37.165.18:1337/menus', {
                method: 'GET',
                headers: headers,
            }).then(checkStatus).then(parseJSON);
            this.setState({ allMenus });
        } catch (error) {
            this.setState({ error });
        }
    };

    // Mettre à jour les données des menus
    handleInputChangeMenu = ({ target: { name, value } }) => {
        this.setState(prev => ({
            ...prev,
            modifiedDataMenu: {
                ...prev.modifiedDataMenu,
                [name]: value,
            },
        }));
    };

    // Mettre à jour les données des plats
    handleInputChangePlat = ({ target: { name, value } }) => {
        this.setState(prev => ({
            ...prev,
            modifiedDataPlat: {
                ...prev.modifiedDataPlat,
                [name]: value,
            },
        }));
    };

    // Mettre le Nouveau Plat sur Strapi
    handleSubmitPlat = async e => {
        e.preventDefault();

        try {
            if (this.state.modifiedDataPlat.image === '') {
                this.state.modifiedDataPlat.image = 'https://wegoboard.com/img/p/fr-default-large_default.jpg';
            }

            await fetch('http://54.37.165.18:1337/plats', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(this.state.modifiedDataPlat),
            }).then(checkStatus).then(parseJSON);

            window.location.reload(false);
        } catch (error) {
            this.setState({ error });
        }
    };

    // Mettre le Nouveau Menu sur Strapi
    handleSubmitMenu = async e => {
        e.preventDefault();

        try {
            if (this.state.modifiedDataMenu.image === '') {
                this.state.modifiedDataMenu.image = 'https://wegoboard.com/img/p/fr-default-large_default.jpg';
            }

            await fetch('http://54.37.165.18:1337/menus', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(this.state.modifiedDataMenu),
            }).then(checkStatus).then(parseJSON);

            window.location.reload(false);
        } catch (error) {
            this.setState({ error });
        }
    };

    // Mise en place des options pour les menus (liste des menus présents sur le site)
    renderOptionMenus = unMenu => {
        return (
            <option
                label={unMenu.nom}
                value={unMenu.nom}
                name="menu"
                id={unMenu.id}
            />
        );
    };

    // Mise en place des options pour les catégories (liste des catégories présents sur le site)
    renderOptionCategories = uneCategorie => {
        return (
            <option
                label={uneCategorie.nom}
                value={uneCategorie.nom}
                name="category"
                id={uneCategorie.id}
            />
        );
    };

    // Permet de mettre à jour le choix d'une catégorie pour un plat
    handleChangeCategory = (event) => {
        this.handleInputChangePlat({
            target: { name: 'category', value: event.target.options[event.target.selectedIndex].id },
        });
    };

    // Permet de mettre à jour le choix d'un menu pour un plat
    handleChangeMenu = (event) => {
        this.handleInputChangePlat({
            target: { name: 'menu', value: event.target.options[event.target.selectedIndex].id },
        });
    };

    // Affichage
    render() {
        const { error, allCategories, allMenus, modifiedDataMenu, modifiedDataPlat } = this.state;

        // Print errors if any
        if (error) {
            return <Message negative>
                        <Message.Header>We're sorry we can't add this data.</Message.Header>
                        <p>{error.message}</p>
                    </Message>;
        }

        return (
            <>
                <Header as='h1' icon textAlign='center' color='grey'>
                    <Icon name='settings' circular />
                    Ajouter un Menu ou un Plat
                    <Header.Subheader style={{color: 'grey'}}>
                        Vous pouvez ajouter soit un menu soit un plat (entrée, plat, dessert ou boisson) pour le restaurant Straπ Food.
                    </Header.Subheader>
                </Header>

                <br></br>

                <Segment inverted placeholder>
                    <Grid inverted columns={2} relaxed='very' stackable>
                        {/* Ajout d'un menu */}
                        <Grid.Column>

                            <Header as='h2' color='orange' size='large' textAlign='center'>
                                Ajouter un Menu
                            </Header>

                            <Form onSubmit={this.handleSubmitMenu}>
                                <Form.Input
                                    icon='keyboard outline'
                                    iconPosition='left'
                                    label='Image'
                                    name='image'
                                    placeholder="URL de l'image"
                                    onChange={this.handleInputChangeMenu}
                                    value={modifiedDataMenu.image}
                                />

                                <Form.Input
                                    style={{color: 'grey'}}
                                    icon='pencil write'
                                    iconPosition='left'
                                    label='Nom'
                                    required
                                    name='nom'
                                    type='text'
                                    placeholder='Nom du Menu'
                                    onChange={this.handleInputChangeMenu}
                                    value={modifiedDataMenu.nom}
                                />

                                <Form.TextArea
                                    rows='2'
                                    label='Courte Description'
                                    name='description'
                                    required
                                    placeholder='Courte Description du Menu'
                                    onChange={this.handleInputChangeMenu}
                                    value={modifiedDataMenu.description}
                                />

                                <Button type='submit' content='Ajouter ce Menu' icon='clipboard list' basic color='orange' />
                            </Form>
                        </Grid.Column>

                        {/* Ajout d'un plat */}
                        <Grid.Column verticalAlign='middle'>

                            <Header as='h2' textAlign='center' size='large' color='teal'>
                                Ajouter un Plat
                            </Header>

                            <Form onSubmit={this.handleSubmitPlat}>
                                <Form.Group widths='equal'>
                                    <Form.Input
                                        icon='keyboard outline'
                                        iconPosition='left'
                                        label='Image'
                                        name='image'
                                        placeholder="URL de l'image"
                                        onChange={this.handleInputChangePlat}
                                        value={modifiedDataPlat.image}
                                    />

                                    <Form.Input
                                        icon='pencil write'
                                        iconPosition='left'
                                        required
                                        label='Nom'
                                        name='nom'
                                        placeholder='Nom du Plat'
                                        onChange={this.handleInputChangePlat}
                                        value={modifiedDataPlat.nom}
                                    />
                                </Form.Group>

                                <Form.Group widths='equal'>
                                    <Form.TextArea
                                        rows='2'
                                        label='Courte Description'
                                        name='description'
                                        required
                                        placeholder='Courte Description du Plat'
                                        onChange={this.handleInputChangePlat}
                                        value={modifiedDataPlat.description}
                                    />

                                    <Form.Field required label='Liste des Catégories' onChange={this.handleChangeCategory} control='select'>
                                        <option disabled selected value="">Catégories</option>
                                        {allCategories.map(this.renderOptionCategories)}
                                    </Form.Field>
                                </Form.Group>

                                <Form.Group widths='equal'>
                                    <Form.Input
                                        icon='euro'
                                        iconPosition='left'
                                        type='number'
                                        label='Prix'
                                        name='prix'
                                        required
                                        step=".01"
                                        placeholder='Prix du Plat'
                                        onChange={this.handleInputChangePlat}
                                        value={modifiedDataPlat.prix}
                                    />

                                    <Form.Field label='Listes des Menus' onChange={this.handleChangeMenu} control='select'>
                                        <option disabled selected value="">Menus</option>
                                        {allMenus.map(this.renderOptionMenus)}
                                    </Form.Field>
                                </Form.Group>
                                
                                <Button type='submit' content='Ajouter ce Plat' icon='food' basic color='teal' />
                            </Form>
                        </Grid.Column>
                    </Grid>

                    <Divider inverted vertical>Ou</Divider>
                </Segment>

                <br></br><br></br>
            </>
        );
    }
};