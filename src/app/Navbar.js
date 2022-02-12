import React from 'react'
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {fetchNotifications,selectAllNotifications} from "../features/notifications/notificationSlice"


export const Navbar = () => {
const dispatch = useDispatch();
  const fetchNewNotifications = ()=>{
    dispatch(fetchNotifications())
  }
 const notifications = useSelector(selectAllNotifications);
 const unreadNotification = notifications.filter(noti => !noti.read).length;
 let unreadNotificationbadge ;
 if(unreadNotification>0){
   unreadNotificationbadge = <span className="badge">{unreadNotification}</span>
 }
  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
          <Link to="/">posts</Link>
          <Link to="/users">Users</Link>
          <Link to="/notifications">Notifications{unreadNotificationbadge}</Link>
          <button className="button" onClick={fetchNewNotifications}>refresh Notifications</button>
          </div>
        </div>
      </section>
    </nav>
  )
}
