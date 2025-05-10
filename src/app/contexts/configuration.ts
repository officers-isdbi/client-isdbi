import { createSlice } from '@reduxjs/toolkit';

import { localStorageUserID, localStorageWebSiteID } from '&client/web';

interface UserSliceI {
	user: PublicUserI | null;
	/* current: BasicWebSiteI | null;
	websites: BasicWebSiteI[]; */
}
const initial_state: UserSliceI = {
	user: JSON.parse(localStorage.getItem(localStorageUserID) || 'null'),
	/* current: JSON.parse(localStorage.getItem(localStorageWebSiteID.current) || 'null'),
	websites: JSON.parse(localStorage.getItem(localStorageWebSiteID.websites) || '[]'), */
};
export interface ConfigurationI {
	/* websites: BasicWebSiteI[]; */
	user: PublicUserI | null;
}
const configuration = createSlice({
	name: 'configuration',
	initialState: initial_state,
	reducers: {
		setUser: (state, action: { type: string; payload: PublicUserI }) => {
			localStorage.setItem(
				localStorageUserID,
				JSON.stringify(action.payload)
			);
			state.user = action.payload;
		},
		removeUser: (state) => {
			localStorage.removeItem(localStorageUserID);
			state.user = null;
			localStorage.removeItem(localStorageWebSiteID.current);
			//state.current = null;
		},
		/* setCurrentWebSite: (state, action: { type: string; payload: string }) => {
			const currentWebsite = state.websites.find((website) => website._id === action.payload);
			if (currentWebsite) {
				localStorage.setItem(localStorageWebSiteID.current, JSON.stringify(currentWebsite));
				if (currentWebsite._id) localStorage.setItem(localStorageWebSiteID.currentID, currentWebsite._id);
				state.current = currentWebsite;
			} 
		}, */
		setConfiguration: (
			state,
			action: { type: string; payload: ConfigurationI }
		) => {
			if (action.payload.user) {
				state.user = action.payload.user;
				localStorage.setItem(
					localStorageUserID,
					JSON.stringify(action.payload.user)
				);
			}
			/* if (action.payload.websites) {
				state.websites = action.payload.websites;
				localStorage.setItem(
					localStorageWebSiteID.websites,
					JSON.stringify(action.payload.websites)
				);
			} */
		},

		/* clearCurrentWebSite: (state) => {
			localStorage.removeItem(localStorageWebSiteID.current);
			localStorage.removeItem(localStorageWebSiteID.currentID);
			//state.current = null;
		}, */
		/* clearWebSites: (state) => {
			localStorage.removeItem(localStorageWebSiteID.websites);
			//state.websites = [];
		}, */
	},
});

export const {
	setUser,
	removeUser,
	/* setCurrentWebSite, */
	setConfiguration,
	/* clearCurrentWebSite, */
} = configuration.actions;

export default configuration.reducer;
