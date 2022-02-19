import {createSlice,createAsyncThunk, createSelector} from "@reduxjs/toolkit"

import {client} from "../../api/client"

import {apiSlice} from "../api/apiSlice"

// const initialState = [
//     {id:0,name:'ehsan arabahmadi'},
//     {id:1, name :'ali javadi'},
//     {id:2 , name:'keyvah jahani'}
// ]
//  const initialState = []

// export const fetchUsers = createAsyncThunk('users/fetchusers' , async ()=>{
//     const response = await client.get('/fakeApi/users');
//     return response.data
// })

// const userSlice = createSlice({
//     name:"users",
//     initialState,
//     reducers:{},
//     extraReducers :(builder) =>{
//         builder.addCase(fetchUsers.fulfilled,(state,action)=>{
//             return action.payload
//             // debugger;
//         })
//     }

// })

// console.log(userSlice.reducer({type:''}))

// export default userSlice.reducer;

// export const selectAllUsers = state => state.users;

// export const selectUserById = (state , userId) => state.users.find(user => user.id===userId)

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints :builder => ({
        getUsers : builder.query({
            query:() => "/users"
        })
    })
})

export const {useGetUsersQuery}=extendedApiSlice
export const selectUserResult = extendedApiSlice.endpoints.getUsers.select();

const emptyUser = [];

export const selectAllUsers = createSelector(
    selectUserResult,
    userResult => userResult?.data ?? emptyUser
)

export const selectUserById = createSelector(
    selectAllUsers,
    (state,userId) => userId,
    (users,userId) => users.find(user => user.id ===userId)
)
