<template>
  <div class="profile-page">
    <section class="section-profile-cover section-shaped my-0">
      <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
        <span></span>
        <span></span>
      </div>
    </section>
    <section class="section section-skew mt--200">
      <div class="container">
        <card shadow class="card-profile mt--300" no-body>
          <div class="px-4">
            <div class="row justify-content-center">
              <div class="col-lg-5 order-lg-1">
                <div class="card-profile-stats d-flex justify-content-center">
                  <div>
                    <span class="heading">{{ sales.length }}</span>
                    <span class="description">Vendas realizadas</span>
                  </div>
                  <div>
                    <span class="heading">R${{ sales.reduce((acc, sale) => acc + sale.total_commission, 0).toFixed(2)}}</span>
                    <span class="description">Total de comissão</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="py-5 border-top text-center">
              <div class="row justify-content-center">
                <div class="col-lg-12">
                  <div class="row">
                    <div class="col-10">
                      <base-button
                        outline
                        block
                        @click="modals.modal3 = true"
                        type="success"
                        >Registrar Venda</base-button
                      >
                    </div>
                    <div class="col-2">
                      <base-button block type="danger" @click="$store.dispatch('logout') && $router.push('/')"
                        >Sair</base-button
                      >
                    </div>
                  </div>
                  <modal
                    :show.sync="modals.modal3"
                    body-classes="p-0"
                    modal-classes="modal-dialog-centered modal-lg"
                  >
                    <card
                      type="secondary"
                      shadow
                      header-classes="bg-white pb-5"
                      body-classes="px-lg-5 py-lg-5"
                      class="border-0"
                    >
                      <template>
                        <form role="form">
                          <div class="row">
                            <div class="col-md-12">
                              <base-input
                                alternative
                                placeholder="Digite um produto ou serviço"
                                v-model="productName"
                                :valid="validProduct"
                              ></base-input>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-7">
                              <base-input
                                alternative
                                v-model="productValue"
                                placeholder="Valor"
                                type="number"
                                :valid="validValue"
                              ></base-input>
                            </div>
                            <div class="col-md-2">
                              <base-checkbox class="mb-3" v-model="service">
                                Serviço
                              </base-checkbox>
                            </div>
                            <div class="col-md-3">
                              <base-button
                                type="primary"
                                icon="fa fa-plus"
                                block
                                @click="handleProduct"
                                >Adicionar</base-button
                              >
                            </div>
                          </div>
                          <div class="row mb-3" v-if="products.length > 0">
                            <div class="col-md-12">
                              <badge
                                v-for="(product, index) in products"
                                :key="index"
                                type="default"
                                >{{ product.name }} - R${{
                                  product.value
                                }}</badge
                              >
                            </div>
                          </div>
                          <base-input addon-left-icon="ni ni-calendar-grid-58">
                            <flat-picker
                              slot-scope="{ focus, blur }"
                              @on-open="focus"
                              @on-close="blur"
                              :config="{
                                allowInput: true,
                                dateFormat: 'd-m-Y',
                              }"
                              class="form-control datepicker"
                              v-model="date"
                            >
                            </flat-picker>
                          </base-input>
                          <div class="text-center">
                            <base-button
                              block
                              type="success"
                              class="col-12 mt-4 mb-0"
                              @click="handleSubmit"
                              >Registrar</base-button
                            >
                          </div>
                        </form>
                      </template>
                    </card>
                  </modal>
                  <div class="table-responsive mt-4">
                    <table class="table align-items-center">
                      <thead class="thead-light">
                        <tr>
                          <th scope="col" class="sort" data-sort="name">#ID</th>
                          <th scope="col" class="sort" data-sort="status">
                            Valor Total
                          </th>
                          <th scope="col" class="sort" data-sort="status">
                            Valor Comissão
                          </th>
                          <th scope="col">Data</th>
                          <th scope="col">Ação</th>
                        </tr>
                      </thead>
                      <tbody class="list">
                        <tr v-for="sale in sales" :key="sale.id">
                          <td class="budget">{{ sale.id }}</td>
                          <td>R${{ sale.total.toFixed(2) }}</td>
                          <td>R${{ sale.total_commission.toFixed(2) }}</td>
                          <td>
                            {{ formatDate(sale.sale_date) }}
                          </td>
                          <td>
                            <base-button
                              outline
                              size="sm"
                              type="warning"
                              disabled
                              >Editar</base-button
                            >
                            <base-button
                              outline
                              size="sm"
                              type="danger"
                              disabled
                              >Remover</base-button
                            >
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </card>
      </div>
    </section>
  </div>
</template>
<script>
import Modal from "@/components/Modal.vue";
const DatePickers = () =>
  import("./components/JavascriptComponents/DatePickers");
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
export default {
  components: {
    DatePickers,
    Modal,
    flatPicker,
  },
  data() {
    return {
      pagination: {
        default: 1,
      },
      date: '28-02-2021',
      sales: [],
      products: [],
      modals: {
        modal0: false,
        modal1: false,
        modal2: false,
        modal3: false,
      },
      productName: "",
      productValue: "",
      validProduct: false,
      validValue: false,
      service: false,
    };
  },
  mounted() {
    this.$http.get("http://localhost:3000/sale").then((response) => {
      this.sales = response.data.sales;
    });
  },
  watch: {
    productName() {
      if (this.productName.length == 0 && this.products.length == 0)
        this.validProduct = false;
      else this.validProduct = "";
    },
    productValue() {
      if (this.productValue.length == 0 && this.products.length == 0)
        this.validValue = false;
      else this.validValue = "";
    },
  },
  methods: {
    formatDate(value) {
      const date = new Date(value);
      let day = date.getDate().toString();
      let dayF = day.length == 1 ? "0" + day : day;
      let mounth = (date.getMonth() + 1).toString(); //+1 pois no getMonth Janeiro começa com zero.
      let mounthF = mounth.length == 1 ? "0" + mounth : mounth;
      let yearF = date.getFullYear();
      return dayF + "/" + mounthF + "/" + yearF;
    },
    handleProduct() {
      if (!this.productName || !this.productValue) return false;
      this.products.push({
        name: this.productName,
        value: this.productValue,
        service: this.service,
      });
      this.productName = "";
      this.productValue = "";
    },
    handleSubmit() {
      if (this.products.length == 0) return false;
      const date = this.date.split('-')
      this.$http
        .post("http://localhost:3000/sale", {
          products: this.products,
          sale_date: new Date((Number(date[2])+1 )+'-'+date[1]+'-'+date[0]+'T10:00:00.000Z'),
        })
        .then((response) => {
          console.log(response);
          this.productName = "";
          this.productValue = "";
          this.products = [];
          this.modals.modal3 = false;
          this.$http.get("http://localhost:3000/sale").then((response) => {
            this.sales = response.data.sales;
          });
        })
        .catch(() => {
          this.modals.modal3 = false;
        });
    },
  },
};
</script>
<style>
</style>
