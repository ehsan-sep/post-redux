import React from "react";
import {useSelector} from "react-redux"
import {selectUserById} from "../users/userSlice"


export const PostAuthor = ({userId})=>{
    // const author = useSelector(state => state.users.find(user => user.id===userId));
        const author = useSelector(state => selectUserById(state,userId))
    return (
        <span>{author ? author.name : "unknown author"}</span>
    )
}

