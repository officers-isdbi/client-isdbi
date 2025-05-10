import { cva } from 'class-variance-authority';

// ChatBubbleMessage
export const chatBubbleMessageVariants = cva('p-4', {
	variants: {
		variant: {
			received:
				'bg-secondary text-secondary-foreground rounded-r-lg rounded-tl-lg',
			sent: 'bg-primary text-primary-foreground rounded-l-lg rounded-tr-lg',
		},
		layout: {
			default: '',
			ai: 'border-t w-full rounded-none bg-transparent',
		},
	},
	defaultVariants: {
		variant: 'received',
		layout: 'default',
	},
});
