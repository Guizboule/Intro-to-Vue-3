app.component('product-display', {
    template:
    /*html*/
    `<div class="product-display">
        <div class="product-container">
            <div class="product-image">
                <img :src="image">
            </div>

            <div class="product-info">
                <h1>{{title}}</h1>
                <p v-if="inStock > 10">In Stock</p>
                <p v-else-if="inStock <= 10 && inStock > 0">Almost sold out !</p>
                <p v-else>Out of stock</p>
            
                <p>Shipping: {{shipping}}</p>
                
                <ul>
                    <li v-for="detail in details">{{detail}}</li>
                </ul>

                <div 
                v-for="(variant, index) in variants" 
                :key="variant.id" 
                @mouseover="updateVariant(index)"
                class="color-circle"
                :style="{backgroundColor: variant.color}"           
                >
                </div>
            
                <button 
                :disabled="!inStock"
                class="button" 
                :class="{ disabledButton: !inStock}" 
                @click="addToCart">
                Add to cart
                </button>
            </div>
        </div>
        <review-list v-if="reviews.length" :reviews="reviews"></review-list>
        <review-form @review-submitted="addReview"></review-form>
    </div>`,
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    data(){
        return{
            product: 'Socks',
            brand: 'Vue Mastery',
            selectedVariant:0,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants:[
                {id:2234, color:'green', image: './assets/images/socks_green.jpg', quantity: 50},
                {id:2235, color:'blue', image: './assets/images/socks_blue.jpg', quantity:0},
            ],
            reviews: []
        }
    },
    computed: {
        title(){
            return this.brand + '' + this.product 
        },
        image() {
            return  this.variants[this.selectedVariant].image
        },
        inStock() {
            return  this.variants[this.selectedVariant].quantity
        }, 
        shipping() {
            if (this.premium) {
                return 'Free'
            }
            return 2.99
        }
    },
    methods: {
        addToCart(){
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        updateVariant(index){
            this.selectedVariant = index
        },
        addReview(review){
            this.reviews.push(review)
        }
    }
})