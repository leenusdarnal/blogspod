import React, { Component } from "react";
import ReactHtmlParser from 'react-html-parser';


class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: ''
        }
    }
    componentWillReceiveProps(props) {
        this.setState({ article: props.article })
    }
    render() {
        return (
            <div className="article--contianer_selected">
                <div className="article--container__title_selected">{ReactHtmlParser(this.props.article.Title)}</div>
                <div className="article--container__content_selected">
                    {ReactHtmlParser(this.props.article.Content)}
                </div>

            </div>
        )
    }
}

export default Article;