interface Chat extends State {
  id: number;
  user: ChatUser;
  last_message: ChatMessage;
  messages: ChatMessage[];
  unread_count: number;
}

interface ChatUser {
  name: string;
  profile_image: string;
}

interface ChatMessage {}

interface ChatState extends State {
  [key: string]: unknown;

  currentChat: Chat | null;
  chatList: Chat[];
}
