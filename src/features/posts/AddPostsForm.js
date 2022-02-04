import React,{useState} from "react";
import {nanoid} from "@reduxjs/toolkit"
import {useDispatch} from "react-redux"
import {postadded} from "./postSlice"

export const AddPostForm = () => {
    const [title,setTitle] = useState('');
    const [content , setContent]= useState('');
    const dispatch = useDispatch();
const onChangeTitle = (e)=> setTitle(e.target.value)
const onContentChange = (e) => setContent(e.target.value)
const onSavePostClick = () => {

    if(title && content){
        dispatch(postadded({id:nanoid(),title,content}))

        setContent('');
        setTitle('')
    }
}

return (
    <section>
        <h1>add post</h1>
        <form >
            <label htmlFor="postTitle">post title:</label>
            <input id="postTitle" name="postTitle" value={title} onChange={onChangeTitle} />
            <label htmlFor="postContent">post content :</label>
            <textarea id="postContent" name="postContent" value={content} onChange={onContentChange}/>
            <button type="button" onClick={onSavePostClick}>save post</button>
        </form>
    </section>
)
}