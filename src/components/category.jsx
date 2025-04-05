import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Category = ({item, selectedCategory, setSelectedCategory}) => {
  return (
    <TouchableOpacity 
      onPress={() => setSelectedCategory(item)}
      style={[
        styles.categoryButton,
        selectedCategory === item && styles.selectedCategoryButton
      ]}
      activeOpacity={0.7}
    >
      <Text 
        style={[
          styles.categoryText, 
          selectedCategory === item && styles.selectedCategoryText
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  )
}

export default Category

const styles = StyleSheet.create({
  categoryButton: {
    backgroundColor: "#DFDCDC",
    margin: 8,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  selectedCategoryButton: {
    backgroundColor: "#E96E6E",
  },
  categoryText: {
    color: "#938F8F",
    textAlign: "center",
    fontSize: 17,
    fontWeight: '700',
  },
  selectedCategoryText: {
    color: "#FFFFFF",
  }
})
