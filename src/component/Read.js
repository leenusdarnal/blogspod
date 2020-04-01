import React ,{Component} from  "react";
import ArticleCard from "./ArticleCard";

class Read extends Component {
    constructor(){
        super();
        this.state = {
            articles:[],
            search: ''
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
        
    }
    componentWillReceiveProps(props) {
        console.log(props);
        return this.setState({search : props.search})
        
    }

    // toFillterArticle = (article,search) =>{
    //     article.Tags.filter((tags) => tags.toString().toLowerCase().includes(search.toString().toLowerCase()));
    // } 


    render(){
        const {articles, search} = this.state;


        let filteredArticles = search === "" ? articles: articles.filter(article => article.Tags.toString().toLowerCase().includes(search.toString().toLowerCase()))
        console.log(filteredArticles);
        debugger
        return(
            <div className="articleListConatiner">
                <ArticleCard articles={filteredArticles}/>
            </div>
        )
    }
}

export default  Read;