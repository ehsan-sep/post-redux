import React,{useEffect, useMemo} from "react";

import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {PostAuthor} from "./PostAuthor"
import {TimeAgo} from "./TimeAgo"
import { ReactionButton } from "./ReactionButton"
import {selectAllPosts,fetchPosts} from "./postSlice"
import {Spinner} from "../../components/Spinner"
import { useGetPostsQuery } from  "../api/apiSlice"
import classnames from "classnames"


const PostExcerpt = ({post})=>{
    
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
    // const posts = useSelector(selectAllPosts);

    // const postStatus= useSelector(state => state.posts.status)
    // const error = useSelector(state=>state.posts.error)
    // const dispatch = useDispatch();
    const {
        data:posts=[],
        isLoading,
        isSuccess,
        isError,
        Error,
        isFetching,
        refetch
    }=useGetPostsQuery({},{refetchOnMountOrArgChange:true});

    // useEffect(()=>{
    //     if(postStatus === 'idle'){
    //         dispatch(fetchPosts());
    //     }
    // },[postStatus,dispatch])

     let content ;
    // if(postStatus === 'loading'){
    //     return (
    //         content = <Spinner text="loading ....."/>
    //     )
    // }else if (postStatus === 'succeeded'){
    //     const orderPostList = posts.slice().sort((a,b)=>b.date.localeCompare(a.date));
    //     content = orderPostList.map(post => (
    //             <PostExcerpt post={post} key={post.id}/>
    //         )
    //     )
    // }else {
    //     content = <div>{error}</div>
    // }

    const sortedPost = useMemo(()=>{
        const sortedPost = posts.slice();
    
        sortedPost.sort((a,b)=>b.date.localeCompare(a.date))
        return sortedPost
    },[posts])
    if(isLoading){
         content=<Spinner text="Loading....."/>
    }else if (isSuccess){
       
         const renderPost=sortedPost.map(post => <PostExcerpt key={post.id} post={post} />)
         const continarCalssNames = classnames('posts-container',{disabled :isFetching})
         content = <div className={continarCalssNames}>{renderPost}</div>
    }else if (isError) {
         content=<div>{Error.toString()}</div>
    }
   


    return (
        <section className="posts-list">
            <h1>posts</h1>
            <button onClick={refetch}>refecth post</button>
            {content}
        </section>
    )
}