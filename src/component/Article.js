import React, { Component } from "react";
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios';
import Comments from './Comments';

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: '',
            like: "0",
            canlike: 1
        }
    }
    options = {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + JSON.parse(localStorage[localStorage[window.$config.oauth.clientId + "lastactiveuserid"]]).authToken,
            "Content-Type": "application/json",
            Resolver: "requestHeader", "X-Org-Id": "1"
        }
    };
    // doesn't works when the parent component is changed
    // componentWillReceiveProps(props) {
    //     console.log('hahahaha=-=-====' + this.props.article)
    //     this.setState({ article: this.props.article })
    // }
    componentDidMount(){
        console.log('hahahaha=-=-====' + this.props.article)
        this.setState({ article: this.props.article })
        // ---------- like count ------------
        let props = this.props
        axios.get(`https://blogspod.test.bitpod.io/svc/api/Articles/${props.article.id}/GetArticleLikes/count`, this.options)
        .then((res) => {
            console.log("API RESPONSE ==== : ", res.data.count);
            this.setState({like: res.data.count})
        })
        .catch((err) => {
            console.log("ERROR: ====", err);
        })
        // ---------- check if user can vote ------------
        axios.get(`https://blogspod.test.bitpod.io/svc/api/Articles/${props.article.id}/GetArticleLikes/count?where={\"Email\":\"${JSON.parse(localStorage[localStorage[window.$config.oauth.clientId + "lastactiveuserid"]]).userProfile.email}\"}`, this.options)
        .then((res) => {
            console.log("USER API RESPONSE ==== : ", res.data);
            this.setState({canlike: res.data.count})
        })
        .catch((err) => {
            console.log("ERROR: ====", err);
        })

    }
    handleLikeClick = () => {
        console.log('hello world')
        const data = {
            Email: JSON.parse(localStorage[localStorage[window.$config.oauth.clientId + "lastactiveuserid"]]).userProfile.email
        };
        axios.post(`https://blogspod.test.bitpod.io/svc/api/Articles/${this.props.article.id}/GetArticleLikes`, data, this.options)
        .then((res) => {
            console.log("API RESPONSE ==== : ", res.data);
            this.setState(prevState=>{
                return {
                    like: parseInt(prevState.like) + 1,
                    canlike: 1
                }
            })
        })
        .catch((err) => {
            console.log("ERROR: ====", err);
        })
    }
    render() {
        return (
            <div className="article--contianer_selected">
                <div className="article--container__title_selected">
                    <strong>{ReactHtmlParser(this.props.article.Title)}</strong>
                    <div className="article--container__likes">
                        <h4>
                            {(this.state.like==0)?(<>Like :</>):(<>Total Likes :</>)} {this.state.like}
                            {this.state.canlike==0 && <button onClick={this.handleLikeClick}>Like</button>}
                        </h4>
                    </div>
                </div>
                <div className="article--container__content_selected">
                    {ReactHtmlParser(this.props.article.Content)}
                </div>
                <hr/>
                <Comments id={this.state.article.id} />
            </div>
        )
    }
}

export default Article;