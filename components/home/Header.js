import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { firebase } from '../../firebase';

const handleSignOut = async () => {
  try {
    await firebase.auth().signOut()
    console.log("Signed out Successfully")
  } catch (error) {
    console.log(error)
  }
}

const Header = ({navigation}) => {
  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={handleSignOut}>
      <Image 
      style={styles.logo}
        source={require('../../assets/instagram.png')}
      />
      </TouchableOpacity>
      <View style={styles.iconContainer}>
      <TouchableOpacity onPress={() => navigation.push('NewPostScreen')}>
      <Image 
      style={styles.icon}
        source={{uri: 'https://img.icons8.com/ios-glyphs/512/plus-2-math.png'}}
      />
      </TouchableOpacity>
      <TouchableOpacity>
      <Image 
      style={styles.icon}
        source={{uri :'https://img.icons8.com/sf-regular/512/hearts.png'}}
      />
      </TouchableOpacity>
      <TouchableOpacity>
      <View style={styles.unreadBadge}>
        <Text style={styles.unreadBadgeText}>11</Text>
      </View>
      <Image 
      style={styles.icon}
        source={{uri: 'https://img.icons8.com/ios/512/facebook-messenger.png'}}
      />
      </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,
    },
    iconContainer: {
        flexDirection: 'row',
    },
    logo: {
      width: 100,
      height: 50,
      resizeMode: 'contain',
    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginLeft: 10,
    },
    unreadBadge: {
        backgroundColor: '#FF3131',
        position: 'absolute',
        left: 20,
        bottom: 18,
        width: 25,
        height: 18,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
    },
    unreadBadgeText: {
        color: "white",
        fontWeight: 'bold',
    }
  });


export default Header