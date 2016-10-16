import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Layout, Panel, NavDrawer, Navigation, Link } from 'react-toolbox';
import { LinkContainer } from 'react-router-bootstrap';

import TopBar from './TopBar';
import SnackBarNotification from './SnackBarNotification';
import LayoutStore from '../../stores/Layout';
import CurrentUserStore from '../../stores/CurrentUser';

@observer
export default class MainLayout extends Component {
  render() {
    return (
      <Layout>
        {
          CurrentUserStore.isLoggedIn ?
          (<NavDrawer
            active={LayoutStore.drawerActive}
            pinned={LayoutStore.drawerPinned}
            permanentAt="xl"
            onOverlayClick={LayoutStore.toggleDrawerActive}
          >
            <Navigation type="vertical">
              <LinkContainer to="/expenses">
                <Link label="List Expenses" />
              </LinkContainer>
              <LinkContainer to="/expenses/create">
                <Link label="Add Expense" />
              </LinkContainer>
              <LinkContainer to="/expenses-report">
                <Link label="Weekly Report" />
              </LinkContainer>
              {
                (CurrentUserStore.role !== 'USER') ?
                [(<LinkContainer to="/users">
                  <Link label="List Users" />
                </LinkContainer>), (<LinkContainer to="/users/create">
                  <Link label="Add Users" />
                </LinkContainer>)] :
                null
              }
              <LinkContainer to={`/users/${CurrentUserStore.id}`}>
                <Link label="Manage Profile" />
              </LinkContainer>
            </Navigation>
          </NavDrawer>) : []
        }
        <Panel>
          <TopBar />
          <SnackBarNotification />
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
            {this.props.children}
          </div>
        </Panel>
      </Layout>
    );
  }
}
