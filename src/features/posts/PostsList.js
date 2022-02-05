import React from "react";

import {useSelector} from "react-redux"
import {Link} from "react-router-dom"

import {PostAuthor} from "./PostAuthor"
import {TimeAgo} from "./TimeAgo"

export const PostsList = ()=>{
    const posts = useSelector(state => state.posts);
    const orderPostList = posts.slice().sort((a,b)=>b.date.localeCompare(a.date));
    const postsRender = orderPostList.map(post => (
        <article className="post-excerpt" key={post.id}>
            <h1>{post.title}</h1>
            <p className="post-content">{post.content.substring(0,100)}</p>
            <PostAuthor userId={post.user}/>
            <TimeAgo timeStamp={post.date}/>
            <Link to={`/post/${post.id}`} className="button muted-button">
                view post
            </Link>
            
        </article>
    )
        
   )

    return (
        <section className="posts-list">
            <h1>posts</h1>
            {postsRender}
        </section>
    )
}