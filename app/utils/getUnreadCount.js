// import isEmpty from 'lodash/isEmpty';

// function getUnreadCount(details) {
//   const groupsWithNotification = [];

//   this.props.getUserGroups(details.authenticatedUserId).then(
//     () => {
//       if (!details.userGroupsLoadingStatus) {
//         const groups = details.groups;

//         if (!isEmpty(groups)) {
//           groups.map((group) => {
//             this.props.getGroupMessagesCount(group.id).then(
//               (res) => {
//                 // map returned message array
//                 let unreadCount = 0;
//                 res.data.map((message) => {
//                   if (!message.read_by.split(',').includes(details.authenticatedUsername)) {
//                     unreadCount = unreadCount + 1;
//                   }
//                 });
//                 groupsWithNotification.push({ id: group.id, name: group.name, unreadCount });
//               }
//             );
//             return groupsWithNotification;
//           });
//         }
//       }
//     });
// }

// export default getUnreadCount;
