import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DayPicker, {DateUtils} from 'react-day-picker';
import config from '../config.json';

import 'react-day-picker/lib/style.css';


export default class BookVehicle extends Component
{
    state = {
        statusMessage: '',
        calendarMessage: '',
        isBookingComplate: false,
        selectedDays: [],
        disabledDays: [],
    };

    componentDidMount() {
        console.log("bookVehicle did mount");
        const [selectedVehicle] = this.props.data;

        fetch(config.apiRoot + "booking/read?vehicleId=" + selectedVehicle._id)
            .then(resp => resp.json())
            .then(json => {
                let disabledDays = [];

                disabledDays.push({ before: new Date() }); // disable days in the past

                json.data.forEach(booking => {
                    disabledDays.push({
                        after: new Date(booking.dateFrom).addDays(-1),
                        before: new Date(booking.dateTill).addDays(1)
                    })
                });

                this.setState({ disabledDays })
            })
            .catch(error => {
                console.warn("API error:", error);
            });
        //console.log("bookVehicle did mount");

    }

    handleDayClick = (day, { selected, disabled }) =>
    {
        const {selectedDays, isBookingComplate} = this.state;

        if (isBookingComplate)
            this.setState({ calendarMessage: 'Du kan ej längre ändra datum' });

        else if (selected) {
            const selectedIndex = selectedDays.findIndex(selectedDay =>
                DateUtils.isSameDay(selectedDay, day)
            );
            selectedDays.splice(selectedIndex, 1);
            this.setState({ calendarMessage: '' }); // dag bortvald
        }
        else {
            if (disabled)
                this.setState({ calendarMessage: 'Ej tillgänglig dag' });

            else if (selectedDays.length > 0 && !this.isCohesiveDate(day))
                this.setState({ calendarMessage: 'Välj en sammanhängande dag' });

            else {
                selectedDays.push(day);
                this.setState({ calendarMessage: '' }); // dag vald
            }
        }

        this.setState({selectedDays});
    };

    isCohesiveDate = (day) => {
        let dayAfter = day.addDays(1);
        let dayBefore = day.addDays(-1);

        return Boolean(this.state.selectedDays.filter(d =>
            DateUtils.isSameDay(d, dayAfter) || DateUtils.isSameDay(d, dayBefore)
        ).length);
    };

    serializeUpdateObject = (obj) => {
        return Object.keys(obj).map(prop => {
            if (prop === '_id') return false;
            else return encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop])
        }).join('&')
    };

    handleSubmit = () => {
        const {selectedDays} = this.state;

        let createBooking = {
            dateFrom: new Date(Math.min.apply(null, selectedDays)),
            dateTill: new Date(Math.max.apply(null, selectedDays)),
            vehicleId: this.props.data[0]._id,
        };

        fetch( config.apiRoot + "booking/create/?" + this.serializeUpdateObject(createBooking) )
            .then(resp => resp.json())
            .then(json =>
            {
                console.log("API response:", json);
                this.props.handleSuccessMessage(json);

                this.setState({
                    statusMessage: json.message,
                    isBookingComplate: json.data._id,
                    calendarMessage: ''
                });
            })
            .catch(error =>
            {
                console.warn("API error:", error);
                this.props.handleErrorMessage(error.name);

                this.setState({ calendarMessage: '' });
            });
    };

    render() {
        if (!this.props.data.length) return null;
        return <section className="book-vehicle" onClick={this.props.closeBookModal}>

            <div className="book-vehicle-container">

                <div className="image-container-book">
                    <img src={this.props.data[0].image || "https://loslonelyboysmovie.com/wp-content/uploads/2017/06/1644c9b3a6faa81a6b9ad3c39ea80858-300x164.jpg"} alt="bild"/>
                </div>

                <div className="list-container">
                    <ul>
                        <li>{this.props.data[0].brand || 'Information saknas.'}</li>
                        <li>{this.props.data[0].model || 'Information saknas.'}</li>
                        <li>Årsmodell: {this.props.data[0].year || 'Information saknas.'}</li>
                        <li>Fordonstyp: {this.props.data[0].type || 'Information saknas.'}</li>
                        <li>Körkortkrav: {this.props.data[0].license || 'Information saknas.'}</li>
                        <li>Växellåda: {this.props.data[0].gearbox || 'Information saknas.'}</li>
                        <li>Drivmedel: {this.props.data[0].fuel || 'Information saknas.'}</li>
                        <li>Dagshyra: {this.props.data[0].price + ':-' || 'Information saknas.'}</li>
                        <li>Anteckningar: {this.props.data[0].note || 'Inga anmärkningar.'}</li>
                    </ul>
                </div>

                <div className="calendar-container">
                    <DayPicker
                        selectedDays={this.state.selectedDays}
                        disabledDays={this.state.disabledDays}
                        onDayClick={this.handleDayClick}
                    />
                    <p className="calendar-text">{this.state.calendarMessage}&nbsp;</p>
                </div>


                <div className="button-container">
                    {
                        ! this.state.isBookingComplate
                        ? <button className="button" type="button" onClick={this.handleSubmit}>Boka</button>
                        : <center>
                            <p>Fordonet har bokats! Boknings ID: {this.state.isBookingComplate}</p>
                            <p>Spara ditt boknings ID för ev. avbokning.</p>
                        </center>
                    }
                    <button className="button button-close" type="button" onClick={this.props.closeBookModal}>Stäng</button>
                </div>

            </div>
        </section>;
    }
}

// eslint-disable-next-line
Date.prototype.addDays = function(days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

BookVehicle.propTypes = {
    data: PropTypes.array.isRequired,
};

