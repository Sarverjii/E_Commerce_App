# ShopNow - E-Commerce Mobile App

A sleek React Native e-commerce application that allows users to browse products, add them to cart, and save items to a wishlist.

![ShopNow App](https://via.placeholder.com/800x400.png?text=ShopNow+E-Commerce+App)

## Features

- Browse products from various categories
- Search functionality
- Product filtering by categories
- Product details view
- Add products to cart
- Adjust quantity in cart
- Persistent cart using AsyncStorage
- Wishlist functionality
- Clean, modern UI with gradient backgrounds

## Tech Stack

- React Native
- React Navigation (Bottom Tabs & Stack Navigation)
- AsyncStorage for data persistence
- Linear Gradient for UI styling
- Vector Icons for iconography
- FakeStore API for product data

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/shopnow-app.git
cd shopnow-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Required dependencies:

```bash
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack
npm install react-native-vector-icons react-native-linear-gradient
npm install @react-native-async-storage/async-storage
npm install react-native-gesture-handler react-native-reanimated react-native-screens
```

4. Start the Metro bundler:

```bash
npx react-native start
```

5. Run the application:

```bash
npx react-native run-android
# or
npx react-native run-ios
```

## Project Structure

```
shopnow-app/
├── src/
│   ├── assets/           # Images and other static assets
│   ├── components/       # Reusable components
│   │   ├── Header.js
│   │   ├── Category.js
│   │   └── ProductCard.js
│   └── screen/           # Application screens
│       ├── HomeScreen.js
│       ├── ProductDetailsScreen.js
│       ├── CartScreen.js
│       └── WishlistScreen.js
├── App.js                # Main application entry point
├── index.js              # React Native entry point
└── package.json          # Project dependencies
```

## Application Flow

1. **Home Screen**: Displays products in a grid format with filtering options
2. **Product Details**: Shows detailed information about a selected product
3. **Cart**: Displays added products with quantity controls and total calculation
4. **Wishlist**: Shows all products saved to wishlist

## Data Management

- Product data is fetched from the [FakeStore API](https://fakestoreapi.com/)
- Cart and wishlist data are stored in AsyncStorage for persistence
- State management is handled using React's useState and useEffect hooks

## How to Use

### Browsing Products

- Scroll through the home screen to view all products
- Use the category filter to view products by category
- Use the search bar to find specific products

### Product Details

- Tap on any product to view detailed information
- Adjust quantity and add to cart from the details screen
- Add/remove from wishlist using the heart icon

### Managing Cart

- View all cart items in the Cart tab
- Adjust quantities or remove items as needed
- View subtotal, shipping cost, and total amount
- Clear the entire cart with "Clear All" button

### Using Wishlist

- Save products to wishlist by clicking the heart icon
- Access all saved items from the Wishlist tab
- Remove items from wishlist by toggling the heart icon again

## Troubleshooting

If you encounter any issues:

1. Make sure all dependencies are correctly installed
2. Check that the Fake Store API is accessible
3. Ensure AsyncStorage permissions are properly set
4. For navigation issues, verify that all navigators are properly configured

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
