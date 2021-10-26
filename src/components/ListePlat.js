import React from 'react';
import { Button, Modal, Form, Header, Image, Icon } from 'semantic-ui-react';

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

export default class ListePlat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            size: undefined,
            plat: {
                ...this.props.plat, 
                menu: {...this.props.plat.menu},
                category: {...this.props.plat.category}
            },
            allCategories: [],
            allMenus: []
        };
        this.modif = false;
        this._actionDeny = () => this.reducer({ type: "close" });
        this._actionAccept = () => this.deletePlat(this.props.plat.id);
    }

    componentDidMount = async () => {
        try {
            const allCategories = await fetch('http://54.37.165.18:1337/categories', {
                method: 'GET',
                headers: headers,
            }).then(checkStatus).then(parseJSON);
            this.setState({ allCategories });
        } catch (error) {
            console.log(error)
        }

        try {
            const allMenus = await fetch('http://54.37.165.18:1337/menus', {
                method: 'GET',
                headers: headers,
            }).then(checkStatus).then(parseJSON);
            this.setState({ allMenus });
        } catch (error) {
            console.log(error)
        }
    };

    _reducer(state, action) {
        switch (action.type) {
          case 'close':
            return { ...state, open: false};
          case 'open':
            return { ...state, open: true, size: action.size };
          default:
            return state;
        }
    }

    reducer(action) {
        this.setState(this._reducer(this.state, action));
    }

    handleInputChangePlat = ({ target: { name, value } }) => {
        this.setState(prev => ({
            ...prev,
            plat: {
                ...prev.plat,
                [name]: value,
            },
        }));
    };

    _getElementByID(array, id){
        return array.find(element => element.id === parseInt(id));
    }

    handleSelectChangePlat = (event) => {
        var element;
        switch (event.target.name) {
            case 'category':
                element = this._getElementByID(this.state.allCategories, event.target.options[event.target.selectedIndex].id)
                break;
            case 'menu':
                element = this._getElementByID(this.state.allMenus, event.target.options[event.target.selectedIndex].id)
                break;
            default:
                break;
        }
        this.handleInputChangePlat({
            target: { name: event.target.name , value: element },
        });
    };

    updatePlat = (idPlat) => {
        try {
            fetch('http://54.37.165.18:1337/plats/'+ idPlat , {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(this.state.plat),
            }).then(checkStatus).then(parseJSON);

            console.log(this.state.plat);

            this.props.onUpdatePlat(idPlat, this.state.plat);
        } catch (error) {
            console.log(error)
        }
        this.reducer({ type: "close" });
        this.modif = !this.modif;
        this._actionDeny = () => this.reducer({ type: "close" });
        this._actionAccept = () => this.deletePlat(this.props.plat.id);
    }

    deletePlat = (idPlat) => {
        try {
            fetch('http://54.37.165.18:1337/plats/'+ idPlat , {
                method: 'DELETE',
                headers: headers,
            });
            this.props.onDeletePlat(idPlat);
        } catch (error) {
            console.log(error)
        }
    }

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

    render() {
        let modal_content;
        if (this.state.size === "tiny") {
            var _header = "Supprimer";
            var _content = `Etes-vous sure de vouloir suprimer ${this.props.plat.nom} ?`;
            if(this.modif){
                _header = "Confirmation";
                _content = `Etes-vous sure de vouloir modifier ce plat ?`;
                this._actionDeny = () => void this.reducer({ type: 'open', size: 'large' });
                this._actionAccept = () => this.updatePlat(this.state.plat.id);
            }
            modal_content = <>
                <Modal.Header>{_header}</Modal.Header>
                <Modal.Content>
                <p>{_content}</p>
                </Modal.Content>
                <Modal.Actions>
                <Button negative onClick={this._actionDeny}>
                    <Icon name='remove' /> Non
                </Button>
                <Button positive onClick={this._actionAccept}>
                    <Icon name='checkmark' /> Oui
                </Button>
                </Modal.Actions>
            </>
        }else{
            modal_content = <>
            <Modal.Header>Modifier</Modal.Header>
            <Modal.Content image>
            <Image size='large' src={this.props.plat.image} wrapped />
            <Modal.Description>
            <Header>{this.props.plat.nom}</Header>
            <Form>
                <Form.Group widths='equal'>
                    <Form.Input
                        icon='keyboard outline'
                        iconPosition='left'
                        label='Image'
                        name='image'
                        placeholder="URL de l'image"
                        onChange={this.handleInputChangePlat}
                        value={this.state.plat.image}
                    />

                    <Form.Input
                        icon='pencil write'
                        iconPosition='left'
                        required
                        label='Nom'
                        name='nom'
                        placeholder='Nom du Plat'
                        onChange={this.handleInputChangePlat}
                        value={this.state.plat.nom}
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
                        value={this.state.plat.description}
                    />

                    <Form.Field required label='Liste des Catégories' name="category" onChange={this.handleSelectChangePlat} control='select' value={this.state.plat.category.nom}>
                        <option disabled value="">Catégories</option>
                        {this.state.allCategories.map(this.renderOptionCategories)}
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
                        value={this.state.plat.prix}
                    />

                    <Form.Field label='Listes des Menus' name="menu" onChange={this.handleSelectChangePlat} control='select' value={this.state.plat.menu.nom} >
                        <option disabled value="">Menus</option>
                        {this.state.allMenus.map(this.renderOptionMenus)}
                    </Form.Field>
                </Form.Group>
            </Form>
            </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => this.reducer({ type: "close" })}>
                <Icon name='remove' /> Annuler
                </Button>
                <Button
                content="Enregistrer"
                labelPosition='right'
                icon='checkmark'
                onClick={ () => {
                        this.modif = !this.modif;
                        this.reducer({ type: 'open', size: 'tiny' });
                        console.log(this.modif)
                    }
                }
                positive
                />
            </Modal.Actions>
            </>
        }

        return (
            <>
                <div className="grid">
                    <div className="mt-0">
                        <div className="grid__control_icons">
                            <i onClick={() => void this.reducer({ type: 'open', size: 'large' })} className="grid__icon modify inverted pencil alternate icon"></i>
                            <i onClick={() => void this.reducer({ type: 'open', size: 'tiny' })} className="grid__icon kill inverted trash alternate icon"></i>
                        </div>
                    </div>
                    <img src={this.props.plat.image} />
                    <div className="grid__body">
                        <div className="relative">
                            <h1 className="grid__title">{this.props.plat.nom}</h1>
                            <p className="grid__author">{this.props.plat.description}</p>
                        </div>
                        <div className="mt-auto" >
                            <span className="grid__tag">{this.props.plat.prix} euros</span>
                        </div>
                    </div>
                    <Modal
                        size={this.state.size}
                        open={this.state.open}
                        onClose={() => this.reducer({ type: "close" })}
                    >

                        {modal_content}

                    </Modal>
                </div>
            </>
        )
    }
}