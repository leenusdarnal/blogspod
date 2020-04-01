import React, { Component } from 'react';

import loaderAlloyEditor from './loader-alloyeditor';

class AlloyEditorComponent extends Component {

    componentDidMount() {
        const { container, alloyEditorConfig, onEditorMounted } = this.props;

        loaderAlloyEditor()
            .then((alloyeditor) => {
                debugger;
                this._editor = alloyeditor.editable(container, alloyEditorConfig);
                if(typeof onEditorMounted === 'function'){
                    onEditorMounted(this._editor);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }
    componentDidUpdate(){
        console.log('updated');
    }
    componentWillUnmount() {
        // if onEditorWillUnNounted distroy by checking 
        // this._editor.destroy();
    }

    render() {
        const { children, container } = this.props;
        console.log(children)
        // this.props.onchange("");
        return (
            <div id={container}>
                {children}
            </div>
        );
    }
}

export default AlloyEditorComponent;


// this._editor = alloyeditor.editable(container, {
                //     extraPlugins: alloyeditor.Core.ATTRS.extraPlugins.value + ',font',
                //     toolbars: {
                //         add: {
                //             buttons: ['image', 'camera', 'hline', 'table'],
                //             tabIndex: 2
                //           },
                //         styles: {
                //             selections: [{
                //                 name: 'link',
                //                 buttons: ['linkEdit'],
                //                 test: alloyeditor.SelectionTest.link
                //               }, {
                //                 name: 'image',
                //                 buttons: ['imageLeft', 'imageRight'],
                //                 test: alloyeditor.SelectionTest.image
                //               }, {
                //                 name: 'text',
                //                 buttons: ['styles', 'bold', 'italic', 'underline', 'link', 'twitter'],
                //                 test: alloyeditor.SelectionTest.text
                //               }, {
                //                 name: 'table',
                //                 buttons: ['tableRow', 'tableColumn', 'tableCell', 'tableRemove'],
                //                 getArrowBoxClasses: alloyeditor.SelectionGetArrowBoxClasses.table,
                //                 setPosition: alloyeditor.SelectionSetPosition.table,
                //                 test: alloyeditor.SelectionTest.table
                //               }, {
                //                 name: 'text',
                //                 buttons: [
                //                   {
                //                     name: 'styles',
                //                     // cfg: {
                //                     //     styles: [...]
                //                     // }
                //                   },
                //                   'bold', 'italic', 'underline', 'link', 'twitter'
                //                 ],
                //                 test: alloyeditor.SelectionTest.text
                //               }]
                //         }
                //     }
                // });