'use client';

import { ChevronRight } from 'lucide-react';

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Link } from 'react-router';
interface NavItem {
	title: string;
	url: string;
	icon?: string;
	isActive?: boolean;
	items?: NavItem[];
}
export function NavMain({ items }: { items: NavItem[] }) {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Platform</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
					<Collapsible
						key={item.title}
						asChild
						defaultOpen={item.isActive}
						className="group/collapsible"
					>
						<SidebarMenuItem>
							<CollapsibleTrigger asChild>
								<Link to={item.url}>
									<SidebarMenuButton tooltip={item.title}>
										{item.icon && (
											<span
												className={cn(
													item.icon,
													'w-4 h-4 shrink-0'
												)}
											/>
										)}
										<span>{item.title}</span>
										{item.items && item.items.length > 0 ? (
											<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
										) : null}
									</SidebarMenuButton>
								</Link>
							</CollapsibleTrigger>
							<CollapsibleContent>
								<SidebarMenuSub>
									{item.items?.map((subItem) => (
										<SidebarMenuSubItem key={subItem.title}>
											<SidebarMenuSubButton asChild>
												<Link to={subItem.url}>
													<span>{subItem.title}</span>
												</Link>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
									))}
								</SidebarMenuSub>
							</CollapsibleContent>
						</SidebarMenuItem>
					</Collapsible>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
