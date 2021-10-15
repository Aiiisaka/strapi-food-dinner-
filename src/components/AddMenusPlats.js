import React from 'react';

import { Button, Divider, Form, Grid, Segment, Message, Header, Icon } from 'semantic-ui-react'

// Parses the JSON returned by a network request
const parseJSON = resp => (resp.json ? resp.json() : resp);

// Checks if a network request came back fine, and throws an error if not
const checkStatus = resp => {
    if (resp.status >= 200 && resp.status < 300) {
        return resp;
    }
    return parseJSON(resp).then(resp => {
        throw resp;
    });
};

const headers = {
    'Content-Type': 'application/json',
};

export default class AddMenusPlats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modifiedDataPlat: {
                image: 'https://wegoboard.com/img/p/fr-default-large_default.jpg',
                nom: '',
                description: '',
                prix: '',
                categories: [],
                menus: [],
            },
            allCategories: [],
            allMenus: [],
            modifiedDataMenu: {
                image: 'https://wegoboard.com/img/p/fr-default-large_default.jpg',
                nom: '',
                description: '',
            },
            error: null,
        };
    }

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

    handleInputChangeMenu = ({ target: { name, value } }) => {
        this.setState(prev => ({
            ...prev,
            modifiedDataMenu: {
                ...prev.modifiedDataMenu,
                [name]: value,
            },
        }));
    };

    handleInputChangePlat = ({ target: { name, value } }) => {
        this.setState(prev => ({
            ...prev,
            modifiedDataPlat: {
                ...prev.modifiedDataPlat,
                [name]: value,
            },
        }));
    };

    handleSubmitPlat = async e => {
        e.preventDefault();

        try {
            await fetch('http://54.37.165.18:1337/plats', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(this.state.modifiedDataPlat),
            }).then(checkStatus).then(parseJSON);
        } catch (error) {
            this.setState({ error });
        }
    };

    handleSubmitMenu = async e => {
        e.preventDefault();

        try {
            await fetch('http://54.37.165.18:1337/menus', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(this.state.modifiedDataMenu),
            }).then(checkStatus).then(parseJSON);
        } catch (error) {
            this.setState({ error });
        }
    };

    renderOptionMenus = menu => {
        const {
            modifiedDataPlat: { menus },
        } = this.state;
        
        const isChecked = menus.includes(menu.id);

        const handleChangeMenu = () => {
            if (!menus.includes(menu.id)) {
                this.handleInputChangePlat({
                    target: { name: 'menus', value: menus.concat(menu.id) },
                });
            } else {
                this.handleInputChangePlat({
                    target: {
                        name: 'menus',
                        value: menus.filter(v => v !== menu.id),
                    },
                });
            }
        };

        return (
            <option
                label={menu.nom}
                checked={isChecked}
                onChange={handleChangeMenu}
                name="menus"
                id={menu.id} >
            </option>
        );
    };

    renderOptionCategories = categorie => {
        const {
            modifiedDataPlat: { categories },
        } = this.state;
        
        const isChecked = categories.includes(categorie.id);

        const handleChangeCategorie = () => {
            if (!categories.includes(categorie.id)) {
                this.handleInputChangePlat({
                    target: { name: 'categories', value: categories.concat(categorie.id) },
                });
            } else {
                this.handleInputChangePlat({
                    target: {
                        name: 'categories',
                        value: categories.filter(v => v !== categorie.id),
                    },
                });
            }
        };

        return (
            <option
                label={categorie.nom}
                checked={isChecked}
                onChange={handleChangeCategorie}
                name="categories"
                id={categorie.id} >
            </option>
        );
  };

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
                <br></br>

                <Header as='h1' icon textAlign='center'>
                    <Icon name='settings' circular />
                    Ajouter un Menu ou un Plat
                    <Header.Subheader>
                        Vous pouvez ajouter soit un menu soit un plat (entrée, plat, dessert ou boisson) pour le restaurant Straπ Food.
                    </Header.Subheader>
                </Header>

                <br></br>

                <Segment placeholder>
                    <Grid columns={2} relaxed='very' stackable>
                        <Grid.Column>

                            <Header as='h2' color='orange' icon size='small' textAlign='center'>
                                <Icon name='list' />
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

                        <Grid.Column verticalAlign='middle'>

                            <Header as='h2' icon textAlign='center' size='small' color='teal'>
                                <Icon name='food' />
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

                                    <Form.Field required label='Liste des Catégories' control='select'>
                                        <option disabled selected value="">Categories</option>
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

                                    <Form.Field label='Listes des Menus' control='select'>
                                        <option disabled selected value="">Menus</option>
                                        {allMenus.map(this.renderOptionMenus)}
                                    </Form.Field>
                                </Form.Group>
                                
                                <Button type='submit' content='Ajouter ce Plat' icon='coffee' basic color='teal' />
                            </Form>
                        </Grid.Column>
                    </Grid>

                    <Divider vertical>Ou</Divider>
                </Segment>
            </>
        );
    }
};