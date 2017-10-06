import React, {Component} from 'react';

export default class SuccessMessage extends Component {
    render() {
        if (this.props.if) {

            return (
                <div className="success">
                    <p>{this.props.message}</p>
                </div>
            );
        } else {
            return null;
        }
    }
}
