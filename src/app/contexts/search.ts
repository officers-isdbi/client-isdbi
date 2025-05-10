import { createSlice } from '@reduxjs/toolkit';
type SearchI = { show: boolean; search: string };
const initial_state: SearchI = { search: '', show: true };

const search = createSlice({
	name: 'search',
	initialState: initial_state,
	reducers: {
		setSearch: (state, { payload }: { type: string; payload: string }) => {
			state.search = payload ?? null;
			return state;
		},
		showSearch: (state, { payload }: { type: string; payload: boolean }) => {
			state.show = payload;
			return state;
		},
	},
});

export const { setSearch, showSearch } = search.actions;

export default search.reducer;
