import React, { Component } from 'react';
import axios from 'axios'

export default class Comments extends Component {
    state = {
        data: [],
        commentVal: ''
    }
    options = {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + JSON.parse(localStorage[localStorage[window.$config.oauth.clientId + "lastactiveuserid"]]).authToken,
            "Content-Type": "application/json",
            Resolver: "requestHeader", "X-Org-Id": "1"
        }
    };
    componentWillMount() {
        axios.get(`https://blogspod.test.bitpod.io/svc/api/Articles/${this.props.id}/CommentList`, this.options)
            .then((res) => {
                console.log("RESPONSE ==== : ", res);
                this.setState({ data: res.data });
            })
            .catch((err) => {
                console.log("ERROR: ====", err);
            })
    }
    componentDidUpdate() {
        axios.get(`https://blogspod.test.bitpod.io/svc/api/Articles/${this.props.id}/CommentList`, this.options)
            .then((res) => {
                console.log("RESPONSE ==== : ", res);
                this.setState({ data: res.data });
            })
            .catch((err) => {
                console.log("ERROR: ====", err);
            })
    }
    handlePerformAction = () => {
        if (this.state.commentVal.length === 0) {
            alert('please type your comment');
        } else {
            // console.log(this.state.commentVal);
            const data = {
                "Dislikes": "0",
                "Content": this.state.commentVal,
                "DateTime": new Date().toISOString(),
                "Email": JSON.parse(localStorage[localStorage[window.$config.oauth.clientId + "lastactiveuserid"]]).userProfile.email,
                "Likes": "0"
            }
            axios.post(`https://blogspod.test.bitpod.io/svc/api/Articles/${this.props.id}/CommentList`, data, this.options)
                .then((res) => {
                    console.log("RESPONSE ==== : ", res);
                    this.setState((prevState) => ({ data: prevState.data.concat(res.data) }));
                })
                .catch((err) => {
                    console.log("ERROR: ====", err);
                })
        }
    }
    render() {
        return (
            <div className="Comments--container">
                <div className="Comments--container__view_section">
                    {
                        (this.state.data.length === 0) ? <center>no comments till now</center> : this.state.data.map(e => {
                            return (
                                <div className='Comments--container__comment'>
                                    <div className='Comments--container__comment_id'><u>{e.Email}</u></div>
                                    <div className='Comments--container__comment_content'>{e.Content}</div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="Comments--container__input_section">
                    <textarea className="Comments--container__input" placeholder="comments..." onKeyUp={(e) => this.setState({ commentVal: e.target.value })} />
                    <button onClick={this.handlePerformAction} className="Comments--container__share">Comment</button>
                </div>
            </div>
        )
    }
}