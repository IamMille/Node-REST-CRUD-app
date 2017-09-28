import React, {Component} from 'react';

export default class AllVehicles extends Component {
  render() {
    return (
      <div>
        {console.log(this.props.data)}
        <p>Allvehicles</p>
        <p>filter här</p>
        <ul>
          {this.props.data.map((vehicle, index) => {
            console.log(vehicle)
            return (
              <li key={index} data-id={"<--TODO-->"}>
                <img src={vehicle.imgLink || "http://via.placeholder.com/150x150"} alt="" width="100"/>
                {vehicle.brand} {vehicle.model} {vehicle.type} {vehicle.price} kr
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
//bild, brand, model, (typ av bil), pris

//hämta med fetch i lokal json-fil

