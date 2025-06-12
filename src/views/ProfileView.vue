<template>
  <section class="profile-setting pb-4 section-spacing">
    <div class="container p-0">
      <div class="row gap-3 px-0 px-sm-2">
        <div class="col-12 mb-1">
          <div
            class="box row bg-white gap-3 rounded-4 py-4 px-3 d-md-flex align-items-center"
          >
            <div class="position-relative col-md-6 m-auto m-md-0 main-box-pf">
              <div class="overflow-hidden rounded-circle border pf-box">
                <img
                  :src="
                    ProfileStore.crop.avatar
                      ? `${ProfileStore.crop.avatar}`
                      : '/default.png'
                  "
                  class="w-100"
                  style=""
                  alt=""
                />
              </div>
            </div>
            <div
              class="d-flex flex-row col-md-6 flex-sm-column gap-3"
              style="width: 160px"
            >
              <input
                type="file"
                id="file_img1"
                @change="onSelectedImage($event, 1)"
                class="d-none"
              />
              <input
                type="file"
                id="file_img2"
                @change="onSelectedImage($event, 2)"
                class="d-none"
              />
              <button
                class="btn btn-outline-primary border border-primary px-3 px-sm-4 p-2 d-flex align-items-center gap-2 rounded-5"
                @click="onEditProfile()"
              >
                <i class="bi bi-pencil-square"></i>
                <span class="d-none d-sm-flex"> ប្តូររូបថត</span>
              </button>

              <button
                class="btn btn-outline-danger px-3 px-sm-4 p-2 d-flex align-items-center gap-2 rounded-5"
                @click="openModalDelete"
              >
                <i class="bi bi-trash3-fill"></i>
                <span class="d-none d-sm-flex">លុបរូបថត</span>
              </button>
            </div>
          </div>
        </div>
        <div class="col-12 mb-1 p-0">
          <div class="card border-0 rounded-4">
            <div class="card-body d-flex flex-column gap-2">
              <div>
                <p class="mb-0 fw-semibold fs-5">កែប្រែព័ត៌មាន</p>
              </div>
              <form action="" class="row g-3 mt-0" @submit.prevent="onSaveInfo">
                <div class="col-md-6" :disabled="isLoading">
                  <div class="input-field position-relative">
                    <input
                      id="fname"
                      class="form-control"
                      placeholder=""
                      :class="{
                        'is-invalid border border-danger':
                          ProfileStore.vv?.first_name?.$error,
                      }"
                      v-model="ProfileStore.frm.first_name"
                    />
                    <label for="fname" class="form-label">នាមត្រកូល</label>
                  </div>
                  <div
                    class="text-danger d-block small invalid-feedback"
                    v-if="ProfileStore.vv?.first_name?.$error"
                  >
                    {{ ProfileStore.vv.first_name.$errors[0].$message }}
                  </div>
                </div>
                <div class="col-md-6" :disabled="isLoading">
                  <div class="input-field position-relative">
                    <input
                      id="lname"
                      class="form-control"
                      placeholder=""
                      :class="{
                        'is-invalid border border-danger':
                          ProfileStore.vv?.last_name?.$error,
                      }"
                      v-model="ProfileStore.frm.last_name"
                    />
                    <label for="lname" class="form-label">នាមខ្លួន</label>
                  </div>
                  <div
                    class="text-danger small d-block invalid-feedback"
                    v-if="ProfileStore.vv?.last_name?.$error"
                  >
                    {{ ProfileStore.vv.last_name.$errors[0].$message }}
                  </div>
                </div>
                <div class="col-md-6" :disabled="isLoading">
                  <div class="input-field position-relative">
                    <input
                      id="address"
                      class="form-control"
                      placeholder=""
                      :class="{
                        'is-invalid border border-danger':
                          ProfileStore.vv?.address?.$error,
                      }"
                      v-model="ProfileStore.frm.address"
                    />
                    <label for="address" class="form-label">អាសយដ្ឋានរបស់អ្នក</label>
                  </div>
                  <div
                    class="text-danger small d-block invalid-feedback"
                    v-if="ProfileStore.vv?.address?.$error"
                  >
                    {{ ProfileStore.vv.address.$errors[0].$message }}
                  </div>
                </div>
                <div class="col-md-6" :disabled="isLoading">
                  <div class="input-field position-relative">
                    <input
                      id="phone"
                      class="form-control"
                      placeholder=""
                      :class="{
                        'is-invalid border border-danger': ProfileStore.vv?.phone?.$error,
                      }"
                      v-model="ProfileStore.frm.phone"
                    />
                    <label for="phone" class="form-label">លេខទូរស័ព្ទ</label>
                  </div>
                  <div
                    class="text-danger d-block small invalid-feedback"
                    v-if="ProfileStore.vv?.phone?.$error"
                  >
                    {{ ProfileStore.vv.phone.$errors[0].$message }}
                  </div>
                </div>
                <div class="col-md-6" :disabled="isLoading">
                  <div class="input-field">
                    <select
                      id="gender"
                      class="form-select"
                      v-model="ProfileStore.frm.gender_id"
                    >
                      <option value="" hidden>ជ្រើសរើសភេទ</option>
                      <option value="1">ប្រុស</option>
                      <option value="2">ស្រី</option>
                    </select>
                  </div>
                  <div
                    class="text-danger d-block small invalid-feedback"
                    v-if="ProfileStore.vv?.gender_id?.$error"
                  >
                    {{ ProfileStore.vv.gender_id.$errors[0].$message }}
                  </div>
                </div>
                <div class="col-md-6" :disabled="isLoading">
                  <div class="input-field position-relative">
                    <input
                      id="phone"
                      class="form-control"
                      placeholder=""
                      :class="{
                        'is-invalid border border-danger': ProfileStore.vv?.email?.$error,
                      }"
                      v-model="ProfileStore.frm.email"
                    />
                    <label for="phone" class="form-label">អ៊ីមែល</label>
                  </div>
                  <div
                    class="text-danger d-block small invalid-feedback"
                    v-if="ProfileStore.vv?.email?.$error"
                  >
                    {{ ProfileStore.vv.email.$errors[0].$message }}
                  </div>
                </div>
                <div
                  class="card-footer border-0 p-0 d-flex justify-content-end gap-3 bg-transparent px-2"
                >
                  <button
                    type="button"
                    class="btn btn-secondary rounded-5 px-4"
                    :disabled="isLoading"
                  >
                    បោះបង់
                  </button>
                  <button
                    type="submit"
                    class="btn btn-primary rounded-5 px-4"
                    :disabled="isLoading"
                  >
                    <span
                      v-if="isLoading"
                      class="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    ></span>
                    {{ isLoading ? "កំពុងរក្សាទុក" : "រក្សាទុក" }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-12 p-0">
          <div id="sectionChangePassword" class="card border-0 rounded-4">
            <div class="d-flex flex-column gap-1 p-4">
              <div
                class="card-title fs-5 fw-bold d-flex justify-content-between align-items-center"
              >
                កែប្រែពាក្យសម្ងាត់
              </div>
              <form action="" class="row g-3" @submit.prevent="onClickChangePassword">
                <div class="col-12">
                  <div class="input-field position-relative">
                    <input
                      :type="
                        ProfileStore.checkTypePassword.showCurrentPassword
                          ? 'text'
                          : 'password'
                      "
                      id="currentPassword"
                      class="form-control"
                      placeholder=""
                      v-model="ProfileStore.data.currentPassword"
                      @blur="v$Password.currentPassword.$touch()"
                    />
                    <label for="currentPassword" class="form-label"
                      >ពាក្យសម្ងាត់បច្ចុប្បន្ន...</label
                    >
                    <span class="eye-class">
                      <i
                        @click="onClickEyeCurrent"
                        :class="
                          ProfileStore.checkTypePassword.showCurrentPassword
                            ? 'bi bi-eye-slash'
                            : 'bi bi-eye'
                        "
                      ></i>
                    </span>
                  </div>
                  <div v-if="ProfileStore.error_Message" class="text-danger">
                    {{ ProfileStore.error_Message }}
                  </div>
                </div>
                <div class="col-12">
                  <div class="input-field position-relative">
                    <input
                      :type="
                        ProfileStore.checkTypePassword.showPassword ? 'text' : 'password'
                      "
                      id="password"
                      class="form-control"
                      placeholder=""
                      v-model="ProfileStore.data.new_password"
                      @blur="v$Password.new_password.$touch()"
                    />
                    <label for="password" class="form-label">ពាក្យសម្ងាត់ថ្មី...</label>
                    <span class="eye-class">
                      <i
                        @click="onClickEye"
                        :class="
                          ProfileStore.checkTypePassword.showPassword
                            ? 'bi bi-eye-slash'
                            : 'bi bi-eye'
                        "
                      ></i>
                    </span>
                  </div>
                  <div v-if="v$Password.new_password.$error" class="text-danger">
                    {{ v$Password.new_password.$errors[0].$message }}
                  </div>
                </div>
                <div class="col-12">
                  <div class="input-field position-relative">
                    <input
                      :type="
                        ProfileStore.checkTypePassword.showConfirmPassword
                          ? 'text'
                          : 'password'
                      "
                      id="confirmPassword"
                      class="form-control"
                      placeholder=" "
                      v-model="ProfileStore.data.new_password_confirmation"
                      @blur="v$Password.new_password_confirmation.$touch()"
                    />
                    <label for="confirmPassword" class="form-label"
                      >ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់...</label
                    >
                    <span class="eye-class">
                      <i
                        @click="onClickEyeConfirm"
                        :class="
                          ProfileStore.checkTypePassword.showConfirmPassword
                            ? 'bi bi-eye-slash'
                            : 'bi bi-eye'
                        "
                      ></i>
                    </span>
                  </div>
                  <div
                    v-if="v$Password.new_password_confirmation.$error"
                    class="text-danger"
                  >
                    {{ v$Password.new_password_confirmation.$errors[0].$message }}
                  </div>
                </div>
                <div class="col-12 text-end d-flex gap-3 justify-content-end">
                  <button type="button" class="btn btn-secondary rounded-5 px-4">
                    បោះបង់
                  </button>
                  <button type="submit" class="btn btn-primary rounded-5 px-4">
                    ប្ដូរពាក្យសម្ងាត់
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <ModalCrop />
  <ModelChengpassword />
  <UserErr />
  <Modeldelect />
</template>

<script setup>
import { useProfileStore } from "@/stores/views/store_profile";
import ModelChengpassword from "@/components/views/profile/ModelChengpassword.vue";
import ModalCrop from "@/components/views/profile/ModalCrop.vue";
import Modeldelect from "@/components/views/profile/Modeldelect.vue";
import { required, integer, helpers, minLength, sameAs } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useAuthStore } from "@/stores/views/auth/auth";
import axios from "axios";
import UserErr from "@/components/views/profile/UserErr.vue";
import { ref, computed, onMounted } from "vue";

