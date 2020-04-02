import React, { Component } from 'react';
import Dante from 'Dante2';
import {stateToHTML} from 'draft-js-export-html';

export default class Create extends Component {
    state = {
        mycontent: null
    }
    content={};
    // status=false;
    render() {
        // if(this.status){
        //     console.log(stateToHTML(this.content))
        // }
        return (
            <div>
                <Dante
                    editorState={this.state.editorState}
                    onChange={editor => {
                        // console.log(stateToHTML(editor.state.editorState._immutable.currentContent))
                        // console.log('editor content: ', editor.emitSerializedOutput());
                        // console.log(stateToHTML(editor.emitSerializedOutput()))
                        this.setState({ mycontent: editor,contentObj: stateToHTML(editor.state.editorState._immutable.currentContent)})
                    }}
                />
                <hr />
                {this.state.contentObj}
                <button onClick={()=>{
                    console.log(stateToHTML(this.state.mycontent.state.editorState._immutable.currentContent))
                }}>click me</button>
            </div>
        )
    }
}














// import AlloyEditorComponent from './alloyeditor';

// export default class Create extends Component {
//     state={
//         title:'AlloyEditor will make this content editable',
//     }
//     render() {
//         return (
//             <Fragment>
//                 <AlloyEditorComponent container='title' onchange={this.handletitlechange}>
//                     <h1>{this.state.title}</h1>
//                 </AlloyEditorComponent>
//                 <AlloyEditorComponent container='content'>
//                     <p>
//                         To install React, follow the instructions on <a href="https://github.com/facebook/react/">GitHub</a>.
//                                 </p>
//                     <p>
//                         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel metus nunc. Maecenas rhoncus congue faucibus. Sed finibus ultrices turpis. Mauris nulla ante, aliquam a euismod ut, scelerisque nec sem. Nam dapibus ac nulla non ullamcorper. Sed vestibulum a velit non lobortis. Proin sit amet imperdiet urna. Aenean interdum urna augue, vel mollis tortor dictum vitae. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris vitae suscipit magna.
//                                 </p>
//                 </AlloyEditorComponent>
//             </Fragment>
//         )
//     }
// }