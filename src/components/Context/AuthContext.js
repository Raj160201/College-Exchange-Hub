import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import { auth, db } from "../../Config/Config";
import { doc, getDoc } from "firebase/firestore";


const INITIAL_STATE = {
    currentUser: JSON.parse(localStorage.getItem("user")) || null,
    userType: null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const userDocRef = doc(db, "users", user.uid);

                try {
                    const userDocSnapshot = await getDoc(userDocRef);

                    const userData = userDocSnapshot.data();

                    if (userData) {
                        dispatch({
                            type: "SET_USER",
                            payload: {
                                currentUser: userData,
                            },
                        });
                    } else {
                        console.error("User data not found.");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                dispatch({
                    type: "SET_USER",
                    payload: {
                        currentUser: null,
                        userType: null,
                    },
                });
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.currentUser));
    }, [state.currentUser]);

    const setUserType = (userType) => {
        dispatch({ type: "SET_USER_TYPE", payload: userType });
    };

    return (
        <AuthContext.Provider value={{ ...state, setUserType, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
