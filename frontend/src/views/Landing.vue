<template>
  <div>
    <div class="position-relative">
      <!-- shape Hero -->
      <section class="section-shaped my-0">
        <div class="shape shape-style-1 shape-default shape-skew">
        </div>
        <div class="container shape-container d-flex">
          <div class="col px-0">
            <div class="row">
              <div class="col-lg-6">
                <h1 class="display-3 text-white">
                  Dashboar administrativo
                  <span>para vendedores</span>
                </h1>
                <p class="lead text-white">
                  Controle suas vendas e veja suas comissões
                </p>
                <div class="btn-wrapper">
                  <router-link class="mr-3" to="/login" title="Landing Page">
                    <base-button
                      class="mb-3 mb-sm-0"
                      type="info"
                      icon="fa fa-sign-in"
                    >
                      Entrar
                    </base-button>
                  </router-link>
                  <base-button
                    href="https://www.creative-tim.com/product/argon-design-system"
                    class="mb-3 mb-sm-0 disable"
                    type="white"
                    icon="fa fa-user-plus"
                    disabled
                  >
                    Solicitar Acesso
                  </base-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
};
</script>
