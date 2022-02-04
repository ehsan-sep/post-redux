import {createSlice} from "@reduxjs/toolkit"


const initialState =[
    {id:1,title:'first post!',content:'hello'},
    {id:2,title:'second post ....' , content:'how are u'}
]

const postSlice = createSlice({
    name:'posts',
    initialState,
    reducers:{
        postadded (state,action){
            state.push(action.payload)
        }
    }
})

export const {postadded} = postSlice.actions

export default postSlice.reducer;