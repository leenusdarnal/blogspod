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
                    body_placeholder={"Title here"}
                    onChange={editor => {
                        this.setState({ Title: editor,titleObj: stateToHTML(editor.state.editorState._immutable.currentContent)})
                    }}
                />
                <Dante
                    onChange={editor => {
                        this.setState({ Content: editor,contentObj: stateToHTML(editor.state.editorState._immutable.currentContent)})
                    }}
                />

                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>

                <hr />
                {this.state.titleObj}
                <br/>
                {this.state.contentObj}
                <br/>
                
                
                <button onClick={()=>{
                    console.log(stateToHTML(this.state.Title.state.editorState._immutable.currentContent))
                    console.log(stateToHTML(this.state.Content.state.editorState._immutable.currentContent))
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