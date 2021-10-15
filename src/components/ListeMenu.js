import React from 'react';

import { Image, List, Button, Segment, Container } from 'semantic-ui-react';
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
            /*
        <Container text>
            <Segment.Group horizontal>
                <Segment textAlign='center'><Image avatar src={this.props.menu.image} /></Segment>
                <Segment textAlign='center'>Middle</Segment>
                <Segment textAlign='center'>Right</Segment>
            </Segment.Group>
        </Container>*/
            <div class="coursemeal__div ">

                <picture class="responsive-img">
                    <img src={this.props.menu.image} alt={this.props.menu.nom} />
                </picture>

                <div class="coursemeal-info">
                    <Menu menu={this.props.menu} plats={this.props.menu.plats} />
                </div>
            </div>

        )
    }
}