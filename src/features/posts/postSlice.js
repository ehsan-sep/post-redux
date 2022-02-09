import {createSlice, nanoid,createAsyncThunk} from "@reduxjs/toolkit"
import {client} from "../../api/client"

import {sub} from "date-fns"


// const initialState =[
//     {id:1,title:'first post!',content:'hello',user:1,date:sub(new Date(),{minutes:5}).toISOString(),reactions :{
//         thumbsUp: 0,
//         hooray: 0,
//         heart: 0,
//         rocket: 0,
//         eyes: 0
//     }},
//     {id:2,title:'second post ' , content:'how are u' , user:0, date:sub(new Date(),{minutes:10}).toISOString(),reactions :{
//         thumbsUp: 0,
//         hooray: 0,
//         heart: 0,
//         rocket: 0,
//         eyes: 0
//     }}
// ]

const initialState = {
    status:'idle',
    posts:[],
    error:null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts',async ()=>{
 const response = await client.get('/fakeApi/posts');
 return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost',async (initialpost)=>{
    const response = await client.post('/fakeApi/posts', initialpost);
    debugger;
    return response.data
})

const postSlice = createSlice({
    name:'posts',
    initialState,
    reducers:{
        // postadded (state,action){
        //     state.push(action.payload)
        // },
        // postadded:{
        //     reducer(state,action){
        //         state.posts.push(action.payload)
        //     },
        //     prepare(title,content,userId){
        //         return {
        //             payload:{
        //                 id:nanoid(),
        //                 title,
        //                 content,
        //                 user:userId,
        //                 date:new Date().toISOString(),
        //                 reactions :{
        //                     thumbsUp: 0,
        //                     hooray: 0,
        //                     heart: 0,
        //                     rocket: 0,
        //                     eyes: 0
        //                 }
        //             }
        //         }
        //     }
        // },

        postUpdated(state,action) {
                const {id,title,content}=action.payload;
               const post = state.posts.find(post =>post.id===id)
               if(post){
                   post.content=content;
                   post.title=title;
               }
        },
        reactionAdded(state,action){
            const {postId,reaction}=action.payload;
            debugger;
            const existingpost = state.posts.find(post=>post.id==postId);
            existingpost.reactions[reaction]++
        }
    },
    extraReducers : (builder) => {
        builder.addCase(fetchPosts.pending,(state,action)=>{
            state.status="loading"
        }).addCase(fetchPosts.fulfilled,(state,action)=>{
            state.status="succeeded";
            state.posts = state.posts.concat(action.payload)
        }).addCase(fetchPosts.rejected,(state,action)=>{
            state.status="failed";
            state.error =action.error.message
        }).addCase(addNewPost.fulfilled,(state,action)=>{
            state.posts.push(action.payload)
        })
    }

})

export const {postUpdated,reactionAdded} = postSlice.actions

export default postSlice.reducer;

export const selectAllPosts = (state) => state.posts.posts

export const selectPostById = (state,postId)=> state.posts.posts.find(post => post.id == postId)