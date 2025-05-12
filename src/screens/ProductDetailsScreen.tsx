import React from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import { useTheme } from '../context/ThemeContext';  
import products from '../assets/Products.json';

const { width, height } = Dimensions.get('window'); 

type ProductDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetails'>;
type ProductDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

interface ProductDetailsScreenProps {
  navigation: ProductDetailsScreenNavigationProp;
  route: ProductDetailsScreenRouteProp;
}

const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({ route, navigation }) => {
  const { productId } = route.params;
  
  const product = products.data.find(item => item._id === productId);
  const { isDarkMode } = useTheme();  

  if (!product) {
    return (
      <View>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
      <Image
        source={{ uri: product.images[0].url }}
        style={[styles.image, { width: width * 0.8, height: height * 0.4 }]}
      />
      <Text style={[styles.title, { color: isDarkMode ? 'white' : 'black' }]}>{product.title}</Text>
      <Text style={[styles.description, { color: isDarkMode ? 'white' : 'black' }]}>{product.description}</Text>
      <Text style={[styles.price, { color: isDarkMode ? 'lightgreen' : 'green' }]}>${product.price}</Text>
      <Button title="Add to Cart" onPress={() => console.log('Add to cart')} />
      <Button title="Share" onPress={() => console.log('Share product')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  image: { borderRadius: 5, marginBottom: 10, resizeMode: 'contain' },
  title: { fontSize: 22, fontWeight: 'bold' },
  description: { fontSize: 16, marginVertical: 10 },
  price: { fontSize: 18 },
});

export default ProductDetailsScreen;
