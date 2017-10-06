import React, {Component} from 'react';

export default class ErrorMessage extends Component {
    render() {
        if (this.props.if) {
            return (
                <div className="error">
                    <p>{this.props.message}</p>
                </div>
            );
        } else {
            return null;
        }
    }
}
