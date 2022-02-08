import React,{useState} from "react";
import {nanoid} from "@reduxjs/toolkit"
import {useSelector,useDispatch} from "react-redux"
// import {postadded} from "./postSlice"
import {addNewPost} from "./postSlice";

export const AddPostForm = () => {
    const [title,setTitle] = useState('');
    const [content , setContent]= useState('');
    const [userId , setUserId]=useState();
    const [addRequestStatus , setaddRequeststatus]= useState('idle')
const dispatch = useDispatch();
const users = useSelector(state=>state.users)

const onChangeTitle = (e)=> setTitle(e.target.value)
const onContentChange = (e) => setContent(e.target.value)
const onAuthorHandle = (e)=>{setUserId(e.target.value)}

// const onSavePostClick = () => {

//     if(title && content&&userId){
//         // dispatch(postadded({id:nanoid(),title,content}))
//         dispatch(postadded(title,content,userId))
//         setContent('');
//         setTitle('')
//     }
// }

const canSave = [title,content,userId].every(Boolean)&& addRequestStatus ==='idle';
// Boolean(title) && Boolean(content) && Boolean(userId);

const userOptions = users.map(user => (
    <option value={user.id} key={user.id}>{user.name}</option>
));

return (
    <section>
        <h1>add post</h1>
        <form >
            <label htmlFor="postTitle">post title:</label>
            <input id="postTitle" name="postTitle" value={title} onChange={onChangeTitle} />
            <label htmlFor="postContent">post content :</label>
            <textarea id="postContent" name="postContent" value={content} onChange={onContentChange}/>
            
            <label htmlFor="postAuthor">post Author:</label>
           <select value={userId} onChange={onAuthorHandle}>
               <option value=""></option>
               {userOptions}
           </select>
        </form>

        <button type="button" onClick={onSavePostClick} disabled={!canSave}>save post</button>
    </section>
)
}