import React from "react";

import {useSelector} from "react-redux"


export const PostsList = ()=>{
    const posts = useSelector(state => state.posts);
    const postsRender = posts.map(post => (
        <article className="post-excerpt" key={post.id}>
            <h1>{post.title}</h1>
            <p className="post-content">{post.content.substring(0,100)}</p>
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