import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
	ChatBubble,
	ChatBubbleMessage,
	ChatBubbleTimestamp,
} from '@/components/ui/chat/chat-bubble';
import { ChatInput } from '@/components/ui/chat/chat-input';
import { ChatMessageList } from '@/components/ui/chat/chat-message-list';
import { Button } from '@/components/ui/button';
import { CornerDownLeft, Mic, Paperclip } from 'lucide-react';
import { getChatHistory, sendChat } from '@/api/endpoints/chat';
import { useParams } from 'react-router';

export default function ChatBotConversation() {
	const queryClient = useQueryClient();
	const [newMessage, setNewMessage] = useState('');
	const { conversationId } = useParams();
	const { data: messages = [], isLoading: isFetchingHistory } = useQuery<
		ChatMessageI[]
	>({
		queryKey: ['chatHistory', conversationId],
		queryFn: async (): Promise<ChatMessageI[]> => {
			if (!conversationId) {
				throw new Error('No conversation ID provided');
			}
			const response = await getChatHistory(conversationId);
			if (response.success === false) {
				throw new Error('Failed to fetch chat history');
			}
			return response.data;
		},
		enabled: !!conversationId,
	});

	const sendMessageMutation = useMutation<
		ChatMessageI,
		Error,
		string,
		{ previousMessages: ChatMessageI[] | undefined }
	>({
		mutationFn: async (message: string): Promise<ChatMessageI> => {
			if (!conversationId) {
				throw new Error('No conversation ID provided');
			}
			const response = await sendChat({ message, id: conversationId });
			if (response.success === false) {
				throw new Error('Failed to send message');
			}
			return response.data;
		},
		/* 	onSuccess: (data) => {
			queryClient.setQueryData<Message[]>(['chatHistory'], (old) => [
				...(old || []),
				{
					id: data.id,
					content: data.content,
					sender: 'bot',
					timestamp: new Date().toISOString(),
				},
			]);
		}, */
		onMutate: async (message) => {
			await queryClient.cancelQueries({ queryKey: ['chatHistory'] });

			const previousMessages = queryClient.getQueryData<ChatMessageI[]>([
				'chatHistory',
			]);

			queryClient.setQueryData<ChatMessageI[]>(['chatHistory'], (old) => [
				...(old || []),
				{
					id: Date.now().toString(),
					content: message,
					sender: 'user',
					conversationId: conversationId!,
					timestamp: new Date().toISOString(),
				},
			]);

			return { previousMessages };
		},
		onError: (
			_err: Error,
			_message: string,
			context?: { previousMessages: ChatMessageI[] | undefined }
		) => {
			if (context?.previousMessages) {
				queryClient.setQueryData(
					['chatHistory'],
					context.previousMessages
				);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['chatHistory'] });
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
			<ChatMessageList className="flex-1 overflow-y-auto">
				{messages.map((message) => (
					<ChatBubble
						key={message.id}
						variant={
							message.sender === 'user' ? 'sent' : 'received'
						}
					>
						<ChatBubbleMessage>{message.content}</ChatBubbleMessage>
						<ChatBubbleTimestamp
							timestamp={new Date(
								message.timestamp
							).toLocaleTimeString()}
						/>
					</ChatBubble>
				))}
				{isFetchingHistory && (
					<ChatBubble variant="received">
						<ChatBubbleMessage isLoading={true} />
					</ChatBubble>
				)}
			</ChatMessageList>
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
