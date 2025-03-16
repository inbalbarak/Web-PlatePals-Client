import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Paper, InputBase, Snackbar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import styles from "./chatbot.style";
import BottomNavbar from "components/BottomNavbar";
import botService from "services/chatbot.service";

export interface ChatMessage {
  content: string;
  role: "assistant" | "user" | "system";
}

const ChatBot = () => {
  const [banner, setBanner] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isUserTurn, setIsUserTurn] = useState<boolean>(true);

  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setMessages([
      {
        content:
          "You are an assistant for recipes, meal ideas, cooking techniques, and ingredients. Only respond with related information, and in plain text with no special formatting, under 300 words",
        role: "system",
      },
      {
        content: "Hi there! What recipe can I help you create today?",
        role: "assistant",
      },
    ]);
  }, []);

  useEffect(() => {
    if (isUserTurn === false) {
      const getBotMessage = async (
        messages: ChatMessage[]
      ): Promise<ChatMessage> => {
        return await botService.getBotResponse(messages);
      };

      if (messages[messages.length - 1].role === "user") {
        getBotMessage(messages)
          .then((message) => {
            setMessages([...messages, message]);
          })
          .catch(() => {
            setBanner(true);
          });
      }
    }
  }, [isUserTurn]);

  useEffect(() => {
    scrollToBottom();
    if (messages.length > 2) {
      setIsUserTurn((prevIsUserTurn) => !prevIsUserTurn);
    }
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSend = async () => {
    if (inputValue.trim() === "") {
      return;
    }

    const userMessage: ChatMessage = {
      content: inputValue,
      role: "user",
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue("");
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.chatContainer}>
        {messages
          .filter((message) => message.role != "system")
          .map((message, index) => (
            <Box key={index} sx={styles.messageRow}>
              <Paper
                sx={{
                  ...styles.messageBubble,
                  ...(message.role === "user"
                    ? styles.userMessage
                    : styles.botMessage),
                }}
              >
                {message.content}
              </Paper>
            </Box>
          ))}
        <div ref={messagesEndRef} />
      </Box>
      <Box sx={styles.inputContainer} onClick={() => inputRef.current?.focus()}>
        <InputBase
          sx={styles.input}
          inputRef={inputRef}
          multiline={true}
          placeholder="Type a reply..."
          value={inputValue}
          onChange={handleInputChange}
          fullWidth
        />
        <Button sx={styles.sendButton} disableRipple onClick={handleSend}>
          <SendIcon />
        </Button>
      </Box>
      <Snackbar
        open={banner}
        autoHideDuration={2000}
        onClose={() => setBanner(false)}
        message="An error accrued while saving the post, try again later"
      />
      <BottomNavbar />
    </Box>
  );
};

export default ChatBot;
