<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 shape-default shape-skew">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <card
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-4"
            class="border-0"
          >
            <template>
              <form role="form" @submit.prevent="handleLogin">
                <base-input
                  v-model="email"
                  alternative
                  class="mb-3"
                  placeholder="Email"
                  addon-left-icon="ni ni-email-83"
                  :valid="error"
                >
                </base-input>
                <base-input
                  v-model="password"
                  alternative
                  type="password"
                  placeholder="Password"
                  addon-left-icon="ni ni-lock-circle-open"
                  :valid="error"
                >
                </base-input>
                <!-- <base-checkbox> Remember me </base-checkbox> -->
                <div class="text-center">
                  <base-button
                    nativeType="submit"
                    type="primary"
                    class="col-7 my-4"
                    >Entrar</base-button
                  >
                  <router-link class="mr-3" to="/" title="Landing Page">
                    <base-button outline type="primary" class="col-4 my-4"
                      >Voltar</base-button
                    >
                  </router-link>
                </div>
              </form>
            </template>
          </card>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null
    };
  },
  methods: {
    handleLogin() {
      let email = this.email;
      let password = this.password;
      this.$store.dispatch("login", { email, password })
        .then(() => {
          this.$router.push('/dash')
        })
        .catch(err => {
          this.error = false
        });
    }
  }
};
</script>
<style></style>
