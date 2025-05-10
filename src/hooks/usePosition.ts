import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';
import { useLocation } from 'react-router';

// Define the position atom
const positionAtom = atom<{ name: string; url: string }[]>([]);

// Hook to get and set the position atom
export function usePosition() {
	const [positions, setPositions] = useAtom(positionAtom);
	const location = useLocation();

	useEffect(() => {
		const pathSegments = location.pathname.split('/').filter(Boolean);
		const breadcrumb = pathSegments.map(
			(segment: string, index: number) => {
				return {
					name: segment,
					url: `/${pathSegments.slice(0, index + 1).join('/')}`,
				};
			}
		);
		setPositions(breadcrumb);
	}, [location, setPositions]);

	return [positions, setPositions] as const;
}
