import React, {Component} from 'react';
import AllVehicles from "./components/AllVehicles";
import CancelBooking from "./components/CancelBooking";
import AddVehicle from "./components/AddVehicle";
import EditVehicle from "./components/EditVehicle";
import Menu from "./components/Menu";
import BookVehicle from "./components/BookVehicle";
import Render from './components/Render';
import './App.css';
import config from './config.json';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: false,
            location: '',
            bookVehicle: false,
            editVehicle: false,
            vehicleData: [],
            database: [],
            finished: false,
            dataIsFinished: false
        }
    }

    componentDidMount() {
        fetch(config.apiRoot + "vehicle/read?")
            .then(resp => resp.json())
            .then(json => {
                this.setState({
                    database: json.data,
                    finished: true
                })
            })
            .catch(error => {
                console.error("API error:", error);
            });

        if (window.location.hash === '')
            window.location.hash = "#vehicles";

        this.checkUrl();
        window.addEventListener("hashchange", () => {
            this.checkUrl()
        });
    }

    checkUrl() {
        const currentLocation = window.location.hash.replace('#', '');
        this.setState({
            location: currentLocation
        })
    }

    handleLogin() {
        this.setState({
            admin: !this.state.admin
        })
    }

    vehicleBooking(event) {
        //för att se till att oavsett vad vi klickar på i listan så är event.target alltid ett li element
        let target = event.target;
        if (target.localName === 'span' || target.localName === 'div') {
            target = target.parentElement;
        } else if (target.localName === 'img') {
            target = target.parentElement.parentElement;
        }

        //kom ihåg att lägga till && vehicle.bookable så att vi inte listar fordon som ej är tillgängliga för uthyrning
        const clonedArray = JSON.parse(JSON.stringify(this.state.database));
        const clickedVehicleId = target.getAttribute('data-id');
        const clickedVehicle = clonedArray.filter(vehicle => vehicle._id.indexOf(clickedVehicleId) > -1);
        console.log(clickedVehicle);
        this.setState({
            vehicleData: clickedVehicle,
            bookVehicle: true
        })
    };

    handleBookModal(event) {
        const target = event.target;
        if (target.localName === 'section' || target.innerText === 'Stäng') {
            this.setState({
                bookVehicle: !this.state.bookVehicle
            })
        }
    }

    handleEditModal(event) {
        const target = event.target;
        if (target.localName === 'section' || target.innerText === 'Stäng') {
            this.setState({
                editVehicle: !this.state.editVehicle
            })
        }
    }

    editVehicle(event) {
        console.log('editvehicle')
        this.setState({
            dataIsFinished: false
        });
        let target = event.target;
        if (target.localName === 'span' || target.localName === 'div') {
            target = target.parentElement;
        } else if (target.localName === 'img') {
            target = target.parentElement.parentElement;
        }
        const carId = target.getAttribute('data-id');
        const clonedArray = JSON.parse(JSON.stringify(this.state.database));
        const findCarInDatabase = clonedArray.filter(vehicle => vehicle._id.indexOf(carId) > -1);
        console.log(findCarInDatabase);
        this.setState({
            vehicleData: findCarInDatabase,
            editVehicle: true
        }, () => {
            console.log('new state')
            this.setState({
                dataIsFinished: true
            })
        })
    }


    render() {
        return (
            <div className={this.state.bookVehicle || this.state.editVehicle ? 'no-scroll App' : 'App'}>

                <Menu
                    admin={this.state.admin}
                    checkUrl={this.checkUrl.bind(this)}
                    handleLogin={this.handleLogin.bind(this)}
                />

                <Render if={this.state.location === 'vehicles'}>
                    <AllVehicles
                        isAdmin={this.state.admin}
                        handleClick={this.state.admin ? this.editVehicle.bind(this) : this.vehicleBooking.bind(this)}
                        data={this.state.database}
                    />
                </Render>

                <CancelBooking
                    if={this.state.location === 'cancel'}
                />

                <Render if={this.state.location === 'add' && this.state.admin}>
                    <AddVehicle/>
                </Render>

                <Render if={this.state.vehicleData.length > 0}>
                    <EditVehicle
                        if={this.state.editVehicle && this.state.admin}
                        data={this.state.vehicleData}
                        closeEditModal={this.handleEditModal.bind(this)}
                        editVehicle={this.editVehicle.bind(this)}
                        dataIsFinished={this.state.dataIsFinished}

                        setState={this.setState.bind(this)}
                        getState={{...this.state}}
                    />
                </Render>

                <BookVehicle
                    if={this.state.bookVehicle}
                    data={this.state.vehicleData}
                    closeBookModal={this.handleBookModal.bind(this)}
                />

            </div>
        );
    }
}

export default App;
