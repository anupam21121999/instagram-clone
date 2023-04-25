import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import LoginForm from '../components/loginScreen/LoginForm'

const instagram_logo = 'https://w7.pngwing.com/pngs/477/609/png-transparent-logo-computer-icons-instagram-logo-instagram-logo-miscellaneous-text-trademark.png'

const LoginScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={{uri: instagram_logo, height: 100, width: 100}}/>
      </View>
      <LoginForm navigation={navigation}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 50,
        paddingHorizontal: 15,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 60,
    }
});

export default LoginScreen