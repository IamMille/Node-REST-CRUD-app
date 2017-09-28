import React, {Component} from 'react';

export default class EditVehicle extends Component {
  render() {
    return (
      <div>
        <p>EditVehicle, skall också ha formulär, kunna blockera osv</p>
        <form action="">
          <label htmlFor="vehicle-type">Fordonstyp</label>
          <input type="text" placeholder="Personbil" id="vehicle-type"/>
          <label htmlFor="type-of-license">Körkort</label>
          <input type="text" placeholder="B" id="type-of-license"/>
          <label htmlFor="brand">Märke</label>
          <input type="text" placeholder="Mazda" id="brand"/>
          <label htmlFor="model">Modell</label>
          <input type="text" placeholder="321i" id="model"/>
          <label htmlFor="year">År</label>
          <input type="text" placeholder="1995" id="year"/>
          <label htmlFor="gearbox">Växellåda</label>
          <input type="text" placeholder="Manuell" id="gearbox"/>
          <label htmlFor="price-per-day">Dagshyra</label>
          <input type="text" placeholder="999" id="price-per-day"/>
          <label htmlFor="image-link">Bildlänk</label>
          <input type="text" placeholder="http://url.se" id="image-link"/>
          <label htmlFor="available-for-rent">Tillgänglig för uthyrning:</label>
          <label htmlFor="available-for-rent-true">Ja</label>
          <input type="radio" id="available-for-rent-true" name="hire"/>
          <label htmlFor="available-for-rent-true">Nej</label>
          <input type="radio" id="available-for-rent-false" name="hire"/>
        </form>
      </div>
    );
  }
}

//gearbox till dropdown
