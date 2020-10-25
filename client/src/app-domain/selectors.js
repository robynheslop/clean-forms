const selectIsUserLoggedIn = (state) => state?.appDomain?.session?.isLoggedIn

const selectIsLogInPending = (state) => state?.appDomain?.session?.isLogInPending

const selectIsSignUpPending = state => state?.appDomain?.session?.isSignUpPending

const selectIsLogInRejected = (state) => state?.appDomain?.session?.isLogInRejected

const selectIsSignUpRejected = state => state?.appDomain?.session?.isSignUpRejected

const selectToken = (state) => state?.appDomain?.session?.token

const selectUserId = (state) => state?.appDomain?.session?.userId

export default { 
    selectToken, 
    selectIsUserLoggedIn, 
    selectIsLogInPending, 
    selectIsSignUpPending, 
    selectUserId,
    selectIsSignUpRejected,
    selectIsLogInRejected
};