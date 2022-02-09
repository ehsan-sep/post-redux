import React,{useEffect} from "react";

import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"

import {PostAuthor} from "./PostAuthor"
import {TimeAgo} from "./TimeAgo"
import { ReactionButton } from "./ReactionButton"
import {selectAllPosts,fetchPosts} from "./postSlice"
import {Spinner} from "../../components/Spinner"

const PostExcerpt = ({post})=>{
    debugger;
    return (
        <article className="post-excerpt" key={post.id}>
            <h1>{post.title}</h1>
            <p className="post-content">{post.content.substring(0, 100)}</p>
            <PostAuthor userId={post.user}/>
            <TimeAgo timeStamp={post.date}/>
            <Link to={`/post/${post.id}`} className="button muted-button">
                view post
            </Link>

            <ReactionButton post={post}/>
        </article>
    )
}


export const PostsList = ()=>{
    const posts = useSelector(selectAllPosts);

    const postStatus= useSelector(state => state.posts.status)
    const error = useSelector(state=>state.posts.error)
    const dispatch = useDispatch();

    useEffect(()=>{
        if(postStatus === 'idle'){
            dispatch(fetchPosts());
        }
    },[postStatus,dispatch])

     let content ;
    if(postStatus === 'loading'){
        return (
            content = <Spinner text="loading ....."/>
        )
    }else if (postStatus === 'succeeded'){
        const orderPostList = posts.slice().sort((a,b)=>b.date.localeCompare(a.date));
        content = orderPostList.map(post => (
                <PostExcerpt post={post} key={post.id}/>
            )
        )
    }else {
        content = <div>{error}</div>
    }

   


    return (
        <section className="posts-list">
            <h1>posts</h1>
            {content}
        </section>
    )
}