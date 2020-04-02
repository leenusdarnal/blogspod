import React,{Component} from "react";
import ReactHtmlParser from 'react-html-parser';


class Article extends Component{
    constructor(props){
        super(props);
        this.state={
            article:''
        }
    }
componentWillReceiveProps(props){
    this.setState({article:props})
}
    render(){
        return(
            <div className="articleContianer">
            <h1>Article</h1>
                <div>{ReactHtmlParser(this.state.article.Title)}</div>
                <br/>
                <div>
                    { ReactHtmlParser(this.state.article.Content) }

                </div>

        </div>
        )
    }
}

export default Article;