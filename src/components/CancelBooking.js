import React, {Component} from 'react';
import config from '../config.json';

export default class CancelBooking extends Component
{
    state = {
        statusMessage: '',
        bookingId: ''
    };

    handleChange = (event) => {
        const {id, value} = event.target;
        this.setState({ [id]: value });
        console.log("handle change");
    };

    handleSubmit = () => {
        const {bookingId} = this.state;

        if (!bookingId) return this.props.handleErrorMessage("Ange ditt boknings ID först!");

        fetch( config.apiRoot + "booking/delete/" + bookingId )
            .then(resp => resp.json())
            .then(json =>
            {
                console.log("API response:", json);

                if (json.error === "Not found")
                    json.message = "Bokning med angivet ID kunde ej hittas!";

                if (json.error === "Invalid ID")
                    json.message = "Ogiltigt ID angivet";

                if (json.result === "ok") {
                    let dateFrom = new Date(json.data.dateFrom).toISOString().substr(0,10);
                    let dateTill = new Date(json.data.dateTill).toISOString().substr(0,10);
                    let displayDate = ( dateFrom === dateTill ? dateFrom : dateFrom +"→"+ dateTill );

                    json.message = "Avbokning genomförd: " + displayDate;
                    //close modal
                }

                this.setState({ bookingId: '' });
                this.props.setState({ cancelBooking: false });
                this.props.handleSuccessMessage(json);
            })
            .catch(error =>
            {
                console.warn("API error:", error);
                this.props.handleErrorMessage(error.message);
            });

        console.log("bookVehicle did mount");
    };

    render() {
      if (this.props.if) {
          return <section className="cancel-booking" onClick={this.props.handleCancelBookingModal}>
              <div className="cancel-booking-container">
              <h1 className="section-heading">Avboka</h1>
              <form action="">
                  <div className="form-group-container-full">
                      <label htmlFor="bookingId">Ange ditt booknings ID nedan för att avboka</label>
                      <input type="text" placeholder="09g74857gjh45" id="bookingId"
                             onChange={this.handleChange}
                             value={this.state.bookingId}
                      />
                      <div className="button-container">
                          <div className="form-group-container-full">
                              <button type="button" className="button" onClick={this.handleSubmit}>Avboka</button>
                          </div>
                          <div className="form-group-container-full">
                              <button className="button button-danger" type="button" onClick={this.props.handleCancelBookingModal}>Stäng</button>
                          </div>
                      </div>
                  </div>
              </form>
              </div>
          </section>;
      } else {
          return null;
      }
    }
}