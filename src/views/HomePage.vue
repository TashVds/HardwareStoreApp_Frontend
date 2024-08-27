<template>
  <div class="container">
    <header class="header">
      <h1 class="center-align">Welcome to Our Hardware Store</h1>
    </header>
    <div class="center-align" style="margin-bottom: 20px;">
      <router-link to="/about" class="btn">About Us</router-link>
    </div>
    <div class="row">
      <div class="col s12 m3">
        <div class="collection with-header">
          <div class="collection-header"><h5>Categories</h5></div>
          <a v-if="categories.length === 0" class="collection-item">No categories available</a>
          <a v-for="category in categories" :key="category.id" href="#!" class="collection-item">
            <img :src="category.image" alt="Category Image" class="circle" style="width: 50px; height: 50px; margin-right: 10px;">
            {{ category.name }}
          </a>
        </div>
      </div>
      <div class="col s12 m9">
        <div class="row">
          <div v-if="products.length === 0" class="col s12"><p>No products available</p></div>
          <div class="col s12 m6 l4" v-for="product in products" :key="product.id">
            <div class="card">
              <div class="card-image">
                <img :src="product.image" alt="Product Image">
                <span class="card-title">{{ product.name }}</span>
              </div>
              <div class="card-content">
                <p>{{ product.description }}</p>
                <p><strong>Price:</strong> ${{ product.price }}</p>
              </div>
              <div class="card-action">
                <a href="/cart">Add to Cart</a>
                <a :href="'/product/' + product.id">View Details</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getProducts } from '@/services/productService.mjs';
import { getCategories } from '@/services/categoryService';

export default {
  name: 'HomePage',
  setup() {
    const products = ref([]);
    const categories = ref([]);

    onMounted(async () => {
      try {
        products.value = await getProducts();
        categories.value = await getCategories();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });

    return {
      products,
      categories,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  background-image: url('https://wallpaperaccess.com/full/1880033.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 40px;
  border-radius: 10px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  left: 50%;
  transform: translateX(-50%);
}

.header::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

h1 {
  font-family: var(--font-family);
  color: #a8f4ff;
  position: relative;
  z-index: 1;
}

.center-align {
  text-align: center;
  margin-top: 20px;
}

.card {
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-title {
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
}

.card-content {
  padding: 15px;
}

.card-action {
  background: #f5f5f5;
  padding: 10px;
  text-align: center;
}

.card-action a {
  color: #007bff;
  text-decoration: none;
  margin: 0 10px;
}

.card-action a:hover {
  text-decoration: underline;
}

.collection .collection-item {
  display: flex;
  align-items: center;
}
</style>