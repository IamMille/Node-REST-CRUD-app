import React, {Component} from 'react';

export default class RemoveVehicle extends Component {
  render() {
    return (
      <section className={"remove-vehicle"}>
        <h1 className={"section-heading"}>Ta bort fordon</h1>
        <form action="">
          <div className="form-group-container-full">
            <label htmlFor="vehicle-id">Fordons-id</label>
            <input type="text" placeholder="09g74857gjh45" id="vehicle-id"/>
            <button className={"button"}>Ta bort</button>
          </div>
        </form>
      </section>
    );
  }
}

