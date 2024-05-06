app.component("product-display", {
  setup() {
    const image = ref("../assets/images/t-shirt-blue.png");
    const changeImage = (variantImage) => {
      image.value = variantImage;
    };

    const product_title = "T-Shirt";
    const brand = "SunCoast";

    const tileWithBrand = computed(() => {
      return product_title + " " + brand;
    });

    const inStockComputed = computed(() => {
      if (inStock > 10) {
        return "In Stock";
      } else if (inStock < 10 && inStock > 1) {
        return "Almost of stock";
      } else {
        return "Out of stock";
      }
    });

    const inStock = 0;

    return {
      image,
      inStock: ref(10),
      detalis: ["50% cotton", "30% polyester", "20% woll"],
      variants: [
        {
          id: 1,
          color: "blue",
          image: "../assets/images/t-shirt-blue.png",
        },
        {
          id: 2,
          color: "green",
          image: "../assets/images/t-shirt-green.png",
        },
      ],
      changeImage,
      tileWithBrand,
      inStockComputed,
    };
  },
  template: `<div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img :src="image" alt="image-product" />
      </div>
      <div class="product-info">
        <h1>{{ tileWithBrand }}</h1>
        <p>Status: {{inStockComputed}}</p>
        <h2>Detalis</h2>

        <ul>
          <li v-for="detail in detalis">{{ detail }}</li>
        </ul>

        <h2>Colors</h2>

        <div
          v-for="variant in variants"
          :key="variant.id"
          @mouseover="changeImage(variant.image)"
          class="color-circle"
          :style="{ backgroundColor: variant.color}"
        ></div>
        <button
          class="button"
          :class="{ disabledButton : inStock < 1 }"
          @click="$emit('add-to-Cart')"
          :disabled="inStock < 1"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>`,
});
