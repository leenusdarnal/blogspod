import React, { Component } from "react";
import ArticleCard from "./ArticleCard";

class Read extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            search: '',
            AllTags: []
        }
    }
    componentDidMount() {
        fetch("https://blogspod.test.bitpod.io/svc/api/Articles", {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + JSON.parse(localStorage[localStorage[window.$config.oauth.clientId + "lastactiveuserid"]]).authToken,
                    Resolver: "requestHeader",
                    "X-Org-Id": "1"
                }
            }).then(response => response.json())
            .then(response => {
                // console.log("ahren pradhan");
                // response.map(e => e.Tags.map(f => {
                //     if (!this.state.AllTags.includes(f)) {
                //         this.state.AllTags.concat(f)
                //     }
                // }))
                return this.setState({ articles: response })
            });

    }
    componentWillReceiveProps(props) {
        // console.log(props);
        return this.setState({ search: props.search })

    }

    componentDidUpdate() {
        console.log(this.state.articles)
        this.state.AllTags = [...new Set( [].concat.apply([], this.state.articles.map(e => e.Tags)) )]
        this.props.setSuggestion( [...new Set( [].concat.apply([], this.state.articles.map(e => e.Tags)) )] )
    }

    render() {
        const { articles, search } = this.state;
        const filterSearch = search.split(" ").join(",")


        let filteredArticles = search === "" ? articles : articles.filter(article => article.Tags.toString().toLowerCase().includes(filterSearch.toString().toLowerCase()))
            // console.log(filteredArticles);
        return ( 
            <div className = "articleListConatiner" >
                <ArticleCard articles = { filteredArticles }/> 
            </div>
        )
    }
}

export default Read;