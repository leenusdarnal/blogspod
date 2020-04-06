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
                                        <div className='article--container__header'>
                                            <div className='article--container__title'><strong>{ReactHtmlParser(article.Title)}</strong></div>
                                            {/* <div className='article--container__tags'> */}
                                                <ul className='article--container__tags'>
                                                    {article.Tags.map(e=>(<li>{e}</li>))}
                                                </ul>
                                            {/* </div> */}
                                        </div>
                                        <div className='article--container__content'>{ReactHtmlParser(article.Content.slice(0,100)+ "...")}</div>
                                        <div className='article--container__content_2'>{ReactHtmlParser(article.Content.slice(0,250)+ "...")}</div>
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