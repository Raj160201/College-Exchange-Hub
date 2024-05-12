// const AuthReducer = (state, action) => {
//     switch (action.type) {
//         case "LOGIN":
//             return {
//                 ...state,
//                 currentUser: action.payload.currentUser,
//                 userType: action.payload.userType, 
//             };
//         case "LOGOUT":
//             return {
//                 ...state,
//                 currentUser: null,
//                 userType: null,
//             };
//         case "SET_USER_TYPE":
//             return {
//                 ...state,
//                 userType: action.payload,
//             };
//         default:
//             return state;
//     }
// };

// export default AuthReducer;

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                currentUser: action.payload.currentUser,
                userType: action.payload.userType,
            };
        default:
            return state;
    }
};

export default AuthReducer;
