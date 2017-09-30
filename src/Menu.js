import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Menu extends Component {
  render() {
    return (
      <nav className="menu">
        <div className="menu-container">
          <ul className="menu-ul">
            <li className="menu-li"><a href="#show" onClick={this.props.checkUrl}>Boka</a></li>
            <li className="menu-li"><a href="#cancel" onClick={this.props.checkUrl}>Avboka</a></li>
          </ul>
          {this.props.admin &&
          <ul className="menu-ul">
            <li className="menu-li"><a href="#add" onClick={this.props.checkUrl}>Lägg till fordon</a></li>
            <li className="menu-li"><a href="#edit" onClick={this.props.checkUrl}>Redigera fordon</a></li>
          </ul>
          }
          <a className="log-in" onClick={this.props.handleLogin}>{this.props.admin ? 'Logga ut' : 'Logga in'}</a>
        </div>
      </nav>
    );
  }
}

Menu.propTypes = {
  checkUrl: PropTypes.func.isRequired,
  admin: PropTypes.bool.isRequired,
  handleLogin: PropTypes.func.isRequired
};

