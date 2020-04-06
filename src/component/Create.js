import React, { Component } from 'react';
import Dante from 'Dante2';
import { stateToHTML } from 'draft-js-export-html';
import axios from 'axios';
import Chips from "react-chips";
export default class Create extends Component {
    state = {
        mycontent: null,
        chips: []
    }
    content = {};

    handlePostArticle = () => {
        const data = {
            "UpVote": "0",
            "DownVote": "0",
            "Status": "publish",
            "Title": stateToHTML(this.state.Title.state.editorState._immutable.currentContent),
            "Content": stateToHTML(this.state.Content.state.editorState._immutable.currentContent),
            "Tags": this.state.chips,
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
                // alert(" Your post have been published.");
                window.location= window.location.href.replace('create',`read/article-${res.data.id}`);
            })
            .catch((err) => {
                console.log("ERROR: ====", err);
            })
}

    onChange = chips => {
        this.setState({ chips });
        console.log(this.state.chips)
    }

    render() {
        return (
            <div style={{paddingLeft: "115px"}}>
                        <div style={{maxWidth:"350px"}}>
                            <Chips
                            value={this.state.chips}
                            onChange={this.onChange}
                            placeholder="Tags Here"
                            createChipKeys={[13,9]}
                            />
                        </div>
                <br />
                <br />
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
                <button onClick={() =>{this.handlePostArticle()}}>Publish article</button>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        )
    }
}
