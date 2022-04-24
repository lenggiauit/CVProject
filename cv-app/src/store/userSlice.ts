import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { number } from 'yup/lib/locale';
import { User } from '../services/models/user';
import { GlobalKeys } from '../utils/constants';
import { decrypt, encrypt } from '../utils/crypter';

interface CurrentUserState {
    currentUser: any
}
const initialState = { currentUser: null } as CurrentUserState

export const userSlice = createSlice({
    name: 'currentUser',
    initialState: initialState,
    reducers: {
        setAuthenticateUser: (state, action: PayloadAction<any>) => {
            state.currentUser = action.payload;
            localStorage.setItem(GlobalKeys.LoggedUserKey, encrypt(action.payload));
        },
        userLogout: (state) => {
            state.currentUser = null;
            localStorage.clear();
        },
    },
});

export const { setAuthenticateUser, userLogout } = userSlice.actions;

export const selectUser = (state: { currentUser: User; }) => {

    return state.currentUser;
}

export default userSlice.reducer;