const authStore = useAuthStore();
const isLoading = ref(false);
const ProfileStore = useProfileStore();

onMounted(() => {
  ProfileStore.onloadProfile().then(() => {
    ProfileStore.frm.first_name = ProfileStore.userinfo.first_name;
    ProfileStore.frm.last_name = ProfileStore.userinfo.last_name;
    ProfileStore.frm.phone = ProfileStore.userinfo.phone;
    ProfileStore.frm.address = ProfileStore.userinfo.address;
    ProfileStore.frm.email = ProfileStore.userinfo.email;
    ProfileStore.frm.gender_id = ProfileStore.userinfo.gender_id;
  });
});

const rules = computed(() => ({
  first_name: {
    required: helpers.withMessage("សូមបញ្ចូលនាមត្រកូល", required),
  },
  last_name: {
    required: helpers.withMessage("សូមបញ្ចូលនាមខ្លួន", required),
  },
  phone: {
    required: helpers.withMessage("សូមបញ្ចូលលេខទូរស័ព្ទ", required),
    integer: helpers.withMessage("សូមបញ្ចូលជាលេខ", integer),
  },
  address: {
    required: helpers.withMessage("សូមបញ្ចូលអាសយដ្ឋាន", required),
  },
  email: {
    required: helpers.withMessage("សូមបញ្ចូលអ៊ីមែល", required),
  },
  gender_id: {
    required: helpers.withMessage("សូមជ្រើសរើសភេទ", required),
  },
}));
ProfileStore.vv = useVuelidate(rules, ProfileStore.frm);

