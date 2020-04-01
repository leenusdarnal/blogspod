import React, { Component, Fragment } from 'react';
import AlloyEditorComponent from './alloyeditor';

export default class Create extends Component {
    state = {
        titleValue: null,
        contentValue : null
    }

    onEditorMounted1 = (x) => this.setState({ titleObj: x })

    onEditorMounted2 = (x) => this.setState({ contentObj: x })

    handleOnClicked = () => {
        console.log("----------------------", this.state.titleObj.get('nativeEditor').getData())
        console.log("----------------------", this.state.contentObj.get('nativeEditor').getData())
    }

    handleOnClicked = () => {
        console.log("----------------------", this.state.titleValue)
        console.log("----------------------", this.state.contentValue)
    }

    updateObject = (x, y) => {
        const x1 = document.getElementById('title').innerHTML;
        const x2 = document.getElementById('content').innerHTML;
        if (x === "title") {
            this.setState({
                titleObj: y,
                titleValue: (x1.length > 0) ? x1 : '<p><br></p>',
                contentValue: (x2.length > 0) ? x2 : '<p><br></p>'
            })
        }
        else {
            this.setState({
                contentObj: y,
                titleValue: (x1.length > 0) ? x1 : '<p><br></p>',
                contentValue: (x2.length > 0) ? x2 : '<p><br></p>'
            })
        }
    }
    render() {
        return (
            <>
                <Fragment>
                    <AlloyEditorComponent container='title' onchange={this.updateObject} onEditorMounted={this.onEditorMounted1}>
                        <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h1>
                    </AlloyEditorComponent>
                    <AlloyEditorComponent container='content' onchange={this.updateObject} onEditorMounted={this.onEditorMounted2}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel metus nunc. Maecenas rhoncus congue faucibus. Sed finibus ultrices turpis. Mauris nulla ante, aliquam a euismod ut, scelerisque nec sem. Nam dapibus ac nulla non ullamcorper. Sed vestibulum a velit non lobortis. Proin sit amet imperdiet urna. Aenean interdum urna augue, vel mollis tortor dictum vitae. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris vitae suscipit magna.
                        </p>
                    </AlloyEditorComponent>
                </Fragment>
                <button onClick={this.handleOnClicked}>Submit via obj reference</button>
                <button onClick={this.handleOnClicked}>Submit via direct dom</button>
            </>
        )
    }
}