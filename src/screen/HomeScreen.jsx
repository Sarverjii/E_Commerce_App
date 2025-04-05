import { StyleSheet, Text, View, StatusBar, TextInput, FlatList, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Category from '../components/category';
import ProductCard from '../components/ProductCard';

const Categories = ["Trending Now", "New", "Men", "Woman", "Jeans"];

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("Trending Now");
  return (
    <LinearGradient colors={['#FDF0F3', "#FFFBFC"]} style={styles.container}>
      {/* StatusBar */}
      <StatusBar hidden={true}/>

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
            placeholder="Search"
            placeholderTextColor="#C5C5C5"
          />
        </View>

        {/* Scrollable Categories */}
        <View style={styles.categoriesContainer}>
          <FlatList
            data={Categories}
            keyExtractor={(item) => item}
            renderItem={({item}) => (
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
        <View style={styles.productsContainer}>
          <ProductCard/>
          <ProductCard/>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({

  productsContainer:{
    flexDirection: "row"
  },

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
    paddingLeft: 25,
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

});