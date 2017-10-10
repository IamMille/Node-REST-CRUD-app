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
import SuccessMessage from "./components/SuccessMessage";
import ErrorMessage from "./components/ErrorMessage";


class App extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            admin: true,
            location: '',
            bookVehicle: false,
            editVehicle: false,
            cancelBooking: false,
            addVehicle: false,
            vehicleData: [],
            database: [],
            finished: false,
            dataIsFinished: false,
            success: {
                exists: false,
                message: ''
            },
            error: {
                exists: false,
                message: ''
            }
        }
    }

    componentDidMount() {
        fetch( config.apiRoot + 'vehicle/read' )
            .then(resp => resp.text()) //text()
            .then(text => {
                try {
                    //console.log("fetch:", text);
                    let json = JSON.parse(text);
                    this.setState({
                        database: json.data.reverse(), // newest first
                        finished: true
                    });
                    this.handleSuccessMessage(json)
                } catch(err) {
                    console.log("Catched error:", err);
                }
            })
            .catch(error => {
                console.error("API error:", error);
                this.handleErrorMessage(error)
            });

        if (window.location.hash === '')
            window.location.hash = "#vehicles";

        this.checkUrl();
        window.addEventListener("hashchange", () => {
            this.checkUrl()
        });

        document.addEventListener("keydown", this.escFunction, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction, false);
    }

    escFunction = (event) => {
        if (event.keyCode !== 27) return;
        this.setState({ bookVehicle: false, editVehicle: false, cancelBooking: false, addVehicle: false })
    };

    checkUrl() {
        this.setState({
            location: window.location.hash.replace('#', '')
        });
    }

    handleLogin() {
        this.setState({
            admin: !this.state.admin
        });
    }

    vehicleBooking(event) {
        let target = event.currentTarget;

        const clonedArray = JSON.parse(JSON.stringify(this.state.database));
        const clickedVehicleId = target.getAttribute('data-id');
        const clickedVehicle = clonedArray.filter(vehicle => vehicle._id.indexOf(clickedVehicleId) > -1);

        this.setState({
            vehicleData: clickedVehicle,
            bookVehicle: true
        })
    };

    handleBookModal(event) {
        const target = event.target;
        if (target.localName === 'section' || target.innerText.toLowerCase() === 'stäng') {
            this.setState({
                bookVehicle: !this.state.bookVehicle
            })
        }
    }

    handleEditModal(event) {
        const target = event.target;
        if (target.localName === 'section' || target.innerText.toLowerCase() === 'stäng') {
            this.setState({
                editVehicle: !this.state.editVehicle
            })
        }
    }

    handleCancelBookingModal = (event) => {
        const target = event.target;
        if (target.localName === 'section' || target.innerText.toLowerCase() === 'stäng') {
            this.setState({
                cancelBooking: !this.state.cancelBooking
            })
        } else if (target.localName === 'a') {
            this.setState({
                cancelBooking: true
            })
        }
    };

    handleAddVehicleModal = (event) => {
        console.log('add vehicle modal');
        const target = event.target;
        if (target.localName === 'section' || target.innerText.toLowerCase() === 'stäng') {
            this.setState({
                addVehicle: !this.state.addVehicle
            })
        } else if (target.localName === 'a') {
            this.setState({
                addVehicle: true
            })
        }
    };

    editVehicle(event) {
        const clonedArray = JSON.parse(JSON.stringify(this.state.database));
        const clickedVehicleId = event.currentTarget.getAttribute('data-id'); // currentTarget = where eventListener is
        const clickedVehicle = clonedArray.filter(vehicle => vehicle._id === clickedVehicleId);

        this.setState({
            vehicleData: clickedVehicle,
            editVehicle: true
        });
    }

    handleSuccessMessage = (json) => {
        if (json.result === 'ok') {
            this.setState({
                success: {
                    exists: true,
                    message: json.message
                }
            });
            setTimeout(() => {
                this.setState({
                    success: {
                        exists: false,
                        message: ''
                    }
                })
            }, 3000)
        } else if (json.result === 'error') {
            this.handleErrorMessage(json.message || json.error)
        }
    };

    handleErrorMessage = (error) => {
        let message = error.message ? error.message : error;

        this.setState({
            error: {
                exists: true,
                message: message
            }
        });
        setTimeout(() => {
            this.setState({
                error: {
                    exists: false,
                    message: ''
                }
            })
        }, 3000)
    };


    render() {
        return (
            <div className="App">
                <SuccessMessage
                    if={this.state.success.exists}
                    message={this.state.success.message}
                />
                <ErrorMessage
                    if={this.state.error.exists}
                    message={this.state.error.message}
                />

                <Menu
                    admin={this.state.admin}
                    checkUrl={this.checkUrl.bind(this)}
                    handleLogin={this.handleLogin.bind(this)}
                    handleCancelBookingModal={this.handleCancelBookingModal}
                    handleAddVehicleModal={this.handleAddVehicleModal}
                />

                <Render if={this.state.location === 'vehicles'}>
                    <AllVehicles
                        isAdmin={this.state.admin}
                        handleClick={this.state.admin ? this.editVehicle.bind(this) : this.vehicleBooking.bind(this)}
                        data={this.state.database}
                        handleSuccessMessage={this.handleSuccessMessage}
                        handleErrorMessage={this.handleErrorMessage}
                        setState={this.setState.bind(this)}
                    />
                </Render>

                <CancelBooking
                    if={this.state.cancelBooking}
                    handleSuccessMessage={this.handleSuccessMessage}
                    handleErrorMessage={this.handleErrorMessage}
                    handleCancelBookingModal={this.handleCancelBookingModal}
                    setState={this.setState.bind(this)}
                    getState={{...this.state}}
                />

                <AddVehicle
                    if={this.state.addVehicle && this.state.admin}
                    handleSuccessMessage={this.handleSuccessMessage}
                    handleErrorMessage={this.handleErrorMessage}
                    handleAddVehicleModal={this.handleAddVehicleModal}
                />

                <Render if={this.state.editVehicle && this.state.admin}>
                    <EditVehicle
                        data={this.state.vehicleData}
                        closeEditModal={this.handleEditModal.bind(this)}
                        editVehicle={this.editVehicle.bind(this)}
                        dataIsFinished={this.state.dataIsFinished}
                        setState={this.setState.bind(this)}
                        getState={{...this.state}}
                        handleSuccessMessage={this.handleSuccessMessage}
                        handleErrorMessage={this.handleErrorMessage}
                    />
                </Render>

                <Render if={this.state.bookVehicle}>
                    <BookVehicle
                        data={this.state.vehicleData}
                        closeBookModal={this.handleBookModal.bind(this)}
                        setState={this.setState.bind(this)}
                        getState={{...this.state}}
                        handleSuccessMessage={this.handleSuccessMessage}
                        handleErrorMessage={this.handleErrorMessage}
                    />
                </Render>

            </div>
        );
    }
}

export default App;
