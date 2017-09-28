import React, {Component} from 'react';

export default class CancelBooking extends Component {
  render() {
    return (
      <div>
        <p>CancelBooking</p>
        <form action="">
          <label htmlFor="booking-id">Boknings-id</label>
          <input type="text" placeholder="09g74857gjh45" id="booking-id"/>
        </form>
      </div>
    );
  }
}

