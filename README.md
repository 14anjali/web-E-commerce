
# MyStore - React E-commerce Application

A modern **React.js-based e-commerce web application** with cart and wishlist functionality, responsive design, and dynamic product filtering. Built as a frontend project for learning and demonstrating frontend development skills.


## **Technologies Used**

- **React.js** - Frontend library for building UI components.
- **React Router** - SPA navigation between pages.
- **React Context API** - State management for cart and wishlist.
- **Tailwind CSS** - Responsive and modern styling.
- **React Slick** - Carousel/slider for banners.
- **DummyJSON API** - Fetching dynamic product data.

# project Structure 
```
src/
├─ components/
│  ├─ Banner.jsx            # Homepage carousel/banner
│  ├─ Filter.jsx            # Product filtering component
│  ├─ Loader.jsx            # Loading spinner for API fetch
│  ├─ Navbar.jsx            # Navigation bar with search, cart, wishlist
│  ├─ ProductCard.jsx       # Individual product card
│  ├─ ProductSearch.jsx     # Search bar component
│  └─ ThemeToggle.jsx       # Dark/Light theme toggle
├─ context/
│  └─ CartContext.jsx       # Cart and wishlist state management
├─ pages/
│  ├─ Home.jsx              # Homepage
│  ├─ Cart.jsx              # Shopping cart page
│  ├─ Checkout.jsx          # Checkout page
│  ├─ OrderHistory.jsx      # User order history page
│  ├─ ProductDetail.jsx     # Product details page
│  └─ Wishlist.jsx          # Wishlist page
├─ App.jsx
└─ index.js

```
## Features


### **General Features**
- Fully responsive design for mobile, tablet, and desktop.
- Navbar with **search bar**, **wishlist**, and **cart** indicators.
- Footer with navigation links and contact information.
- Loader/spinner displayed while fetching data from API.

### **Home Page**
- Product listing with **category filter**, **sorting**, and **pagination**.
- Random featured products section on homepage.
- Product search functionality integrated with navbar.
- Dynamic data fetching from DummyJSON API with loading indicator.

### **Product Detail Page**
- Display of **product images**, **selected image preview**, and **thumbnail gallery**.
- Shows **price, discounted price, stock availability, and delivery info**.
- Customer reviews section (dummy reviews).
- **Add to Cart** and **Buy Now** functionality.
- **Add to Wishlist** button with toggle state.

### **Cart**
- View all cart items with **quantity adjustment**.
- Remove items from cart.
- Displays **total price**.
- Checkout button (dummy, no payment integration).

### **Wishlist**
- View all wishlist items.
- Add items to cart from wishlist.
- Remove items from wishlist.

### **Checkout Page**
- Order summary with all cart items and total price.
- Form with basic validation (name, address, email).
- “Place Order” button (dummy, no payment integration).

### **Order History Page**
- Displays all previously placed orders (dummy data).
- View order details including items, price, and date.

### **Additional Features**

- Dark/Light theme toggle for better user experience.
- Pagination for product listings to improve browsing.
- Loader/spinner while fetching products from API.## **Installation & Setup**

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd <repo-folder>

2.Install dependencies:
```
npm install

```
3. Run the project:
```
npm start
```
Open http://localhost:5173
 to view in the browser.
## Contributing

Contributions are always welcome!


## Screenshots

![Home Page](/public/screenshot/home-page.png)
![Product Detail](/public/screenshot/productDetail-page.png)
![Cart Page](/public/screenshot/cart-page.png)
![Checkout Page](/public/screenshot/checkout-page.png)
![OrderHistory](/public/screenshot/orderHistory-page.png)
![Wishlist](/public/screenshot/wishlist-page.png)



## Future Improvements

Integrate payment gateway for Buy Now functionality.

Add user authentication for personalized cart and wishlist.

Implement backend database for storing products, orders, and reviews.

Enhance search with autocomplete suggestions.




## License

This project is open-source and free to use.


## Contact

For any queries or collaboration, contact:
Email: 1424anjali@gmail.com

GitHub: https://github.com/14anjali

## Live Demo
https://02mystore.netlify.app/