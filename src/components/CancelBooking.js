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
        console.log("handle submit:", this.state.bookingId);

        fetch( config.apiRoot + "booking/delete/" + this.state.bookingId )
            .then(resp => resp.json())
            .then(json => {
                console.log("API response:", json);
                this.setState({
                    statusMessage: json.message,
                    bookingId: ''
                });
                this.props.handleSuccessMessage(json);
            })
            .catch(error => {
                console.warn("API error:", error);
                this.setState({ statusMessage: error.name });
                this.props.handleErrorMessage(error.message);
            });

        console.log("bookVehicle did mount");
    };

    render() {
      if (this.props.if) {
          return <section className="cancel-booking">
              <h1 className="section-heading">Avboka</h1>
              <form action="">
                  <div className="form-group-container-full">
                      <label htmlFor="bookingId">Ange ditt booknings ID nedan för att avboka</label>
                      <input type="text" placeholder="09g74857gjh45" id="bookingId"
                             onChange={this.handleChange}
                             value={this.state.bookingId}
                      />
                      <button type="button" className="button" onClick={this.handleSubmit}>Avboka</button>
                  </div>
              </form>
          </section>;
      } else {
          return null;
      }
    }
}