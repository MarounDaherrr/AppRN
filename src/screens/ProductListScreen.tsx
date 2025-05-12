import React from 'react';
import { FlatList, View, Text, Button, StyleSheet, Image, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import { useTheme } from '../context/ThemeContext';  
import products from '../assets/Products.json';

const { width, height } = Dimensions.get('window'); 

type ProductListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProductList'>;

interface ProductListScreenProps {
  navigation: ProductListScreenNavigationProp;
}

const ProductListScreen: React.FC<ProductListScreenProps> = ({ navigation }) => {
  const { isDarkMode } = useTheme();  

  const renderItem = ({ item }: { item: typeof products.data[0] }) => (
    <View style={[styles.itemContainer, { backgroundColor: isDarkMode ? '#555' : '#fff' }]}>
      <Image
        source={{ uri: item.images[0].url }}
        style={[styles.image, { width: width * 0.4, height: height * 0.2 }]} 
      />
      <Text style={[styles.title, { color: isDarkMode ? 'white' : 'black' }]}>{item.title}</Text>
      <Text style={[styles.price, { color: isDarkMode ? 'lightgreen' : 'green' }]}>${item.price}</Text>
      <Button
        title="View Details"
        onPress={() => navigation.navigate('ProductDetails', { productId: item._id })}
      />
    </View>
  );

  return (
    <FlatList
      data={products.data}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: { marginBottom: 10, padding: 10, borderWidth: 1, borderRadius: 5 },
  image: { borderRadius: 5, marginBottom: 10, resizeMode: 'contain' },
  title: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 14 },
});

export default ProductListScreen;
