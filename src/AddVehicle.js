import React, {Component} from 'react';

export default class AddVehicle extends Component {
  render() {
    return (
      <div>
        <p>Add vehicle</p>
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
        </form>
      </div>
    );
  }
}

