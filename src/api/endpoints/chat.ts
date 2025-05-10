import axiosConfig from '$client';

export async function sendChat({ message }: { message: string }) {
	return (
		await axiosConfig.post<ResponseI<ChatMessageI>>('/chat', { message })
	).data;
}

export async function getChatHistory() {
	return (await axiosConfig.get<ResponseI<ChatMessageI[]>>('/chat/history'))
		.data;
}
