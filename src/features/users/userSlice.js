import {createSlice} from "@reduxjs/toolkit"

const initialState = [
    {id:0,name:'ehsan arabahmadi'},
    {id:1, name :'ali javadi'},
    {id:2 , name:'keyvah jahani'}
]


const userSlice = createSlice({
    name:"users",
    initialState,
    reducers:{

    }
})


export default userSlice.reducer;