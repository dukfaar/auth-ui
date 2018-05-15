export default (state = {}, action) => {
    switch (action.type) {
        case 'SET ACCESSTOKEN': return {...state, accessToken: action.token }
        case 'SET REFRESHTOKEN': return {...state, refreshToken: action.token }
        case 'SET LOGINEXPIRETIME': return {...state, expires: action.expires }
        case 'SET USER': return {...state, user: action.user }
        default: return state
    }
}