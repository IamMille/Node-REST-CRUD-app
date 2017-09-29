import React, {Component} from 'react';

export default class EditVehicle extends Component {
  render() {
    return (
      <section className={"edit-vehicle"}>
        <h1 className={"section-heading"}>Redigera fordon</h1>
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
            {/*<input type="text" placeholder="B" id="type-of-license"/>*/}
            <select>
              <option value="a">A</option>
              <option value="a1">A1</option>
              <option value="a2">A2</option>
              <option value="am">AM</option>
              <option value="b">B</option>
              <option value="be">BE</option>
              <option value="c">C</option>
              <option value="ce">CE</option>
              <option value="c1">C1</option>
              <option value="c1e">C1E</option>
              <option value="d">D</option>
              <option value="d1">D1E</option>
              <option value="extended-b">Utökad B</option>
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
            {/*<input type="text" placeholder="Manuell" id="gearbox"/>*/}
            <select>
              <option value="manual">Manuell</option>
              <option value="automatic">Automat</option>
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
            <label htmlFor="notes" className={"block"}>Noteringar</label>
            <textarea name="notes" id="notes" placeholder={"Bilen är nästan trasig."}></textarea>
          </div>
          <div className="form-group-container-full">
            <label htmlFor="available-for-rent">Tillgänglig för uthyrning:</label>
            <label htmlFor="available-for-rent-true">Ja</label>
            <input type="radio" id="available-for-rent-true" name="hire"/>
            <label htmlFor="available-for-rent-false">Nej</label>
            <input type="radio" id="available-for-rent-false" name="hire"/>
          </div>
          <div className="form-group-container-full">
            <button className={"button"}>Redigera</button>
          </div>
        </form>
      </section>
    );
  }
}

//gearbox till dropdown
