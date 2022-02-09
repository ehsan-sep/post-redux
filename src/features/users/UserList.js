import React from "react";

import {Link} from "react-dom"

import { useSelector } from "react-redux";
import {selectAllUser} from "./userSlice"


export const UserList =() => {
    const users = useSelector(selectAllUser)
    const renderUser = users.map(user =>(
            <li key={user.id}>
                <Link to={`/users/${user.id}`} >{user.name}</Link>
            </li>
        )
    )

    return (
        <section>
        <h1>users</h1>
        <ul>{renderUser}</ul>
        </section>
    )
}

