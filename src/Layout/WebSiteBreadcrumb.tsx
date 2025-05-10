import React from 'react';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { usePosition } from '@/hooks/usePosition';

export default function WebSiteBreadcrumb() {
	const [positions] = usePosition();

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{positions.map((position, index) => (
					<React.Fragment key={index}>
						<BreadcrumbItem
							className={index === 0 ? 'hidden md:block' : ''}
						>
							<BreadcrumbLink href={position.url}>
								{position.name}
							</BreadcrumbLink>
						</BreadcrumbItem>
						{index < positions.length - 1 && (
							<BreadcrumbSeparator className="hidden md:block" />
						)}
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
