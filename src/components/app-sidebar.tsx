import * as React from 'react';
import {
	AudioWaveform,
	Command,
	Frame,
	GalleryVerticalEnd,
	Map,
	PieChart,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from '@/components/ui/sidebar';
/*  */
// This is sample data.
const data = {
	user: {
		name: 'shadcn',
		email: 'm@example.com',
		avatar: '/avatars/shadcn.jpg',
	},
	teams: [
		{
			name: 'Acme Inc',
			logo: GalleryVerticalEnd,
			plan: 'Enterprise',
		},
		{
			name: 'Acme Corp.',
			logo: AudioWaveform,
			plan: 'Startup',
		},
		{
			name: 'Evil Corp.',
			logo: Command,
			plan: 'Free',
		},
	],
	navMain: [
		{
			title: 'Dashboard',
			url: '/app/dashboard',
			icon: 'icon-[lucide--layout-dashboard]',
		},
		{
			title: 'Chat with Assistant',
			url: '/app/chat',
			icon: 'icon-[lucide--bot]',
		},
		{
			title: 'My Requests',
			url: '/app/requests',
			icon: 'icon-[lucide--file-text]',
		},
		{
			title: 'Agreements',
			url: '/app/agreements',
			icon: 'icon-[lucide--handshake]',
		},
		{
			title: 'Track Progress',
			url: '/app/progress',
			icon: 'icon-[lucide--align-start-vertical]',
		},
		{
			title: 'Shariah Guidance',
			url: '/app/shariah-guidance',
			icon: 'icon-[lucide--book-open]',
		},
	],
	projects: [
		{
			name: 'Design Engineering',
			url: '#',
			icon: Frame,
		},
		{
			name: 'Sales & Marketing',
			url: '#',
			icon: PieChart,
		},
		{
			name: 'Travel',
			url: '#',
			icon: Map,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<span className="text-sm font-medium">ISDBI</span>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				{/* <NavProjects projects={data.projects} /> */}
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
