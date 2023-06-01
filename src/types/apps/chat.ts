type attachType = {
	icon?: string;
	file?: string;
	fileSize?: string;
};

export type MessageType = {
	createdAt?: any;
	msg: string;
	senderId: number | string;
	type: string;
	id: string;
};

export interface ChatsType {
	id: number | string;
	name: string;
	excerpt: string;
	chatHistory?: any[];
	messages: MessageType[];
}
