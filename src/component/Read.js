import React ,{Component} from  "react";
import ArticleCard from "./ArticleCard";

export default class Read extends Component {
    constructor(){
        super();
        this.state = {
            articles:[]
        }
    }

    componentDidMount(){
            fetch("https://blogspod.test.bitpod.io/svc/api/Articles", {
        headers: {
        Accept: "application/json",
        Authorization: "Bearer "+ JSON.parse(localStorage[localStorage[window.$config.oauth.clientId+"lastactiveuserid"]]).authToken,
        Resolver: "requestHeader",
        "X-Org-Id": "1"
        }
    }).then(response => response.json())
    .then(response =>{
        console.log(response);
        return this.setState({articles:response})  } );
    };

    render(){
        return(
            <div className="articleListConatiner">
            
            <ArticleCard articles={this.state.articles}/>

            </div>
        )
    }
}