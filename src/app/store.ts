import {
	type Action,
	configureStore,
	type ThunkAction,
} from '@reduxjs/toolkit';

import configuration from './contexts/configuration';
import headerSlice from './contexts/header';

const store = configureStore({
	reducer: {
		header: headerSlice,
		configuration,
	},
});

export const dispatch = store.dispatch;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;

export default store;
