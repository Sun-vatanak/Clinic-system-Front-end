<template>
  <div class="modal fade modal-chat" id="modal_chat" tabindex="-1" data-bs-backdrop="static">
    <div class="modal-dialog modal-dialog-centered bg-transparent">
      <div class="modal-content bg-transparent border-0">
        <div class="card rounded rounded-4 border-0">
          <div
            class="card-header d-flex align-items-center justify-content-between bg-primary p-3 rounded-4 rounded-bottom-0">
            <span class="d-flex gap-2 align-items-center">
              <span class=""><i class="bi bi-chat-left-text fs-4 text-white"></i></span>
              <h1 class="fs-5 fw-semibold mb-1 text-white">ជជែកផ្ទាល់</h1>
            </span>
            <span class="cursor-pointer" @click="closeModalChat">
              <i class="bi bi-x-lg fs-5 text-white"></i>
            </span>
          </div>
          <div class="card-body chat-body d-flex flex-column gap-4 pt-4 position-relative" ref="chatContainer">
            <div class="messages" ref="messagesContainer">
              <template v-for="(msg, index) in messageStore.messages" :key="msg.id">
                <!-- Date Separator -->
                <div v-if="shouldShowDate(index)" class="date-separator">
                  {{ formatDate(msg.created_at) }}
                </div>

                <div class="message">
                  <div v-if="msg.message">
                    <span :class="{
                    'text-end mb-1': msg.sender_id === authStore.user.profile.id,
                    'text-start mb-1': msg.sender_id !== authStore.user.profile.id
                  }" class="time-create d-block">{{ formatTime(msg.created_at) }}</span>
                  </div>
                  <div :class="{
                    'right ms-auto': msg.sender_id === authStore.user.profile.id,
                    'left me-auto': msg.sender_id !== authStore.user.profile.id
                  }" class="mb-3 py-1 message-context">
                    <p class="p-0 m-0">
                      {{ msg.message }}
                    </p>
                  </div>

                  <div v-if="msg.images && msg.images.length > 0" class="d-flex flex-column" :class="{
                    'align-items-end': msg.sender_id === authStore.user.profile.id,
                    'align-items-start': msg.sender_id !== authStore.user.profile.id
                  }">
                    <img v-for="image in msg.images" :key="image.id" :src="image.photo" @click="viewImage(image.photo)"
                      alt="Chat Image" class="chat-image mb-2" />
                  </div>
                </div>
              </template>
            </div>
          </div>
          <div class="card-footer border-0 shadow py-2 bg-transparent border-1 d-flex flex-column gap-2">
            <!-- Image Preview Section -->
            <div v-if="selectedImages.length" class="d-flex gap-3">
              <div v-for="(image, index) in selectedImages" :key="index" class="image-preview">
                <img :src="image.preview" alt="Selected image" class="preview-img" />
                <button class="btn btn-clos" @click="removeImage(index)">
                  <i class="bi bi-x-circle-fill"></i>
                </button>
              </div>
            </div>

            <!-- Chat Input Section -->
            <div class="d-flex align-items-center justify-content-between">
              <button type="button" class="btn btn-upload-image ps-0" @click="uploadImage">
                <i class="bi bi-plus-circle fs-2"></i>
              </button>
              <input type="file" id="loadFile" class="d-none" @change="handleFileUpload" accept="image/*" multiple
                ref="fileInput" />
              <form @submit.prevent="sendMessage" class="w-100 d-flex" @keydown.enter.prevent="sendMessage">
                <input type="text" class="form-control rounded-5 text-chat form-control-custom" v-model="newMessage"
                  placeholder="សរសេរសាររបស់អ្នកនៅទីនេះ....." ref="textInput" />
                <button type="submit" v-if="!(!newMessage.trim() && selectedImages.length === 0) || isSending"
                  class="btn btn-send-image ms-2">
                  <i class="bi bi-send-fill me-2"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Modal } from "bootstrap";
import { ref, onMounted, nextTick } from "vue";
import { useMessageStore } from "@/stores/views/message_store";
import { useAuthStore } from "@/stores/views/auth/auth";
import { format } from 'date-fns';

const messageStore = useMessageStore();
const authStore = useAuthStore();
const newMessage = ref("");
const messagesContainer = ref(null);
const isSending = ref(false);
const textInput = ref(null);

const acceptedTypes = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
const maxFileSize = 1 * 1024 * 1024;


const selectedImages = ref([]);
const fileInput = ref(null);