const onEditProfile = () => {
  document.getElementById("file_img1").value = "";
  document.getElementById("file_img1").click();
};
const openModalDelete = () => {
  ProfileStore.mdl_delete.show();
  ProfileStore.frm.is_remove = 1;
};

const onSelectedImage = (e, imageNumber) => {
  if (e.currentTarget.files.length === 0) {
    return;
  }
  const file = e.currentTarget.files[0];
  const maxSize = 1 * 1024 * 1024;
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

  if (!allowedTypes.includes(file.type)) {
    ProfileStore.error_Message = "អ្នកអាចប្រើរូបភាពប្រភេទ JPEG, PNG និង GIF";
    ProfileStore.mdl_errorTypeImage.show();
    return;
  }

  if (file.size > maxSize) {
    ProfileStore.error_Message = "ទំហំរូបភាពមិនត្រូវលើស 1MB";
    ProfileStore.mdl_errorTypeImage.show();
    return;
  }

  ProfileStore.crop.img = URL.createObjectURL(file);
  ProfileStore.mdl_crop.show();
};

const onSaveInfo = async () => {
  isLoading.value = true;
  ProfileStore.vv.$touch();

  if (ProfileStore.vv.$error) {
    console.log("Validation errors:", ProfileStore.vv.$errors);
    isLoading.value = false;
    return;
  }

  let frmData = new FormData();
  for (const key in ProfileStore.frm) {
    frmData.append(key, ProfileStore.frm[key]); // Include all fields, including email
  }
  if (ProfileStore.crop.blob) {
    frmData.append("photo", ProfileStore.crop.blob);
  }

  try {
    const res = await axios.post(`/api/profile/users/update`, frmData, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + authStore.token,
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.result) {
      console.log("Update successful:", res.data);
      ProfileStore.onloadProfile();
    } else {
      console.log("Update failed:", res.data);
    }
  } catch (error) {
    console.error("Error updating profile:", error.response?.data || error.message);
    ProfileStore.error_Message =
      error.response?.data?.message || "Failed to update profile";
    ProfileStore.mdl_errorTypeImage.show();
  } finally {
    isLoading.value = false;
  }
};

