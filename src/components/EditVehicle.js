import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class EditVehicle extends Component {
  render() {
    if (this.props.if) {
      return (
        <section className="edit-vehicle">
          <h1 className="section-heading">Redigera fordon</h1>
          <p>OBS! MYCKET AV DENNA HTML ÄR FIXAD/ÄNDRAD I COMPONENTEN [AddVehicles]</p>
          <form action="">
            <div className="form-group-container">
              <label htmlFor="vehicle-id">Fordons-id</label>
              <input type="text" placeholder="098regd774r5" id="vehicle-id"/>
            </div>
            <div className="form-group-container">
              <label htmlFor="vehicle-type">Fordonstyp</label>
              <input type="text" placeholder="Personbil" id="vehicle-type"/>
            </div>
            <div className="form-group-container">
              <label htmlFor="type-of-license">Körkort</label>
              <select>
                <option value="A">A</option>
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="AM">AM</option>
                <option value="B">B</option>
                <option value="BE">BE</option>
                <option value="C">C</option>
                <option value="CE">CE</option>
                <option value="C1">C1</option>
                <option value="C1E">C1E</option>
                <option value="D">D</option>
                <option value="D1E">D1E</option>
              </select>
            </div>
            <div className="form-group-container">
              <label htmlFor="brand">Märke</label>
              <input type="text" placeholder="Mazda" id="brand"/>
            </div>
            <div className="form-group-container">
              <label htmlFor="model">Modell</label>
              <input type="text" placeholder="321i" id="model"/>
            </div>
            <div className="form-group-container">
              <label htmlFor="year">År</label>
              <input type="text" placeholder="1995" id="year"/>
            </div>
            <div className="form-group-container">
              <label htmlFor="gearbox">Växellåda</label>
              <select>
                <option value="manuell">Manuell</option>
                <option value="automat">Automat</option>
              </select>
            </div>
            <div className="form-group-container">
              <label htmlFor="price-per-day">Dagshyra</label>
              <input type="text" placeholder="999" id="price-per-day"/>
            </div>
            <div className="form-group-container-full">
              <label htmlFor="image-link">Bildlänk</label>
              <input type="text" placeholder="http://url.se" id="image-link"/>
            </div>
            <div className="form-group-container-full">
              <label htmlFor="notes" className="block">Noteringar</label>
              <textarea name="notes" id="notes" placeholder="Bilen är nästan trasig." />
            </div>
            <div className="form-group-container-full">
              <label htmlFor="available-for-rent">Tillgänglig för uthyrning:</label>
              <label htmlFor="available-for-rent-true">Ja</label>
              <input type="radio" id="available-for-rent-true" name="hire"/>
              <label htmlFor="available-for-rent-false">Nej</label>
              <input type="radio" id="available-for-rent-false" name="hire"/>
            </div>
            <div className="form-group-container-full">
              <button className="button">Redigera</button>
            </div>
            <div className="form-group-container-full">
              <button className="button button-danger">Ta bort fordon</button>
            </div>
          </form>
        </section>
      );
    } else {
      return null;
    }
  }
}

EditVehicle.propTypes = {
  if: PropTypes.bool.isRequired
};
