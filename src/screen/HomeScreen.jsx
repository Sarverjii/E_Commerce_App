import { StyleSheet, Text, View, StatusBar, TextInput, FlatList, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Category from '../components/category';
import ProductCard from '../components/ProductCard';

const Categories = ["All", "Men's Clothing", "Women's Clothing", "Jewelery", "Electronics"];
const categoryMapping = {
  "All": "all",
  "Men's Clothing": "men's clothing",
  "Women's Clothing": "women's clothing",
  "Jewelery": "jewelery",
  "Electronics": "electronics"
};

const HomeScreen = ({ navigation, route }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get props from App.js
  const { addToCart, toggleWishlist, isProductWishlisted } = route.params || {};

  // Fetch products from API
  useEffect(() => {
    setLoading(true);
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again.');
        setLoading(false);
      });
  }, []);

  // Filter products by category and search query
  useEffect(() => {
    let result = [...products];
    
    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter(product => 
        product.category === categoryMapping[selectedCategory]
      );
    }
    
    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.title.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, searchQuery, products]);

  // Navigate to product details
  const handleProductPress = (product) => {
    navigation.navigate('ProductDetails', {
      product,
      isWishlisted: isProductWishlisted ? isProductWishlisted(product.id) : false,
      onWishlistToggle: toggleWishlist,
      addToCart
    });
  };

  return (
    <LinearGradient colors={['#FDF0F3', "#FFFBFC"]} style={styles.container}>
      {/* StatusBar */}
      <StatusBar hidden={true} />

      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <Header />

        {/* Title */}
        <Text style={styles.headerText}>Match Your Style</Text>

        {/* Search Input */}
        <View style={styles.inputContainer}>
          <Fontisto name={"search"} style={styles.searchIcon} size={20} />
          <TextInput
            style={styles.search}
            placeholder="Search products"
            placeholderTextColor="#C5C5C5"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Fontisto name="close" size={18} color="#C5C5C5" />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Scrollable Categories */}
        <View style={styles.categoriesContainer}>
          <FlatList
            data={Categories}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Category
                item={item}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Products */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#E96E6E" />
            <Text style={styles.loadingText}>Loading products...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={() => {
                setLoading(true);
                setError(null);
                fetch('https://fakestoreapi.com/products')
                  .then(res => res.json())
                  .then(data => {
                    setProducts(data);
                    setFilteredProducts(data);
                    setLoading(false);
                  })
                  .catch(err => {
                    setError('Failed to load products. Please try again.');
                    setLoading(false);
                  });
              }}
            >
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : filteredProducts.length === 0 ? (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>No products found</Text>
            {searchQuery && (
              <TouchableOpacity 
                style={styles.clearButton}
                onPress={() => setSearchQuery('')}
              >
                <Text style={styles.clearText}>Clear Search</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                onPress={() => handleProductPress(item)}
                onWishlistToggle={toggleWishlist}
                isWishlisted={isProductWishlisted ? isProductWishlisted(item.id) : false}
              />
            )}
            numColumns={2}
            contentContainerStyle={styles.productList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    marginTop: 30,
    marginLeft: 30,
    fontSize: 35,
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 30,
    marginTop: 20,
    borderRadius: 20,
    alignItems: "center",
    height: 60,
    flexDirection: "row",
    paddingHorizontal: 25,
  },
  searchIcon: {
    color: "#C5C5C5",
    marginRight: 10,
  },
  search: {
    fontSize: 15,
    flex: 1,
  },
  categoriesContainer: {
    height: 70, // Fixed height for the categories section
    marginTop: 20,
  },
  categoriesList: {
    paddingLeft: 30,
  },
  productList: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  errorText: {
    fontSize: 16,
    color: '#E96E6E',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#E96E6E',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  retryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  clearButton: {
    backgroundColor: '#E96E6E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  clearText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});