import React, {Component} from 'react';

export default class Render extends Component
{
    render() {
        return this.props.if
            ? React.cloneElement(this.props.children)
            : null;
    }
}