interface CurrentChatProps {
  chat: Chat;
  chatForm: string;
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
