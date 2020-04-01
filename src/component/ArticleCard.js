import  React from "react";
import ReactHtmlParser from 'react-html-parser';

const ArticleCard = ({articles}) => {


    return(
        !articles.length ? <h1>Loading...</h1> :(
        articles.map((article) =>{
            return(
                <div className="articleContianer">
                <div>{ReactHtmlParser(article.Title)}</div>
                <br/>
                <div>
                    {ReactHtmlParser(article.Content)}
                </div>
    
            </div>
            )
        })
        )
    )

}

export default ArticleCard;