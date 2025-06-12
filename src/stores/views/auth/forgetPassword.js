import { defineStore } from 'pinia';

export const useForgetPasswordStore = defineStore('auth/forgetPassword', {

  state: () => ({
    data: {
      name: '',
      email: sessionStorage.getItem('userEmail') || '',
      Otp: sessionStorage.getItem('userOtp') || '',
      phone: '',
      password: '',
      confirmPassword: '',
      state: 'active'
    },
    otp: ['', '', '', '', '', ''],
    checkTypePassword: {
      showPassword: false,
      showConfirmPassword: false,
      showCurrentPassword: false
    },
    regex: {
      emailRegex: /^[^\s@]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|io|co)$/,
      phoneRegex: /^((\+855)[1-9][0-9]{7,8}|0[1-9][0-9]{7,8})$/,
    },
    msgError: {
      msgPassword: '',
      msgEmail: '',
    },
    vueValidation: null,
    vueValidationError: null,

  }),

  actions: {
    setEmail(newEmail) {
      this.data.email = newEmail;
      sessionStorage.setItem('userEmail', newEmail);
    },

    setOtp(newOtp) {
      this.data.Otp = newOtp;
      sessionStorage.setItem('userOtp', newOtp);
    },
    onClear() {
      this.$reset();
      sessionStorage.removeItem('userEmail');
      sessionStorage.removeItem('userOtp');
    }
  }

});
