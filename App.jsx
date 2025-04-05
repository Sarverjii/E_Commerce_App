import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import HomeScreen from "./src/screen/HomeScreen";
import ProductDetailsScreen from './src/screen/ProductDetailsScreen';
import CartScreen from './src/screen/CartScreen';
import WishlistScreen from './src/screen/WishlistScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Home Stack
const HomeStack = ({ cartItems, addToCart, wishlistItems, toggleWishlist, isProductWishlisted }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        initialParams={{ 
          cartItems, 
          addToCart, 
          wishlistItems, 
          toggleWishlist, 
          isProductWishlisted 
        }}
      />
      <Stack.Screen 
        name="ProductDetails" 
        component={ProductDetailsScreen} 
        initialParams={{
          addToCart,
          onWishlistToggle: toggleWishlist,
          isWishlisted: false  // This will be overridden when navigating
        }}
      />
    </Stack.Navigator>
  );
};
const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  
  // Load cart and wishlist from AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedCart = await AsyncStorage.getItem('cartItems');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
        
        const savedWishlist = await AsyncStorage.getItem('wishlistItems');
        if (savedWishlist) {
          setWishlistItems(JSON.parse(savedWishlist));
        }
      } catch (error) {
        console.error('Error loading data from AsyncStorage:', error);
      }
    };
    
    loadData();
  }, []);
  
  // Save cart to AsyncStorage whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
      } catch (error) {
        console.error('Error saving cart to AsyncStorage:', error);
      }
    };
    
    saveCart();
  }, [cartItems]);
  
  // Save wishlist to AsyncStorage whenever it changes
  useEffect(() => {
    const saveWishlist = async () => {
      try {
        await AsyncStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
      } catch (error) {
        console.error('Error saving wishlist to AsyncStorage:', error);
      }
    };
    
    saveWishlist();
  }, [wishlistItems]);
  
  // Cart functions
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      } else {
        // Add new item
        return [...prevItems, { ...product, quantity: product.quantity || 1 }];
      }
    });
  };
  
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };
  
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };
  
  const clearCart = () => {
    setCartItems([]);
  };
  
  // Wishlist functions
  const toggleWishlist = (productId) => {
    // Check if product is already in wishlist
    const isInWishlist = wishlistItems.some(item => item.id === productId);
    
    if (isInWishlist) {
      // Remove from wishlist
      setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
    } else {
      // Fetch product data and add to wishlist
      fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(res => res.json())
        .then(product => {
          setWishlistItems(prevItems => [...prevItems, product]);
        });
    }
  };
  
  const isProductWishlisted = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#E96E6E",
          tabBarInactiveTintColor: "#A9A9A9",
        }}
      >
        <Tab.Screen
          name="HOME"
          options={{
            tabBarIcon: ({ size, color }) => (
              <Entypo name="home" size={size} color={color} />
            ),
          }}
        >
          {props => (
            <HomeStack
              {...props}
              cartItems={cartItems}
              addToCart={addToCart}
              wishlistItems={wishlistItems}
              toggleWishlist={toggleWishlist}
              isProductWishlisted={isProductWishlisted}
            />
          )}
        </Tab.Screen>
        
        <Tab.Screen
  name="WISHLIST"
  options={{
    tabBarIcon: ({ size, color }) => (
      <Ionicons name="heart-outline" size={size} color={color} />
    ),
  }}
>
  {props => (
    <WishlistScreen
      {...props}
      wishlistItems={wishlistItems}
      onWishlistToggle={toggleWishlist}
      addToCart={addToCart}
    />
  )}
</Tab.Screen>
        
<Tab.Screen
  name="CART"
  options={{
    tabBarIcon: ({ size, color }) => (
      <MaterialCommunityIcons name="cart" size={size} color={color} />
    ),
    tabBarBadge: cartItems.length || null,
    tabBarBadgeStyle: { backgroundColor: '#E96E6E' },
  }}
>
  {props => (
    <CartScreen
      {...props}
      cartItems={cartItems}
      updateQuantity={updateQuantity}
      removeFromCart={removeFromCart}
      clearCart={clearCart}
    />
  )}
</Tab.Screen>
        
        <Tab.Screen
          name="ACCOUNT"
          component={HomeScreen} // You can replace with an actual account screen
          options={{
            tabBarIcon: ({ size, color }) => (
              <FontAwesome6 name="user" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;