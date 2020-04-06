import React, { Component } from "react";
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios';
import Comments from './Comments';

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: '',
            like: "__"
        }
    }
    componentWillReceiveProps(props) {
        this.setState({ article: props.article })
        const options = {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + JSON.parse(localStorage[localStorage[window.$config.oauth.clientId + "lastactiveuserid"]]).authToken,
                "Content-Type": "application/json",
                Resolver: "requestHeader", "X-Org-Id": "1"
            }
        };
        // console.log("---------------------------------------------"+props.article.id);
        axios.get(`https://blogspod.test.bitpod.io/svc/api/Articles/${props.article.id}/GetArticleLikes/count`, options)
            .then((res) => {
                console.log("API RESPONSE ==== : ", res.data.count);
                this.setState({like: res.data.count})
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
                        <h4>Likes : {this.state.like}</h4>
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