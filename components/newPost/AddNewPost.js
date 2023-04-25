import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import FormicPostUploader from './FormicPostUploader';


const AddNewPost = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Header navigation={navigation}/>
        <FormicPostUploader navigation={navigation}/>
    </View>
  )
}

const Header = ({navigation}) =>(
    <View style={styles.headerContainer}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
    <Image source={{uri: 'https://img.icons8.com/ios-glyphs/512/less-than.png'}} style={{height: 30, width: 30}}/>
      </TouchableOpacity>
      <Text style={styles.headerText}>New Post!</Text>
      <Text></Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
      marginHorizontal: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: '700',
        marginRight: 25,
    }
  });

export default AddNewPost