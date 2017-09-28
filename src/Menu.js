import React, {Component} from 'react';

export default class Menu extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li><a href="#show" onClick={this.props.checkUrl}>Visa alla fordon</a></li>
          <li><a href="#cancel" onClick={this.props.checkUrl}>Avboka</a></li>
          {this.props.admin &&
          <div>
            <li><a href="#add" onClick={this.props.checkUrl}>Lägg till fordon</a></li>
            <li><a href="#remove" onClick={this.props.checkUrl}>Ta bort fordon</a></li>
            <li><a href="#edit" onClick={this.props.checkUrl}>Redigera fordon</a></li>
          </div>
          }
          <li><a onClick={this.props.handleLogin}>{this.props.admin ? 'Logga ut': 'Logga in'}</a></li>
        </ul>
      </nav>
    );
  }
}

