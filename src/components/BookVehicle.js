import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class BookVehicle extends Component {
  render() {
    return (
      <section className={"book-vehicle"}>
        <div className="book-vehicle-container">
          {console.log(this.props.data)}
          <img src="http://via.placeholder.com/150x150" alt="bild"/>
          <p>Märke: {this.props.data[0].brand}</p>
          <p>Modell: {this.props.data[0].model}</p>
          <p>År: {this.props.data[0].year}</p>
          <p>Fordonstyp: {this.props.data[0].type}</p>
          <p>Körkort: {this.props.data[0].license}</p>
          <p>Växellåda: {this.props.data[0].gearbox}</p>
          <p>Dagshyra: {this.props.data[0].price}</p>
          <p>Anteckningar: {this.props.data[0].notes}</p>
          <p>test: {this.props.data[0].typeasda || 'Unknown'}</p>
          <button className={"button"}>Boka</button>
          <p onClick={this.props.closeModal}>close</p>
        </div>
      </section>
    );
  }
}

BookVehicle.propTypes = {
  closeModal: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired
};

