import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const ProductDetailsScreen = ({ route }) => {
  const { product, isWishlisted, onWishlistToggle, addToCart } = route.params;
  const [quantity, setQuantity] = useState(1);
  const navigation = useNavigation();

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <LinearGradient colors={['#FDF0F3', "#FFFBFC"]} style={styles.container}>
      <StatusBar hidden={true}/>
      
      <SafeAreaView style={styles.safeArea}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.wishlistButton}
            onPress={() => onWishlistToggle && onWishlistToggle(product.id)}
          >
            <MaterialIcons 
              name={isWishlisted ? "favorite" : "favorite-border"} 
              size={24} 
              color={isWishlisted ? "#E96E6E" : "#938F8F"} 
            />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Product Image */}
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: product.image }} 
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          {/* Product Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.category}>{product.category}</Text>
            <Text style={styles.title}>{product.title}</Text>
            <View style={styles.ratingContainer}>
              <MaterialIcons name="star" size={20} color="#FFD700" />
              <Text style={styles.rating}>{product.rating.rate} ({product.rating.count} reviews)</Text>
            </View>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>

            {/* Quantity Selector */}
            <View style={styles.quantityContainer}>
              <Text style={styles.quantityLabel}>Quantity:</Text>
              <View style={styles.quantityControls}>
                <TouchableOpacity 
                  style={styles.quantityButton}
                  onPress={decreaseQuantity}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityValue}>{quantity}</Text>
                <TouchableOpacity 
                  style={styles.quantityButton}
                  onPress={increaseQuantity}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Description */}
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>
        </ScrollView>

        {/* Add to Cart Button */}
        <View style={styles.bottomContainer}>
      <TouchableOpacity 
        style={styles.addToCartButton}
        activeOpacity={0.8}
        onPress={() => {
          if (addToCart) {
            const productWithQuantity = {
              ...product,
              quantity
            };
            addToCart(productWithQuantity);
            navigation.navigate('CART');
          }
        }}
      >
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#FFF',
  },
  wishlistButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#FFF',
  },
  imageContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: 250,
  },
  infoContainer: {
    padding: 20,
  },
  category: {
    color: '#938F8F',
    fontSize: 14,
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rating: {
    marginLeft: 5,
    color: '#333',
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: '#E96E6E',
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#E96E6E',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityValue: {
    marginHorizontal: 15,
    fontSize: 16,
    fontWeight: '500',
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#666',
  },
  bottomContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  addToCartButton: {
    backgroundColor: '#E96E6E',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  addToCartText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
})