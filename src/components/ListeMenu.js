import React from 'react';

import { Image, List, Button } from 'semantic-ui-react';
import Menu from './Menu';

export default class ListeMenu extends React.Component {
    render() {
        return (/*
            <>
                <List.Item>
                    <Image avatar src={this.props.menu.image} />
                    <List.Content>
                        <List.Header as='a'>{this.props.menu.nom}</List.Header>
                    </List.Content>
                </List.Item>
                
            </>*/
            <List.Item>
                    <Image avatar size='small' src='https://react.semantic-ui.com/images/avatar/small/helen.jpg' />
                    <List.Content>
                        <List.Header>Snickerdoodle</List.Header>
                        An excellent companion
                    </List.Content>
                    <Button floated='right'></Button>
                </List.Item>
                /*
            <Container text>
                <Segment.Group horizontal>
                    <Segment textAlign='center'><Image avatar src={this.props.menu.image} /></Segment>
                    <Segment textAlign='center'>Middle</Segment>
                    <Segment textAlign='center'>Right</Segment>
                </Segment.Group>
            </Container>*/

        )
    }
}