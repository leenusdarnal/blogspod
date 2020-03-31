import React, { Component } from 'react';

import loaderAlloyEditor from './loader-alloyeditor';

class AlloyEditorComponent extends Component {

    componentDidMount() {
        const { container, alloyEditorConfig } = this.props;

        loaderAlloyEditor()
            .then((alloyeditor) => {
                this._editor = alloyeditor.editable(container, alloyEditorConfig);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    componentWillUnmount() {
        // this._editor.destroy();
    }

    render() {
        const { children, container } = this.props;

        return (
            <div id={container}>
                {children}
            </div>
        );
    }
}

export default AlloyEditorComponent;
