import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const { width } = Dimensions.get('window');
const cardWidth = (width - 70) / 2;

const ProductCard = ({ product, onPress, onWishlistToggle, isWishlisted }) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}
    >
      {/* Wishlist Icon */}
      <TouchableOpacity 
        style={styles.wishlistButton}
        onPress={(e) => {
          e.stopPropagation(); // Prevent triggering the parent onPress
          if (onWishlistToggle) {
            onWishlistToggle(product.id);
          }
        }}
      >
        <MaterialIcons 
          name={isWishlisted ? "favorite" : "favorite-border"} 
          size={22} 
          color={isWishlisted ? "#E96E6E" : "#938F8F"} 
        />
      </TouchableOpacity>

      {/* Product Image */}
      <Image 
        source={{ uri: product.image }} 
        style={styles.image}
        resizeMode="contain"
      />

      {/* Product Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ProductCard

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  wishlistButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 5,
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 10,
  },
  infoContainer: {
    marginTop: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    color: '#333',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E96E6E',
  }
})