const uploadImage = () => {
  fileInput.value.click();
};

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files);

  files.forEach((file) => {
    if (!acceptedTypes.includes(file.type)) {
      messageStore.mdl_chat.hide();
      messageStore.msg_err = "ប្រភេទឯកសារមិនត្រឹមត្រូវ! អនុញ្ញាតតែឯកសារប្រភេទ JPG, JPEG, PNG និង WEBP";
      messageStore.mdl_err.show();
    } else if (file.size > maxFileSize) {
      messageStore.mdl_chat.hide();
      messageStore.msg_err = "ឯកសារមានទំហំធំពេក! ទំហំអតិបរមាដែលអនុញ្ញាតគឺ ១MB";
      messageStore.mdl_err.show();
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        selectedImages.value.push({ file, preview: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  });

  event.target.value = '';
  textInput.value.focus();
};



const removeImage = (index) => {
  selectedImages.value.splice(index, 1);
};

const sendMessage = async () => {
  if (
    (!newMessage.value.trim() && selectedImages.value.length === 0) ||
    isSending.value
  )
    return;

  isSending.value = true;

  const formData = new FormData();
  formData.append("message", newMessage.value.trim());

  selectedImages.value.forEach((imageObj, index) => {
    formData.append(`images[${index}]`, imageObj.file);
  });

  try {
    await messageStore.sendMessage(messageStore.conversationId, formData);
    newMessage.value = "";
    selectedImages.value = [];
  } catch (error) {
    console.error("Error sending message:", error);
  } finally {
    isSending.value = false;
  }
};


const closeModalChat = () => {
  messageStore.mdl_chat.hide();
};

onMounted(() => {
  messageStore.mdl_chat = Modal.getOrCreateInstance(
    document.getElementById("modal_chat"),
    { keyboard: false }
  );

  fileInput.value.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') e.preventDefault();
  });
});

const viewImage = (image) => {
  messageStore.mdl_chat.hide();
  messageStore.selected_image = image;
  messageStore.mdl_view_image.show();
};


// date format
const shouldShowDate = (index) => {
  if (index === 0) return true;
  const prevMessage = messageStore.messages[index - 1];
  const currMessage = messageStore.messages[index];

  return !isSameDay(prevMessage.created_at, currMessage.created_at);
};

const isSameDay = (date1, date2) => {
  return format(new Date(date1), 'yyyy-MM-dd') === format(new Date(date2), 'yyyy-MM-dd');
};

const formatDate = (date) => {
  return format(new Date(date), 'MMMM d, yyyy');
};

const formatTime = (date) => {
  return format(new Date(date), 'h:mm a');
};
</script>

<style scoped>
.image-preview {
  position: relative;
  width: 60px;
  height: 60px;
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.btn-clos {
  position: absolute;
  top: -15px;
  right: -15px;
  cursor: pointer;
}

.chat-image {
  max-width: 100px;
  height: auto;
  border-radius: 8px;
  cursor: pointer;
}

.date-separator {
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  color: #888;
  margin: 10px 0;
}

/* chat system */

.message-context {
  padding: 8px;
  max-width: 80%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  display: flex;
  flex-direction: column;
  position: relative;
}

.left {
  background-color: var(--hr);
  width: fit-content;
  border-radius: 1.5px 20px 20px 20px !important;
  color: #000000;
  padding: 10px;
  white-space: pre-wrap;
  word-break: break-word;
}

.right {
  background-color: var(--hr);
  width: fit-content;
  border-radius: 20px 1.5px 20px 20px !important;
  color: #000000;
  padding: 10px;
  white-space: pre-wrap;
  word-break: break-word;
}

.modal-chat .chat-body {
  height: 420px !important;
  overflow-y: auto;
  scroll-behavior: smooth;
}

.modal-chat .form-control-custom {
  border: none !important;
}

.text-chat {
  background-color: var(--hr) !important;
  padding-top: 6.9px !important;
  padding-bottom: 6.9px !important;
}

.modal-chat .btn-upload-image {
  border: none !important;
}

.modal-chat .btn-upload-image i {
  font-weight: lighter;
  opacity: 0.7;
}

.modal-chat .btn-send-image {
  cursor: pointer;
  border: none !important;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: var(--primary);
  display: flex;
  padding: 18px;
  justify-content: center;
  align-items: center;
}

.modal-chat .btn-send-image i {
  display: block;
  color: var(--white);
  transform: rotate(46.8deg);
  margin-top: 1.5px;
  font-size: 17.5px;
}

.modal-chat .chat-body {
  height: 420px !important;
  overflow-y: auto;
  scroll-behavior: smooth;
}

.time-create {
  font-size: 12px;
  margin-left: 10px;
}
</style>
