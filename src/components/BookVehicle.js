import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DayPicker, {DateUtils} from 'react-day-picker';

import 'react-day-picker/lib/style.css';


export default class BookVehicle extends Component
{
    state = {
        selectedDays: [],
    };

    handleDayClick = (day, { selected }) => {
        const { selectedDays } = this.state;

        if (selected) { // deselect
            const selectedIndex = selectedDays.findIndex(selectedDay =>
                DateUtils.isSameDay(selectedDay, day)
            );
            selectedDays.splice(selectedIndex, 1);

        } else {
            // /select
            selectedDays.push(day);
        }
        this.setState({ selectedDays });
    };

    isCohesiveDate = (day) => {
        return Boolean(this.selectedDays.filter(d =>
            DateUtils.isDayAfter(day, d) || DateUtils.isDayBefore(day, d)
        ));
    };

    handleSubmit = () => {

    };

    render() {
        if (!this.props.data.length) return null;
        return <section className="book-vehicle" onClick={this.props.closeBookModal}>

            <div className="book-vehicle-container">
                {console.log(this.props.data)}

                <div className="image-container-book">
                    {/*<img src={this.props.data[0].image || "http://via.placeholder.com/150x150"} alt="bild"/>*/}
                    <DayPicker
                        selectedDays={this.state.selectedDays}
                        onDayClick={this.handleDayClick}
                    />
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
                    <button className="button" onClick={this.handelSubmit}>Boka</button>
                    <button className="button" onClick={this.props.closeBookModal}>Stäng</button>
                </div>
            </div>
        </section>;
    }
}

BookVehicle.propTypes = {
    data: PropTypes.array.isRequired,
};

