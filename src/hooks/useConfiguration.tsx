import {
	type ConfigurationI,
	removeUser,
	setConfiguration,
} from '@client/app/contexts/configuration';

import { useAppDispatch, useAppSelector } from './redux';

export function useSetConfiguration<
	T extends PublicUserI | null = PublicUserI | null
>() {
	const dispatch = useAppDispatch();
	const U = useAppSelector((state) => state.configuration);
	const user = U.user as T;
	return {
		user,
		setConfiguration: (configuration: ConfigurationI) => {
			dispatch(setConfiguration(configuration));
		},

		removeUser: () => {
			dispatch(removeUser());
		},
	};
}
function useConfiguration<T extends PublicUserI | null = PublicUserI | null>() {
	const U = useAppSelector((state) => state.configuration);
	const user = U.user as T;
	return {
		user,
	};
}
export default useConfiguration;
