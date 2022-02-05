import {createSlice, nanoid} from "@reduxjs/toolkit"


const initialState =[
    {id:1,title:'first post!',content:'hello'},
    {id:2,title:'second post ....' , content:'how are u'}
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
            prepare(title,content){
                return {
                    payload:{
                        id:nanoid(),
                        title,
                        content
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