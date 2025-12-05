
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
│  ├─ Navbar.jsx
│  ├─ ProductCard.jsx
│  ├─ ProductSearch.jsx
│  └─ Filter.jsx
├─ context/
│  └─ CartContext.jsx
├─ pages/
│  ├─ Home.jsx
│  ├─ Cart.jsx
│  ├─ Wishlist.jsx
│  └─ ProductDetail.jsx
├─ App.jsx
└─ index.js
```
## Features


### **General Features**
- Fully responsive design for mobile, tablet, and desktop.
- Navbar with **search bar**, **wishlist**, and **cart** indicators.
- Footer with navigation links and contact information.

### **Home Page**
- Product listing with **category filter**, **sorting**, and **pagination**.
- Random featured products section on homepage.
- Product search functionality integrated with navbar.

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
## **Installation & Setup**

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
## Optimizations

What optimizations did you make in your code? E.g. refactors, performance improvements, accessibility


## Contributing

Contributions are always welcome!

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