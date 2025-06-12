import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./auth/auth";
import { nextTick } from "vue";
export const useMessageStore = defineStore("message", {
    state: () => ({
        messages: [],
        conversationId: 0,
        ws: null,
        mdl_chat: null,
        mdl_err: null,
        msg_err: "",
        mdl_view_image: null,
        selected_image: null,
    }),

    actions: {
        async fetchMessages(conversationId) {

            const authStore = useAuthStore();
            try {
                const response = await axios.get(`/api/conversations/${conversationId}/messages`, {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${authStore.token}`,
                        "Content-Type": "application/json",
                    },
                });
                this.messages = response.data.data;
            } catch (error) {
                console.error("Error fetching messages:", error);
            }finally {
                this.setupWebSocket(this.conversationId);
                this.scrollToBottom();
            }
        },

        async sendMessage(conversationId, formData) {
            const authStore = useAuthStore();
            try {
                const response = await axios.post(
                    `/api/conversations/${conversationId}/messages`,
                    formData,
                    {
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${authStore.token}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                console.log("Server Response:", response.data);
            } catch (error) {
                console.error("Error sending message:", error);
            } finally {
                this.setupWebSocket(this.conversationId);
            }
        },

        async startConversation(user2_id) {
            const authStore = useAuthStore();
            try {
                const response = await axios.post(
                    `/api/conversations`,
                    { user2_id },
                    {
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${authStore.token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                this.conversationId = response.data.data.id;
                console.log("Server Response:", response.data);
            } catch (error) {
                console.error("Error sending message:", error);
            } finally {
                this.fetchMessages(this.conversationId);
            }
        },

        scrollToBottom() {
            nextTick(() => {
                const chatBody = document.querySelector(".chat-body");
                if (chatBody) {
                  chatBody.scrollTop = chatBody.scrollHeight;
                }
              });
        },

        setupWebSocket(conversationId) {
            if (this.ws) {
                this.ws.close();
            }

            this.ws = new WebSocket(
                `${import.meta.env.VITE_REVERB_SCHEME}://${import.meta.env.VITE_REVERB_HOST}:${import.meta.env.VITE_REVERB_PORT}/app/${import.meta.env.VITE_REVERB_APP_KEY}`
            );

            this.ws.onopen = () => {
                console.log("Connected to WebSocket");
                this.ws.send(
                    JSON.stringify({
                        event: "pusher:subscribe",
                        data: { channel: `conversation.${conversationId}` },
                    })
                );
            };

            this.ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);

                    if (data.event === "message.sent") {
                        console.log("New real-time message:", data);

                        const messageData = typeof data.data === 'string'
                            ? JSON.parse(data.data)
                            : data.data;

                        if (!Array.isArray(this.messages)) {
                            this.messages = [];
                        }

                        if (!this.messages.some(msg => msg.id === messageData.id)) {
                            this.messages.push(messageData);
                            this.scrollToBottom();
                        }
                    }
                } catch (error) {
                    console.error("Error parsing WebSocket message:", error, event.data);
                }
            };


            this.ws.onerror = (error) => console.error("WebSocket error:", error);
            this.ws.onclose = () => console.log("WebSocket disconnected");
        }
    },
});
