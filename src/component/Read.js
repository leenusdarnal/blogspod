import React from 'react';

export default class Read extends React.Component {
    state = {
        
    };
    render() {
        return (
            <div>
                {this.props.tagString}<br/>
                this is the read tab
            </div>
        )
    }
}