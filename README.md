
# 🛍️ Shopverse E-commerce Project

🌐 **Live Demo**: [https://shopverse-444vs.netlify.app/](https://shopverse-444vs.netlify.app/)

A stylish, responsive e-commerce website built with HTML, CSS, and JavaScript — featuring interactive shopping experiences and immersive 3D particle effects.

---

## 📸 Preview

![Shopverse Preview](https://github.com/user-attachments/assets/5bb2d900-c5f0-4ed5-96be-e55b64371eee)

---

## 🚀 Features

### 🛒 Core Functionality

* **Product Catalog** – Browse stylish fashion products with image, rating, and pricing
* **Shopping Cart** – Add, update, and remove products with quantity options (1–3)
* **Checkout System** – Review orders with real-time delivery and payment summary
* **Order Management** – Track past orders with animated progress indicators
* **Mobile-First Design** – Fully responsive for all screen sizes

### ✨ Visual & Interactive Elements

* **3D Particle Background** – Real-time floating particles using Three.js
* **Scroll Animations** – Smooth fade/slide-in effects for components
* **Hover Feedback** – Responsive card hover effects and button presses
* **Real-Time Cart Updates** – Item count dynamically syncs across pages

### 📦 Smart UX

* **Empty Cart Handling** – Friendly messages and quick navigation back to shop
* **Order Tracking** – Shows dynamic shipment status (Preparing → Shipped → Delivered)
* **LocalStorage Persistence** – Cart and orders saved across sessions
* **Delivery Options** – Choose shipping speed with cost calculated on the fly

---

## 🧩 Project Structure

```
shopverse/
├── index.html              # Product catalog (main entry point)
├── checkout.html           # Cart + checkout flow
├── orders.html             # Past orders view
├── tracking.html           # Track order progress
├── footer.html             # Terms and Privacy
├── privacy.html            # Privacy
├── terms.html              # Terms and Conditions
├── scripts/
│   ├── shopverse.js        # Product UI + animations
│   ├── checkout.js         # Cart logic & order flow
│   ├── tracking.js         # Order tracking logic
│   └── shared/
│       └── universalEffects.js  # 3D particles + UI animations
├── data/
│   ├── products.js         # Product class definitions and loader
│   ├── product-list.js     # Product data list
│   ├── cart.js             # Cart state management
│   └── deliveryOptions.js  # Delivery speed & price data
├── styles/
│   ├── shared/             # Global + component styles
│   └── pages/              # Page-specific styles
└── images/
    ├── products/           # Product thumbnails
    └── icons/              # UI and system icons
```

---

## 🛠️ Technologies Used

* **HTML5**, **CSS3**, **JavaScript (ES6 modules)**
* **Three.js** – for 3D particle effects
* **Day.js** – lightweight date management
* **LocalStorage API** – cart & order persistence
* **Responsive Design** – mobile, tablet, and desktop support

---

## 🎨 Design & UI Highlights

* 🎆 Particle animation background
* 🔄 Scroll-based and hover animations
* 🧭 Smooth navigation with animated headers
* 💬 Button feedback + transitions
* 🎯 Color scheme:

  * `--primary-color`: `#ff69b4`
  * `--secondary-color`: `#ffc0cb`
  * `--accent-color`: `#ff1493`

---

## 📱 Responsive Breakpoints

* **Mobile**: <768px
* **Tablet**: 768–1024px
* **Desktop**: >1024px

---

## ⚙️ Configuration

### ➕ Add New Products

Edit `data/products.js` or `data/product-list.js`:

```js
{
  id: "product-id",
  image: "images/products/product-image.jpg",
  name: "Product Name",
  rating: {
    stars: 4.5,
    count: 100
  },
  priceCount: 299,
  type: "clothing"
}
```

### 🚚 Customize Delivery Options

Update `data/deliveryOptions.js`:

```js
{
  id: "1",
  deliveryDays: 5,
  priceCount: 50
}
```

---

## 🔁 Data Flow Overview

1. **Product Selection** → Add to cart
2. **Cart Storage** → Saved in `localStorage`
3. **Checkout** → Review + select delivery
4. **Order Placement** → Order object saved
5. **Order Tracking** → Shipment progress visualized

---

## 📈 Performance Optimizations

* Minimal Three.js particle count for smooth rendering
* CSS hardware-accelerated transitions
* Lazy image loading for faster initial paint
* Reuse of DOM elements wherever possible

---

## 📦 How to Run Locally

1. Clone/download the repo
2. Open `index.html` or serve via local server:

```bash
npx serve .
# or
python -m http.server 8000
```

---

## 📅 Future Enhancements

* User authentication
* Payment gateway integration
* Product reviews & ratings
* Search and filter UI
* Wishlist system
* Email confirmations on order

---

## 🧪 Tested On

* ✅ Chrome
* ✅ Firefox
* ✅ Safari
* ✅ Edge

---

## 🤝 Contributing

Pull requests welcome!
Just fork → feature branch → PR ✨

---

## 📄 License

MIT License — Free to use, modify, and distribute.

---

**🚀 Built with passion by Sneha Das**
