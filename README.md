# Shopverse E-commerce Project

A modern, responsive e-commerce website built with HTML, CSS, and JavaScript, featuring an interactive shopping experience with 3D visual effects.

## Images
![Image](https://github.com/user-attachments/assets/5bb2d900-c5f0-4ed5-96be-e55b64371eee)

## 🚀 Features

### Core Functionality
- **Product Catalog**: Browse through a collection of fashion items with detailed product information
- **Shopping Cart**: Add items to cart with quantity selection (1-3 items per product)
- **Checkout System**: Review orders with delivery options and payment summary
- **Order Management**: View past orders and track shipments
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Interactive Elements
- **3D Particle Effects**: Animated background particles using Three.js
- **Smooth Animations**: Scroll-triggered animations and hover effects
- **Dynamic Header**: Responsive navigation with scroll effects
- **Real-time Updates**: Cart quantity updates and visual feedback

### User Experience
- **Delivery Options**: Multiple shipping speeds with cost calculation
- **Order Tracking**: Visual progress indicators for shipment status
- **Empty Cart Handling**: Graceful handling when cart is empty
- **Persistent Cart**: Cart data saved in localStorage

## 📁 Project Structure

```
shopverse/
├── checkout.html          # Checkout page
├── orders.html           # Order history page
├── shopverse.html        # Main product catalog
├── tracking.html         # Order tracking page
├── scripts/
│   ├── checkout.js           # Main checkout functionality
│   ├── shopverse.js          # Product catalog and 3D effects
│   └── checkout/
│       ├── checkoutheader.js # Checkout header component
│       ├── orderSummary.js   # Order summary rendering
│       └── paymentSummary.js # Payment calculation
├── data/
│   ├── cart.js              # Cart management
│   ├── products.js          # Product data
│   └── deliveryOptions.js   # Shipping options
├── styles/
│   ├── shared/              # Shared CSS components
│   └── pages/               # Page-specific styles
└── images/
    ├── products/            # Product images
    └── icons/               # UI icons
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Responsive design, animations, and modern styling
- **JavaScript (ES6+)**: Modern JavaScript with modules
- **Three.js**: 3D graphics and particle effects
- **Day.js**: Date manipulation and formatting
- **Local Storage**: Persistent cart data

## 🎨 Design Features

### Visual Effects
- **Particle Animation**: Floating 3D particles that respond to scroll
- **Hover Animations**: Smooth scale and shadow effects on product cards
- **Scroll Animations**: Staggered fade-in animations for products
- **Responsive Layout**: Flexible grid system for all screen sizes

### Color Scheme
- Pink accent colors (`#ff69b4`, `#ffc0cb`)
- Clean white backgrounds
- Subtle shadows and gradients
- High contrast for accessibility

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation
1. Clone or download the project files
2. Open `shopverse.html` in your web browser
3. For development, serve files through a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

### Usage
1. **Browse Products**: Start at `shopverse.html` to view the product catalog
2. **Add to Cart**: Select quantity and click "Add to Cart"
3. **Checkout**: Click the cart icon to review your order
4. **Track Orders**: View order history in the orders section

## 🔧 Configuration

### Adding Products
Edit `data/products.js` to add new products:
```javascript
{
  id: "unique-id",
  image: "images/products/product-image.jpg",
  name: "Product Name",
  rating: {
    stars: 4.5,
    count: 120
  },
  priceCount: 299
}
```

### Delivery Options
Modify `data/deliveryOptions.js` to adjust shipping options:
```javascript
{
  id: "1",
  deliveryDays: 7,
  priceCount: 0
}
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Key Components

### Cart Management (`data/cart.js`)
- Add/remove items
- Update quantities
- Calculate totals
- Persist data

### Product Display (`scripts/shopverse.js`)
- Dynamic product rendering
- 3D animation initialization
- Scroll-based animations
- Interactive hover effects

### Checkout Process (`scripts/checkout/`)
- Order summary generation
- Payment calculation
- Delivery option selection
- Empty cart handling

## 🔄 Data Flow

1. **Product Selection**: Users browse and select items
2. **Cart Addition**: Items added with quantity selection
3. **Cart Persistence**: Data saved to localStorage
4. **Checkout Review**: Order summary with delivery options
5. **Payment Calculation**: Dynamic total calculation
6. **Order Completion**: Redirect to order confirmation

## 🎨 Customization

### Colors
Update CSS custom properties in `styles/shared/general.css`:
```css
:root {
  --primary-color: #ff69b4;
  --secondary-color: #ffc0cb;
  --accent-color: #ff1493;
}
```

### Animations
Modify animation parameters in `scripts/shopverse.js`:
- Particle count and behavior
- Scroll animation timing
- Hover effect intensity

## 📊 Performance Features

- **Lazy Loading**: Images loaded as needed
- **Efficient Animations**: Hardware-accelerated CSS transforms
- **Optimized Three.js**: Minimal particle count for performance
- **Responsive Images**: Appropriate sizing for different devices

## 🔧 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📈 Future Enhancements

- User authentication system
- Product search and filtering
- Payment processing integration
- Order confirmation emails
- Product reviews and ratings
- Wishlist functionality
- Advanced inventory management

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Three.js community for 3D graphics capabilities
- Day.js for lightweight date manipulation
- Modern CSS features for responsive design
- JavaScript ES6+ modules for clean code organization

---

**Shopverse** - A modern e-commerce experience with interactive 3D elements and responsive design.
