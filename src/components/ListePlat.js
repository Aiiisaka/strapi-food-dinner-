import React from 'react';
import { Button, Modal, Icon } from 'semantic-ui-react';

// Parses the JSON returned by a network request
//const parseJSON = resp => (resp.json ? resp.json() : resp);

// // Checks if a network request came back fine, and throws an error if not
// const checkStatus = resp => {
//     if (resp.status >= 200 && resp.status < 300) {
//         return resp;
//     }
//     return parseJSON(resp).then(resp => {
//         throw resp;
//     });
// };

const headers = {
    'Content-Type': 'application/json',
};

export default class ListePlat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            size: undefined
        }
    }

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

    render() {
        return (
            <>
                <div className="grid">
                    <div className="mt-0">
                        <div className="grid__control_icons">
                            <i onClick={() => {}} className="grid__icon modify inverted pencil alternate icon"></i>
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
                        <Modal.Header>Supprimer</Modal.Header>
                        <Modal.Content>
                        <p>Etes-vous sure de vouloir suprimer {this.props.plat.nom} ?</p>
                        </Modal.Content>
                        <Modal.Actions>
                        <Button negative onClick={() => this.reducer({ type: "close" })}>
                            <Icon name='remove' /> Non
                        </Button>
                        <Button positive onClick={() => this.deletePlat(this.props.plat.id)}>
                            <Icon name='checkmark' /> Oui
                        </Button>
                        </Modal.Actions>
                    </Modal>
                </div>
            </>
        )
    }
}