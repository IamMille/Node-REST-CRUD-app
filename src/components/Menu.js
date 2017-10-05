import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Menu extends Component {
  render() {
    return (
      <nav className="menu">
        <div className="menu-container">

          {!this.props.admin &&
            <ul className="menu-ul">
              <li className="menu-li"><a href="#vehicles" onClick={this.props.checkUrl}>Boka</a></li>
              <li className="menu-li"><a onClick={this.props.handleCancelBookingModal}>Avboka</a></li>
            </ul>
          }

          {this.props.admin &&
            <ul className="menu-ul">
              <li className="menu-li"><a href="#vehicles" onClick={this.props.checkUrl}>Visa fordon</a></li>
              <li className="menu-li"><a onClick={this.props.handleAddVehicleModal}>Lägg till fordon</a></li>
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

