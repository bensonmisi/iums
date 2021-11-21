
export const getters = {

    isAuthenticated(state) {
    
    return state.auth.loggedIn
    
    },
    
    
    loggedInUser(state) {
    
    return state.auth.user
    
    },
    getMenus(state)
    {
        return state.auth.user.menus
    }


    
    }
    