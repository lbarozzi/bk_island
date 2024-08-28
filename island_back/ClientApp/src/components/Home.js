import React, { Component } from 'react';
import { ActivityList } from './ActivityList'

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
        <div>
            <ActivityList/>

      </div>
    );
  }
}
