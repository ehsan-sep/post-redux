import React from "react";
import {Link,useParams} from "react-router-dom"
import {useSelector} from "react-redux"
import { selectAllPosts} from "../posts/postSlice"
import {selectUserById} from "./userSlice"


export const UserPage = ()=>{
    const userId = useParams().userId;
    const user = useSelector(state=>selectUserById(state,userId));

    const postForUser = useSelector(state => {
        const allPost = selectAllPosts(state)
     
      return  allPost.filter(post => post.user===userId)
    })

    const postTitleUser = postForUser.map(post =>(
        <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ))

    return(
        <section>
        <h1>{user.name}</h1>
        {postTitleUser}

        </section>
    )
}