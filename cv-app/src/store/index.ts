import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import { AccountService, UserService } from '../services/account';
import { ChatService } from '../services/chat';
import { FileService } from '../services/fileService';
import { ProjectService } from '../services/project';
import { RefService } from '../services/refService';
import { TeamService } from '../services/team';
import { TemplatteService } from '../services/template';
import userReducer from './userSlice';
export const store = configureStore({
    reducer: {
        currentUser: userReducer,
        // Add the generated reducer as a specific top-level slice 
        [AccountService.reducerPath]: AccountService.reducer,
        [UserService.reducerPath]: UserService.reducer,
        [ProjectService.reducerPath]: ProjectService.reducer,
        [TeamService.reducerPath]: TeamService.reducer,
        [FileService.reducerPath]: FileService.reducer,
        [ChatService.reducerPath]: ChatService.reducer,
        [RefService.reducerPath]: RefService.reducer,
        [TemplatteService.reducerPath]: TemplatteService.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ serializableCheck: false })
            .concat(AccountService.middleware)
            .concat(UserService.middleware)
            .concat(ProjectService.middleware)
            .concat(TeamService.middleware)
            .concat(FileService.middleware)
            .concat(ChatService.middleware)
            .concat(RefService.middleware)
            .concat(TemplatteService.middleware);
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
setupListeners(store.dispatch)
