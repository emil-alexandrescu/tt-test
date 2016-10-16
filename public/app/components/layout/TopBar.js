// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { AppBar, Navigation, Link, IconButton } from 'react-toolbox';
import { LinkContainer } from 'react-router-bootstrap';

import LayoutStore from '../../stores/Layout';
import CurrentUserStore from '../../stores/CurrentUser';

@observer
export default class TopBar extends Component {
  render() {
    return (
      <AppBar>
        <IconButton icon="menu" inverse onClick={LayoutStore.toggleDrawerActive} />
        <span>{CurrentUserStore.isLoggedIn ? `${CurrentUserStore.email} (${CurrentUserStore.role})` : null}</span>
        {
          CurrentUserStore.isLoggedIn ?
          (
            <Navigation type="horizontal">
              <Link label="Log out" onClick={CurrentUserStore.signout} />
            </Navigation>
          ) :
          (
            <Navigation type="horizontal">
              <LinkContainer to="/login">
                <Link label="Log In" />
              </LinkContainer>
              <LinkContainer to="/signup">
                <Link label="Sign up" />
              </LinkContainer>
            </Navigation>
          )
        }
      </AppBar>
    );
  }
}
