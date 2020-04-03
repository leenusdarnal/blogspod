import React from "react";
import ReactHtmlParser from 'react-html-parser';
import { Route, Switch, Link } from "react-router-dom"
import Article from "./Article"



const ArticleCard = ({ articles }) => {
    return (
        !articles.length ? <h1>Loading...</h1> : (
            articles.map((article) => {
                return (
                    <div className="articleContianer">
                        <Switch>
                            <Route path={"/read"} exact>
                                <Link to={"/read/article-" + article.id}  style={{ textDecoration: 'none' }}>
                                    <div className="article--container">
                                        <div className='article--container__title'>{ReactHtmlParser(article.Title)}</div>
                                        <div className='article--container__content'>{ReactHtmlParser(article.Content.slice(0,100))}</div>
                                    </div>
                                </Link>
                            </Route>
                            <Route path={"/read/article-" + article.id} exact render={() => { return <Article article={article} /> }} />
                        </Switch>
                    </div>
                )
            })
        )
    )

}

export default ArticleCard;