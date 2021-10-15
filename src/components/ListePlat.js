import React from 'react';

import { Card, Icon, Image } from 'semantic-ui-react'

export default class ListePlat extends React.Component {
    render() {
        return (
            <>
                <Card centered itemsPerRow={4}>
                    <Image src={this.props.plat.image} wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>{this.props.plat.nom}</Card.Header>
                        <Card.Description>
                            {this.props.plat.description}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                            <Icon name='eur' />
                            {this.props.plat.prix} euros
                    </Card.Content>
                </Card>
            </>
        )
    }
}