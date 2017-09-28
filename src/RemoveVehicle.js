import React, {Component} from 'react';

export default class RemoveVehicle extends Component {
  render() {
    return (
      <div>
        <p>Remove vehicle</p>
        <form action="">
          <label htmlFor="vehicle-id">Fordons-id</label>
          <input type="text" placeholder="09g74857gjh45" id="vehicle-id"/>
        </form>
      </div>
    );
  }
}

