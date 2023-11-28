import React from 'react'
import UserFooter from '../../../Components/Footer/Userfooter/UserFooter'

function UserHome() {
  return (
  <>
    <div>UserHome</div>
    <UserFooter/>
    </>
  )
}

export default UserHome







{/* <Paper className={classes.sidebar}>
<List>
  {adminName.map((user) => (
   <ListItem
   key={user.id}
   button
   onClick={() => handleSidebarItemClick(user)}
 >
   <ListItemAvatar>
     <Avatar>{user.email.charAt(0)}</Avatar>
   </ListItemAvatar>
   <ListItemText primary={user.email.slice(0, 5)} />
 </ListItem>
  ))}
</List>
</Paper> */}