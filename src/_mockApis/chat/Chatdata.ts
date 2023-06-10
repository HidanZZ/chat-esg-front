import mock from "../mock";
import { Chance } from "chance";
import type { ChatsType } from "../../types/apps/chat";
import { sub } from "date-fns";
import { uniqueId } from "lodash";

const chance = new Chance();

const ChatData: ChatsType[] = [
	{
		id: 1,
		name: "ESG Assistant",
		excerpt: "Theme Developer",
		messages: [],
	},
];

mock.onGet("/api/data/chat/ChatData").reply(() => {
	return [200, ChatData];
});

export default ChatData;
