<!-- 
EMAIL VERIFICATION PAGE - COMMENTED OUT FOR DEVELOPMENT MODE
Email verification is bypassed in development mode, so this page is not needed.

<template>
  <div v-if="isVerified" class="main">
    <div class="text-center">
      <!-- Logo here -->
      <div class="logo-div pt-5">
        <img src="~/static/apple-touch-icon.png" class="img-fluid" alt="Chats" />
      </div>
      <h3 class="text-white welcome pt-4">
        <span>Email address verified</span>
      </h3>
    </div>

    <div class="d-flex justify-content-center align-items-center pt-4">
      <div class="card__holder">
        <section class="d-flex justify-content-center">
          <img src="~/assets/img/svg/email-verified.svg" alt="email-verified" />
        </section>

        <!-- Text here -->
        <section class="mt-4">
          <p class="primary-black font-medium sans text-center">
            Email verified successfully
          </p>
          <p class="text-center text-sm input-text poppins p-2">
            Your email has been verified successfully, you'll now be redirected
            to login shortly.
          </p>
        </section>
      </div>
    </div>
  </div>

  <div v-else>
    <FullScreenLoader :loading="loading" />
  </div>
</template>
-->

<!-- Simple redirect page for development mode -->
<template>
  <div class="main">
    <div class="text-center">
      <div class="logo-div pt-5">
        <img src="~/static/apple-touch-icon.png" class="img-fluid" alt="Chats" />
      </div>
      <h3 class="text-white welcome pt-4">
        <span>Development Mode</span>
      </h3>
    </div>

    <div class="d-flex justify-content-center align-items-center pt-4">
      <div class="card__holder">
        <section class="mt-4">
          <p class="primary-black font-medium sans text-center">
            Email verification bypassed in development mode
          </p>
          <p class="text-center text-sm input-text poppins p-2">
            You can login directly without email verification.
            Redirecting to login page...
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<!-- 
<script>
export default {
  name: "VerifyEmail",

  data: () => ({
    isVerified: false,
    loading: false,
  }),

  mounted() {
    const { confirmationCode } = this.$route.query;
    this.handleVerification(confirmationCode);
  },

  methods: {
    async handleVerification(confirmationCode) {
      try {
        this.loading = true;
        await this.$axios.$post(`/auth/verify-email/${confirmationCode}`);

        this.isVerified = true;
        setTimeout(() => {
          // nu ==> new user
          this.$router.push({ path: "/", query: { nu: true } });
        }, 3000);
      } catch (_err) {
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
-->

<!-- Simple redirect script for development mode -->
<script>
export default {
  name: "VerifyEmailDev",

  mounted() {
    // In development mode, just redirect to login after 2 seconds
    setTimeout(() => {
      this.$router.push({ path: "/", query: { nu: true } });
    }, 2000);
  },
};
</script>

<style scoped>
.welcome {
  font-size: 2.25rem;
  font-weight: 500;
}
.main {
  background-image: url("~/assets/img/DSC_1227-min 2 jpeg-min.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100vh;
  overflow: auto;
}

.card__holder {
  background: #ffffff;
  border-radius: 10px;
  padding: 2rem 1.75rem 0.75rem 1.75rem;
  width: 28.125rem;
}
</style>
