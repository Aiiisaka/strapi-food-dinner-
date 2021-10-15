import React from 'react';

import Navigation from './components/Navigation.js';
import AddMenusPlats from './components/AddMenusPlats.js';
import Liste from './components/Liste.js';
import StrapiFood from './components/StrapiFood.js';

import { Message } from 'semantic-ui-react'

import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default class App extends React.Component {
  state = {
    allPlats: [],
    allMenus: [],
    error: null, 
  };

  componentDidMount = async () => {
    const parseJSON = resp => (resp.json ? resp.json() : resp);

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

    try {
      const allPlats = await fetch('http://54.37.165.18:1337/plats', {
        method: 'GET',
        headers: headers,
      }).then(checkStatus).then(parseJSON);
      this.setState({ allPlats });
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

  render() {
    const { error, allPlats, allMenus } = this.state;

    // Print errors if any
    if (error) {
      return <Message negative>
        <Message.Header>We're sorry we can't add this data.</Message.Header>
        <p>{error.message}</p>
      </Message>;
    }

    return (
      <>
        <BrowserRouter>
          < Navigation />
          <Switch>
            < Route path="/strapi-food" component={StrapiFood} />
            < Route path="/add" component={AddMenusPlats} />
            < Route path="/:filter?" render={(props) => < Liste {...props} plats={allPlats} menus={allMenus} platsMenus={allMenus.plats} />} />
            < Route path="" component={Liste} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}