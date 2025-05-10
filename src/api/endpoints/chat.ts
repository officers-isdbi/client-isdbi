import axiosConfig from '$client';

export async function sendChat({
	message,
	id,
}: {
	message: string;
	id: string | 'new';
}) {
	return (
		await axiosConfig.post<ResponseI<ChatMessageI>>(`/consultation/${id}`, {
			message,
		})
	).data;
}

export async function getChatHistory(id: string | null) {
	if (!id) {
		throw new Error('No id provided');
	}
	return (
		await axiosConfig.get<ResponseI<ChatMessageI[]>>(`/consultation/${id}`)
	).data;
}
