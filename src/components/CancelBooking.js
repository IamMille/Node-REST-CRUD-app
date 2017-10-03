import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class CancelBooking extends Component {
  render() {
    if (this.props.if) {
      return (
        <section className="cancel-booking">
          <h1 className="section-heading">Avboka</h1>
          <form action="">
            <div className="form-group-container-full">
              <label htmlFor="booking-id">Ange ditt booknings ID nedan för att avboka</label>
              <input type="text" placeholder="09g74857gjh45" id="booking-id"/>
              <button type="button" className="button">Avboka</button>
            </div>
          </form>
        </section>
      );
    } else {
      return null;
    }
  }
}

CancelBooking.propTypes = {
  if: PropTypes.bool.isRequired
};

