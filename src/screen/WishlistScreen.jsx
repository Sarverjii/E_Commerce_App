import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';

const WishlistScreen = ({ route }) => {
  const { wishlistItems, onWishlistToggle, addToCart } = route.params || {};
  const navigation = useNavigation();

  return (
    <LinearGradient colors={['#FDF0F3', "#FFFBFC"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.headerTitle}>My Wishlist</Text>
        
        {wishlistItems && wishlistItems.length > 0 ? (
          <FlatList
            data={wishlistItems}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <ProductCard 
                product={item} 
                isWishlisted={true}
                onWishlistToggle={onWishlistToggle}
                onPress={() => navigation.navigate('ProductDetails', { 
                  product: item,
                  isWishlisted: true,
                  onWishlistToggle,
                  addToCart
                })}
              />
            )}
            numColumns={2}
            contentContainerStyle={styles.productList}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-outline" size={100} color="#E96E6E" />
            <Text style={styles.emptyText}>Your wishlist is empty</Text>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginTop: 15,
    marginBottom: 20,
    marginLeft: 20,
  },
  productList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
  },
})