import React, { useMemo } from "react";
import {Link,useParams} from "react-router-dom"
import {useSelector} from "react-redux"
import { selectAllPosts} from "../posts/postSlice"
import {selectUserById} from "./userSlice"
import {useGetPostQuery} from "../api/apiSlice"
import {createSelector} from "@reduxjs/toolkit"


export const UserPage = ()=>{
    const userId = useParams().userId;
    const user = useSelector(state=>selectUserById(state,userId));

    // const postForUser = useSelector(state => {
    //     const allPost = selectAllPosts(state)
     
    //   return  allPost.filter(post => post.user===userId)
    // })

    const selectPostForUser =useMemo(()=>{
        return createSelector(
            res => res.data,
            (res,userId)=>userId,
            (data,userId)=> data.find(post =>post.user===userId)
        )
    },[]);

    const {postForUser} =useGetPostQuery(undefined,{
        selectFromResult: res => ({
            ...res,
            postForUser :  selectPostForUser(res,userId)
        })
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