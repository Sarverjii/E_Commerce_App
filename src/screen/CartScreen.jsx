import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  return (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="contain" />
      
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <Text style={[styles.quantityButtonText, item.quantity <= 1 && styles.disabledButton]}>-</Text>
          </TouchableOpacity>
          
          <Text style={styles.quantity}>{item.quantity}</Text>
          
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => removeFromCart(item.id)}
      >
        <Ionicons name="close" size={24} color="#888" />
      </TouchableOpacity>
    </View>
  );
};

const CartScreen = ({ route, navigation }) => {
  const { cartItems = [], updateQuantity, removeFromCart, clearCart } = route.params || {};
  
  const calculateTotal = () => {
    if (!cartItems || cartItems.length === 0) return 0;
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    Alert.alert(
      "Checkout",
      "This is a dummy checkout button. In a real app, this would proceed to payment.",
      [{ text: "OK" }]
    );
  };

  return (
    <LinearGradient colors={['#FDF0F3', "#FFFBFC"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Cart</Text>
          {cartItems && cartItems.length > 0 && (
            <TouchableOpacity onPress={clearCart}>
              <Text style={styles.clearCart}>Clear All</Text>
            </TouchableOpacity>
          )}
        </View>
        
        {cartItems && cartItems.length > 0 ? (
          <>
            <FlatList
              data={cartItems}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <CartItem 
                  item={item} 
                  updateQuantity={updateQuantity} 
                  removeFromCart={removeFromCart}
                />
              )}
              contentContainerStyle={styles.cartList}
              showsVerticalScrollIndicator={false}
            />
            
            <View style={styles.totalContainer}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Subtotal</Text>
                <Text style={styles.totalValue}>${calculateTotal().toFixed(2)}</Text>
              </View>
              
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Shipping</Text>
                <Text style={styles.totalValue}>$5.00</Text>
              </View>
              
              <View style={[styles.totalRow, styles.finalRow]}>
                <Text style={styles.grandTotalLabel}>Total</Text>
                <Text style={styles.grandTotalValue}>${(calculateTotal() + 5).toFixed(2)}</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.checkoutButton}
                onPress={handleCheckout}
              >
                <Text style={styles.checkoutText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.emptyCartContainer}>
            <Ionicons name="cart-outline" size={100} color="#E96E6E" />
            <Text style={styles.emptyCartText}>Your cart is empty</Text>
            <TouchableOpacity 
              style={styles.continueShopping}
              onPress={() => navigation.navigate('HOME')}
            >
              <Text style={styles.continueShoppingText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default CartScreen;

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
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  clearCart: {
    color: '#E96E6E',
    fontSize: 16,
  },
  cartList: {
    paddingHorizontal: 20,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#E96E6E',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#E96E6E',
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.5,
  },
  quantity: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  removeButton: {
    padding: 5,
  },
  totalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 16,
    color: '#666',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  finalRow: {
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    paddingTop: 15,
    marginBottom: 20,
  },
  grandTotalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  grandTotalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#E96E6E',
  },
  checkoutButton: {
    backgroundColor: '#E96E6E',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  checkoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  emptyCartText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    marginBottom: 30,
  },
  continueShopping: {
    backgroundColor: '#E96E6E',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  continueShoppingText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
})