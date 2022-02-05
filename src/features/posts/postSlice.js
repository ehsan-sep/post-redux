import {createSlice, nanoid} from "@reduxjs/toolkit"

import {sub} from "date-fns"


const initialState =[
    {id:1,title:'first post!',content:'hello',user:1,date:sub(new Date(),{minutes:5}).toISOString()},
    {id:2,title:'second post ' , content:'how are u' , user:0, date:sub(new Date(),{minutes:10}).toISOString()}
]

const postSlice = createSlice({
    name:'posts',
    initialState,
    reducers:{
        // postadded (state,action){
        //     state.push(action.payload)
        // },
        postadded:{
            reducer(state,action){
                state.push(action.payload)
            },
            prepare(title,content,userId){
                return {
                    payload:{
                        id:nanoid(),
                        title,
                        content,
                        user:userId,
                        date:new Date().toISOString()
                    }
                }
            }
        },
        postUpdated(state,action) {
                const {id,title,content}=action.payload;
               const post = state.find(post =>post.id===id)
               if(post){
                   post.content=content;
                   post.title=title;
               }
        }
    }
})

export const {postadded,postUpdated} = postSlice.actions

export default postSlice.reducer;