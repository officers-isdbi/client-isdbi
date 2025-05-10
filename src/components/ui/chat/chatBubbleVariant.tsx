import { cva } from 'class-variance-authority';

// ChatBubble
export const chatBubbleVariant = cva(
	'flex gap-2 max-w-[60%] items-end relative group',
	{
		variants: {
			variant: {
				received: 'self-start',
				sent: 'self-end flex-row-reverse',
			},
			layout: {
				default: '',
				ai: 'max-w-full w-full items-center',
			},
		},
		defaultVariants: {
			variant: 'received',
			layout: 'default',
		},
	}
);
