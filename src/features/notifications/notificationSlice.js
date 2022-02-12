import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import {client} from "../../api/client"

export const fetchNotifications = createAsyncThunk("notifications/fetchNotifications",
    async (_,{getState}) => {
        const allNotifications = selectAllNotifications(getState());
        const [latestNotification]= allNotifications;
        const latestTimespan = latestNotification ? latestNotification.date : '';
        const response = await client.get(`/fakeApi/notifications?since=${latestTimespan}`);
        return response.data
    }
)

const notificationsSlice = createSlice({
    name:'notifications',
    initialState:[],
    reducers:{
        allNotificationRead (state,action){
            state.forEach(noti => {
                noti.read=true;
            })
        }
    },
    extraReducers :{
        [fetchNotifications.fulfilled] : (state,action)=>{
            state.push(...action.payload);
            state.forEach(noti =>{
                noti.isNew = !noti.read;
            })
            state.sort((a,b)=> b.date.localeCompare(a.date))
        }
    }

})

export const {allNotificationRead} = notificationsSlice.actions
export default notificationsSlice.reducer;

export const selectAllNotifications =state => state.notifications