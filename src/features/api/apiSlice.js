import {createApi,fetchBaseQuery,} from "@reduxjs/toolkit/query/react"

export const apiSlice = createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({baseUrl:'/fakeApi'}),
    tagTypes:['post'],
    keepUnusedDataFor:10,
    endpoints:builder =>({
        getPosts :builder.query({
            query  : ()=>'/posts',
            providesTags:['post']
        }),
        getPost :builder.query({
            query:postId => `/posts/${postId}`
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
            })
        })

    })
})

export const {useGetPostsQuery,useGetPostQuery,useAddNewPostMutation,useEditPostMutation} = apiSlice