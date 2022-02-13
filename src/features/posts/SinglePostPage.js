import {useSelector} from "react-redux"
import React from "react"
import {Link,useParams} from "react-router-dom"
import {Navbar} from "../../app/Navbar"
import {PostAuthor}  from "./PostAuthor"
import {TimeAgo} from "./TimeAgo"
import {ReactionButton} from "./ReactionButton"
import {selectPostById} from "./postSlice"
import {Spinner} from "../../components/Spinner"
import {useGetPostQuery} from "../api/apiSlice"


export const SinglePagePost=()=>{
    const params = useParams();
    // const post = useSelector(state => selectPostById(state,params.postId))
    const {data:post , isFetching,isSuccess} = useGetPostQuery(params.postId)

    // if(!post ){
    //     return (
    //         <section>
    //             <h1>post not found</h1>
    //         </section>
    //     )
    // }
     let content ;
    if(isFetching){
        content = <Spinner text="Loading ...."></Spinner>
    }else if(isSuccess){
        content=(
            
            <section>
            <article className="post">
                <h1>{post.title}</h1>
                <p className="post-content" >{post.content}</p>
                <PostAuthor userId={post.user}/>
                <TimeAgo timeStamp={post.date}/>
                <Link to={`/editPost/${post.id}` } className="button">edit post</Link>
                <ReactionButton post={post}/>
            </article>
            </section>
        )
    }

    return (
        <React.Fragment>
            <Navbar/>
            {content}
        </React.Fragment>
    )
}