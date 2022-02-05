import {useSelector} from "react-redux"
import React from "react"
import {Link,useParams} from "react-router-dom"
import {Navbar} from "../../app/Navbar"

export const SinglePagePost=()=>{
    const params = useParams();
    const post = useSelector(state => state.posts.find(post => post.id == params.postId))
    if(!post ){
        return (
            <section>
                <h1>post not found</h1>
            </section>
        )
    }

    return (
        <React.Fragment>
        <Navbar/>
        <section>
        <article className="post">
            <h1>{post.title}</h1>
            <p className="post-content" >{post.content}</p>
            <Link to={`/editPost/${post.id}` } className="button">edit post</Link>
        </article>
        </section>
        </React.Fragment>
    )
}