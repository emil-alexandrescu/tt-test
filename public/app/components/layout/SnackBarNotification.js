import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Snackbar } from 'react-toolbox';
import NotificationStore from '../../stores/Notification';

@observer
export default class SnackBarNotification extends Component {
  render() {
    return (<Snackbar
      type={NotificationStore.type}
      label={NotificationStore.message}
      active={NotificationStore.active}
      timeout={3000}
      onTimeout={NotificationStore.hideNotification}
      onClick={NotificationStore.hideNotification}
    />);
  }
}
