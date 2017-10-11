import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Menu extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            onMobile: false,
            menuIsShowing: false
        }
    }

    componentDidMount = () => {
        if (window.screen.availWidth <= 678) {
            this.setState({
                onMobile: true
            })
        }
    };

    handleMenuToggle = () => {
        this.setState({
            menuIsShowing: !this.state.menuIsShowing
        })
    };

    render() {
        return (
            <nav className={this.state.onMobile ? 'menu background' : 'menu'}>
                <div className={this.state.menuIsShowing ? 'open': 'closed'}>
                    <span className="logo">Olssons<span>Fordon Ab</span></span>
                    <div className={this.state.onMobile ? 'mobile' : 'hidden'} onClick={this.handleMenuToggle}>
                        <span className={this.state.menuIsShowing ? 'rotate-left' : null}></span>
                        <span className={this.state.menuIsShowing ? 'hidden' : null}></span>
                        <span className={this.state.menuIsShowing ? 'rotate-right' : null}></span>
                    </div>
                    <div className={this.state.menuIsShowing || !this.state.onMobile ? 'menu-container' : 'hidden'}>
                        {!this.props.admin &&
                        <ul className="menu-ul">
                            <li className="menu-li"><a href="/" onClick={this.props.checkUrl} className="menu-li-active">Boka</a></li>
                            <li className="menu-li"><a onClick={this.props.handleCancelBookingModal}>Avboka</a></li>
                        </ul>
                        }

                        {this.props.admin &&
                        <ul className="menu-ul">
                            <li className="menu-li"><a href="/" onClick={this.props.checkUrl} className="menu-li-active">Visa fordon</a>
                            </li>
                            <li className="menu-li"><a onClick={this.props.handleAddVehicleModal}>Lägg till fordon</a>
                            </li>
                        </ul>
                        }

                        <a className="log-in"
                           onClick={this.props.handleLogin}>{this.props.admin ? 'Logga ut' : 'Logga in'}</a>

                    </div>
                </div>
            </nav>
        );
    }
}

Menu.propTypes = {
    admin: PropTypes.bool.isRequired,
    handleLogin: PropTypes.func.isRequired
};

