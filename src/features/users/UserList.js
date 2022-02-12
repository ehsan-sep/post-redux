import React from "react";
import {Link,Outlet} from "react-router-dom"
import { useSelector } from "react-redux";
import {selectAllUsers} from "./userSlice"
import {Navbar} from "../../app/Navbar"

export const UsersList =() => {
    const users = useSelector(selectAllUsers)
    const renderUser = users.map(user =>(
            <li key={user.id}>
                <Link to={`/users/${user.id}`} >{user.name}</Link>
            </li>
        )
    )

    return (
        <>
        <Navbar/>
        <section>
        <h1>users</h1>
        <ul>{renderUser}</ul>
        </section>
        <Outlet/>
        </>
        
    )
}



