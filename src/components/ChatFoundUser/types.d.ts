interface CurrentChatProps {
  chat: Chat;
  chatForm: string;
}

interface Chat {
  id: number;
  user: User;
  last_message: Message;
  messageGroups: MessageGroup[];
  unread_count: number;
}

interface User {
  name: string;
  profile_image: string;
}

interface MessageGroup {
  date: string;
  messages: Message[] | string[];
}

interface Message {
  type: string;
  message: string;
  date: string;
  status?: string;
}
