app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: 
    /*html*/
      `<div class="product-display">
        <div class="product-container">
          <div class="product-image">
            <img
            v-bind:src="image"
            :class="[inStock ? '' : 'out-of-stock-img']"
            >
          </div>
          <div class="product-info">
            <h1>{{ title }}</h1>
            <p>{{checkSale}}</p>
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>

            <p>Shipping: {{shipping}}</p>
                  <product-details :details="details"></product-details>
            <div
              v-for="(variant, index) in variants"
              :key="variant.id"
              v-on:click="updateVariant(index)"
              class="color-circle"
              :style="{ backgroundColor: variant.color }">
            </div>
            <button
              class="button"
              :class="{ disabledButton: !inStock }"
              :disabled="!inStock"
              v-on:click="addToCart"
            >
              Add to Cart
          </button>
            <button v-on:click="removeFromCart">Remove product</button>
          </div>
        </div>
      </div>
      <review-list v-if='reviews.length > 0' :reviews="reviews"></review-list>
      <review-form @review-submitted="addReview"></review-form>
      `,
      data() {
        return {
         
            product: 'Socks',
            brand: 'Vue Mastery',
            selectedVariant: 0,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
                { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 },
            ],
            onSale: true,
            reviews: [],
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].id);
        },
        updateVariant(index) {
            this.selectedVariant = index;
        },
        addReview(productReview) {
            this.reviews.push(productReview);
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].image;
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity;
        },
        checkSale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' is on sale!';
            }
        },
        shipping() {
            if(this.premium) {
                return "Free"
            } else {
                return 2.99;
            }
        }
    }
})