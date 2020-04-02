import  React from "react";
import ReactHtmlParser from 'react-html-parser';
import { Route ,Switch, Link} from "react-router-dom"
import Article from "./Article"



const ArticleCard = ({articles}) => {


    return(
        !articles.length ? <h1>Loading...</h1> :(
        articles.map((article) =>{
            return(
                <div className="articleContianer">
                    <Link to={"/read/article-"+article.id} >
                        <div>{ReactHtmlParser(article.Title)}</div>
                        <br/>
                        <div>
                            { ReactHtmlParser(article.Content) }
                        </div>
                    </Link>

                    <Switch>

                            <Route path={"/read/article-"+article.id}   render={() => { return <Article article={article}  /> } } />
                    </Switch>
                </div>
            )
        })
        )
    )

}

export default ArticleCard;