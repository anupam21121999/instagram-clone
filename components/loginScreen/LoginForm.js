import React from 'react'
import {Text, View, TextInput, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import * as yup from 'yup';
import { Formik } from 'formik';
import Validator from 'email-validator';
import {firebase, db} from '../../firebase'
import { Alert } from 'react-native';

const LoginForm = ({navigation}) => {

    const LoginFormSchema = yup.object().shape({
        email: yup.string().email().required('An email is required'),
        password: yup.string().min(6, 'Your password must have 6 characters'),
    });

    const onLogin = async (email, password) =>{
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        console.log('Firebase Login Successful', email, password)
      } catch (error) {
        Alert.alert(error.message)
      }
    }

  return (
    <View style={styles.wrapper}>
    <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={values =>{
            onLogin(values.email, values.password)
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}
    >
     {({handleBlur, handleChange, handleSubmit, values, errors, isValid, Alert})=>
        <>
    <View style={[styles.inputField,
        {
          borderColor:
          values.email.length < 1 || Validator.validate(values.email) ? '#ccc' : 'red'
        },
    ]}>
      <TextInput placeholder='Phone number, Username or Email'
                autoCapitalize='none'
                keyboardType='email-address'
                textContentType='emailAddress'
                autoFocus={true}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
      />
      </View>
      <View style={[styles.inputField,
        {
          borderColor:
          1 > values.password.length || values.password.length >=6 ? '#ccc' : 'red'
        },
    ]}>
      <TextInput placeholder='Password'
                autoCapitalize='none'
                textContentType='password'
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
      />
      </View>
      <View style={{alignItems: 'flex-end', marginTop: 20}}>
        <Text style={{color: '#6BB0F5', marginBottom: 30}}>Forgot Password</Text>
      </View>
      <Pressable style={styles.button(isValid)} titleSize={20} onPress={handleSubmit} disabled={!isValid}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </Pressable>
      <View style={styles.signupContainer}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.push('SignupScreen')}>
            <Text style={{Color: '#0096F6'}}>      Sign up</Text>
        </TouchableOpacity>
      </View>
      </>
     }
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 80,
    },
    inputField: {
        borderRadius: 4,
        padding: 12,
        marginBottom: 10,
        borderWidth: 1,
    },
    button: isValid =>({
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isValid ? '#0096F6' : '#9ACAF7',
        maxHeight: 42,
        borderRadius: 4,
    }),
    buttonText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '600',
    },
    signupContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginTop: 50,
    }
});

export default LoginForm