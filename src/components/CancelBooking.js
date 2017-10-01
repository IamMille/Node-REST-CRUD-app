import React, {Component} from 'react';

export default class CancelBooking extends Component {
  render() {
    return (
      <section className={"cancel-booking"}>
        <h1 className={"section-heading"}>Avboka</h1>
        <form action="">
          <div className="form-group-container-full">
            <label htmlFor="booking-id">Boknings-id</label>
            <input type="text" placeholder="09g74857gjh45" id="booking-id"/>
            <button className={"button"}>Avboka</button>
          </div>
        </form>
      </section>
    );
  }
}

