import ChatDataSlice, { ChatData } from "@/features/chatData/ChatDataSlice";
import { configureStore } from "@reduxjs/toolkit";

export interface ChatDataReducer {
    ChatData: ChatData;
}

const store = configureStore({
    reducer: {
        ChatData: ChatDataSlice,
    },
});

export default store;
