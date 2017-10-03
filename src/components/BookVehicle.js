import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class BookVehicle extends Component {
    render() {
        if (this.props.if) {
            console.log('hi')
            return (
                <section className="book-vehicle" onClick={this.props.closeBookModal}>
                    <div className="book-vehicle-container">
                        {console.log(this.props.data)}
                        <div className="image-container-book">
                            <img src={this.props.data[0].image || "http://via.placeholder.com/150x150"} alt="bild"/>
                        </div>
                        <div className="list-container">
                            <ul>
                                <li>{this.props.data[0].brand || 'Information saknas.'}</li>
                                <li>{this.props.data[0].model || 'Information saknas.'}</li>
                                <li>Årsmodell: {this.props.data[0].year || 'Information saknas.'}</li>
                                <li>Fordonstyp: {this.props.data[0].type || 'Information saknas.'}</li>
                                <li>Körkortkrav: {this.props.data[0].license || 'Information saknas.'}</li>
                                <li>Växellåda: {this.props.data[0].gearbox || 'Information saknas.'}</li>
                                <li>Dagshyra: {this.props.data[0].price || 'Information saknas.'}</li>
                                <li>Anteckningar: {this.props.data[0].notes || 'Inga anmärkningar.'}</li>
                                <li>datepicker här sen</li>
                            </ul>
                        </div>
                        <div className="button-container">
                            <button className="button">Boka</button>
                            <button className="button" onClick={this.props.closeBookModal}>Stäng</button>
                        </div>
                    </div>
                </section>
            );
        } else {
            return null;
        }
    }
}

BookVehicle.propTypes = {
    closeBookModal: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
};

