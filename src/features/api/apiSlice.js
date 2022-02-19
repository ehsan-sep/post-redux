import {createApi,fetchBaseQuery,} from "@reduxjs/toolkit/query/react"

export const apiSlice = createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({baseUrl:'/fakeApi'}),
    tagTypes:['post'],
    keepUnusedDataFor:120,
    endpoints:builder =>({
        getPosts :builder.query({
            query  : ()=>'/posts',
            providesTags:(result=[] , erro,arg)=>(
            ['post',
            ...result.map(({id})=>({type:'post',id}))
            ])
        }),
        getPost :builder.query({
            query:postId => `/posts/${postId}`,
            providesTags:(result,error,arg)=>[{type:'post',id:arg}]
        }),
        addNewPost: builder.mutation({
            query:initialPost => ({
                url:'/posts',
                method:'POST',
                body:initialPost
            }),
            invalidatesTags:['post']
        }),
        editPost : builder.mutation({
            query:post => ({
               url:`/posts/${post.id}` ,
               method:'PATCH',
               body:post
            }),
            invalidatesTags:(result,error,arg)=>([{type:'post',id:arg.id}])
        }),
        // getUsers :builder.query({
        //     query: () => '/users'
        // })

    })
})

export const {useGetPostsQuery,useGetPostQuery,useAddNewPostMutation,useEditPostMutation} = apiSlice

console.log(apiSlice)