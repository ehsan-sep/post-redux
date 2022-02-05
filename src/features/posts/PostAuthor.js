import React from "react";
import {useSelector} from "react-redux"



export const PostAuthor = ({userId})=>{
    const author = useSelector(state => state.users.find(user => Number(user.id)===Number(userId)));
   
    return (
        <span>{author ? author.name : "unknown author"}</span>
    )
}

