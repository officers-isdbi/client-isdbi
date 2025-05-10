declare interface ChatMessageI {
	id: string;
	content: string;
	sender: 'user' | 'bot';
	timestamp: string;
}
