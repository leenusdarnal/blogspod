import React, { Component, Fragment } from 'react';

import AlloyEditorComponent from './alloyeditor';

class App extends Component {
    render() {
        return (
            <Fragment>
                <AlloyEditorComponent container='title'>
                    <h1>AlloyEditor will make this content editable</h1>
                </AlloyEditorComponent>
                <AlloyEditorComponent container='editable'>
                    <p>
                        To install React, follow the instructions on <a href="https://github.com/facebook/react/">GitHub</a>.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel metus nunc. Maecenas rhoncus congue faucibus. Sed finibus ultrices turpis. Mauris nulla ante, aliquam a euismod ut, scelerisque nec sem. Nam dapibus ac nulla non ullamcorper. Sed vestibulum a velit non lobortis. Proin sit amet imperdiet urna. Aenean interdum urna augue, vel mollis tortor dictum vitae. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris vitae suscipit magna.
                    </p>
                </AlloyEditorComponent>
            </Fragment>
        );
    }
}

export default App;