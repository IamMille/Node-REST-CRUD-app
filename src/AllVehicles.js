import React, {Component} from 'react';

export default class AllVehicles extends Component {
  render() {
    return (
      <section className={"all-vehicles"}>
        {console.log(this.props.data)}
        <h1 className={"section-heading"}>Alla fordon</h1>
        <p>filter här kommer här</p>
        <div className={"vehicle-search-head"}>
          <span>Bild</span>
          <span>Märke</span>
          <span>Modell</span>
          <span>Typ</span>
          <span>Dygnspris</span>
        </div>
        <ul>
          {this.props.data.map((vehicle, index) => {
            console.log(vehicle);
            return (
              <li key={index} data-id={vehicle._id}>
                <div className={"image-container"}>
                  <img src={vehicle.imgLink || "http://via.placeholder.com/150x150"} alt="" width="150"/>
                </div>
                <span>{vehicle.brand}</span> <span>{vehicle.model}</span>
                <span>{vehicle.type}</span> <span className={"price"}>{vehicle.price}:-</span>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}
//bild, brand, model, (typ av bil), pris

//hämta med fetch i lokal json-fil

