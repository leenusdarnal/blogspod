import React, { Component } from 'react';
import Dante from 'Dante2';
import { stateToHTML } from 'draft-js-export-html';
import axios from 'axios';

export default class Create extends Component {
    state = {
        mycontent: null
    }
    content = {};

    handlePostArticle = () => {
        const data = {
            "UpVote": "0",
            "DownVote": "0",
            "Status": "publish",
            "Title": stateToHTML(this.state.Title.state.editorState._immutable.currentContent),
            "Content": stateToHTML(this.state.Content.state.editorState._immutable.currentContent),
            "Tags": document.getElementById('tags').value.split(","),
            "Email": JSON.parse(localStorage[localStorage[window.$config.oauth.clientId + "lastactiveuserid"]]).userProfile.email
        }

        const options = {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + JSON.parse(localStorage[localStorage[window.$config.oauth.clientId + "lastactiveuserid"]]).authToken,
                "Content-Type": "application/json",
                Resolver: "requestHeader", "X-Org-Id": "1"
            }
        };

        axios.post('https://blogspod.test.bitpod.io/svc/api/Articles', data, options)
            .then((res) => {
                console.log("RESPONSE ==== : ", res);
            })
            .catch((err) => {
                console.log("ERROR: ====", err);
            })
    }
    render() {
        return (
            <div>
                <input id="tags" />
                <Dante
                    body_placeholder={"Title here"}
                    onChange={editor => {
                        this.setState({ Title: editor, titleObj: stateToHTML(editor.state.editorState._immutable.currentContent) })
                    }}
                />
                <Dante
                    onChange={editor => {
                        this.setState({ Content: editor, contentObj: stateToHTML(editor.state.editorState._immutable.currentContent) })
                    }}
                />

                <br />
                <button onClick={this.handlePostArticle}>Publish article</button>
                <br />
                <br />
                <br />
                <br />
                <br />
{/* 
                <hr />
                {this.state.titleObj}
                <br />
                {this.state.contentObj}
                <br /> */}


                {/* <button onClick={() => {
                    console.log(stateToHTML(this.state.Title.state.editorState._immutable.currentContent))
                    console.log(stateToHTML(this.state.Content.state.editorState._immutable.currentContent))
                }}>click me</button> */}
                <br />
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