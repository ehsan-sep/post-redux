import React,{useLayoutEffect} from "react";
import {useSelector,useDispatch} from "react-redux"
import {selectAllUsers} from "../users/userSlice"
import {selectAllNotifications,allNotificationRead} from "./notificationSlice"
import {parseISO,formatDistanceToNow} from "date-fns"
import classnames from "classnames"
import {Navbar} from "../../app/Navbar"


export const NotificationsList = ()=>{
    const dispatch = useDispatch();
 const users = useSelector(selectAllUsers);
 const notifications = useSelector(selectAllNotifications);

 useLayoutEffect(()=>{
     dispatch(allNotificationRead())
 })
 const renderedNotification = notifications.map(noti => {
     const date = parseISO(noti.date);
     const timeago = formatDistanceToNow(date);
     const user = users.find(user => user.id === noti.user) || {
         name:'unknown user'
     };
      const notificationClass = classnames('notification',{new : noti.isNew})
     return (
         <div key={noti.id} className={notificationClass}>
             <div>
                 <b>{user.name}</b>{ noti.message}
             </div>
             <div title={noti.date}>
                 <i>{timeago} ago</i>
             </div>
         </div>
     )
 });

 return(
     <>
        
    <Navbar/>
     <section className="notificationsList">
         <h2>Notificatins</h2>
         {renderedNotification}
     </section>
     </>
 )
}