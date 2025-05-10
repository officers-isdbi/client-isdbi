import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { ChatInput } from '@/components/ui/chat/chat-input';
import { Button } from '@/components/ui/button';
import { CornerDownLeft, Mic, Paperclip } from 'lucide-react';
import { sendChat } from '@/api/endpoints/chat';
import { useNavigate } from 'react-router';

export default function NewChatBot() {
	const [newMessage, setNewMessage] = useState('');
	const navigate = useNavigate();
	const sendMessageMutation = useMutation<
		ChatMessageI,
		Error,
		string,
		{ previousMessages: ChatMessageI[] | undefined }
	>({
		mutationFn: async (message: string): Promise<ChatMessageI> => {
			const response = await sendChat({ message, id: 'new' });
			if (response.success === false) {
				throw new Error('Failed to send message');
			}

			return response.data;
		},
		onSuccess: (data) => {
			navigate('/app/chat/' + data.conversationId);
		},
	});

	const sendMessage = () => {
		if (newMessage.trim()) {
			sendMessageMutation.mutate(newMessage);
			setNewMessage('');
		}
	};

	return (
		<div className="flex flex-col h-full">
			<h1 className="text-4xl text-center mb-16">
				Chat with our Assistance
			</h1>
			<form className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1">
				<ChatInput
					value={newMessage}
					disabled={sendMessageMutation.isPending}
					onChange={(e) => setNewMessage(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter' && !e.shiftKey) {
							e.preventDefault();
							sendMessage();
						}
					}}
					placeholder="Type your message..."
					className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
				/>
				<div className="flex items-center p-3 pt-0">
					<Button variant="ghost" size="icon">
						<Paperclip className="size-4" />
						<span className="sr-only">Attach file</span>
					</Button>

					<Button variant="ghost" size="icon">
						<Mic className="size-4" />
						<span className="sr-only">Use Microphone</span>
					</Button>

					<Button size="sm" className="ml-auto gap-1.5">
						Send Message
						<CornerDownLeft className="size-3.5" />
					</Button>
				</div>
			</form>
		</div>
	);
}
