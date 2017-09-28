import React, {Component} from 'react';

export default class BookVehicle extends Component {
  render() {
    return (
      <section className={"book-vehicle"}>
        {console.log(this.props.data)}
        <img src="http://via.placeholder.com/150x150" alt="bild"/>
        <p>Fordonstyp: {this.props.data.type}</p>
        <p>Körkort: {this.props.data.license}</p>
        <p>Märke: {this.props.data.brand}</p>
        <p>Modell: {this.props.data.model}</p>
        <p>År: {this.props.data.year}</p>
        <p>Växellåda: {this.props.data.gearbox}</p>
        <p>Dagshyra: {this.props.data.price}</p>
        <p>Anteckningar: {this.props.data.notes}</p>
        <p>test: {this.props.data.typeasda || 'Unknown'}</p>
        <button className={"button"}>Boka</button>
      </section>
    );
  }
}