const passwordRules = computed(() => ({
  currentPassword: {
    required: helpers.withMessage("សូមបញ្ចូលលេខសម្ងាត់បច្ចុប្បន្ន", required),
    minLength: helpers.withMessage("លេខសម្ងាត់ត្រូវមានយ៉ាងតិច 8 តួ", minLength(8)),
  },
  new_password: {
    required: helpers.withMessage("សូមបញ្ចូលលេខសម្ងាត់ថ្មី", required),
    minLength: helpers.withMessage("លេខសម្ងាត់ត្រូវមានយ៉ាងតិច 8 តួ", minLength(8)),
  },
  new_password_confirmation: {
    required: helpers.withMessage("សូមផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់", required),
    sameAs: helpers.withMessage(
      "ពាក្យសម្ងាត់ផ្ទៀងផ្ទាត់មិនដូចគ្នា",
      sameAs(ProfileStore.data.new_password)
    ),
  },
}));

const v$Password = useVuelidate(passwordRules, ProfileStore.data);

const onClickChangePassword = async () => {
  isLoading.value = true;

  try {
    const isValid = await v$Password.value.$validate();

    if (!isValid) {
      console.log("Validation errors:", v$Password.value.$errors);
      return;
    }

    const formData = {
      password: ProfileStore.data.currentPassword,
      new_password: ProfileStore.data.new_password,
      new_password_confirmation: ProfileStore.data.new_password_confirmation,
    };

    const res = await axios.post(`/api/users/profile/password`, formData, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + authStore.token,
        "Content-Type": "application/json",
      },
    });

    if (res.data.result) {
      ProfileStore.mdl_cf.show();
      ProfileStore.data.currentPassword = "";
      ProfileStore.data.new_password = "";
      ProfileStore.data.new_password_confirmation = "";
      v$Password.value.$reset();
    } else {
      ProfileStore.error_Message = "ពាក្យសម្ងាត់បច្ចុប្បន្នមិនត្រឹមត្រូវ។";
    }
  } catch (error) {
    ProfileStore.error_Message = "ពាក្យសម្ងាត់បច្ចុប្បន្នមិនត្រឹមត្រូវ។";
  } finally {
    isLoading.value = false;
  }
};

const onClickEyeCurrent = () => {
  ProfileStore.checkTypePassword.showCurrentPassword = !ProfileStore.checkTypePassword
    .showCurrentPassword;
};

const onClickEye = () => {
  ProfileStore.checkTypePassword.showPassword = !ProfileStore.checkTypePassword
    .showPassword;
};

const onClickEyeConfirm = () => {
  ProfileStore.checkTypePassword.showConfirmPassword = !ProfileStore.checkTypePassword
    .showConfirmPassword;
};
</script>

