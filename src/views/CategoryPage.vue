<template>
  <div class="container">
    <h1>Products</h1>
    <ul class="list-group">
      <li v-for="product in products" :key="product.id" class="list-group-item">
        {{ product.name }} - ${{ product.price }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getProducts } from '@/services/productService.mjs';

export default {
  name: 'CategoryPage',
  setup() {
    const products = ref([]);

    onMounted(async () => {
      products.value = await getProducts();
    });

    return {
      products,
    };
  },
};
</script>

<style scoped>
/* Add styles here */
</style>
