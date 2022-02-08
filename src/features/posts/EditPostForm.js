import React, { useState } from "react";
import {useDispatch,useSelector} from "react-redux"

import {useNavigate,useParams} from "react-router-dom"

import {postUpdated,selectPostById} from "./postSlice"
import {Navbar} from "../../app/Navbar"

export const EditPostForm = ()=>{

    const params = useParams();
    const navigate=useNavigate();
    const post = useSelector(state=>selectPostById(state,params.postId));

    const [title , setTitle]=useState(post.title);
    const [content,setContent]=useState(post.content);

    const dispatch = useDispatch();
    const onTitleHandle = (e)=>{setTitle(e.target.value)}
    const onContentHandle = (e)=> {setContent(e.target.value)}

    const onSaveHandle = ()=>{
        if(title&&content){
        dispatch(postUpdated({id:params.postId,title,content}));
        navigate('/post/'+post.id)
         }
    }

    return(
        <React.Fragment>
        <Navbar/>
        <section>
        <h1 >edit post</h1>
        <form>
            <label htmlFor="postTitle">post title:</label>
            <input name="postTitle" id="postTitle" value={title} onChange={onTitleHandle}/>
            <label htmlFor="postContent">post content</label>
            <input name="postContent" id="postContent" value={content} onChange={onContentHandle}/>
           
         </form>
         <button type="button" onClick={onSaveHandle}>save me</button>
        </section>
        </React.Fragment>
    )
}