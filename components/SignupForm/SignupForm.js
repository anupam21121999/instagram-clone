import {Text, View, TextInput, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import * as yup from 'yup';
import { Formik } from 'formik';
import Validator from 'email-validator';
import {firebase,db} from '../../firebase'
import { Alert } from 'react-native';

const SignupForm = ({navigation}) => {

    const SignupFormSchema = yup.object().shape({
        email: yup.string().email().required('An email is required'),
        username: yup.string().required().min(4, 'An email is required'),
        password: yup.string().min(6, 'Your password must have 6 characters'),
    });

    const getRandomProfilePicture = async() => {
        const response = await fetch('https://randomuser.me/api')
        const data = await response.json()
        return data.results[0].picture.large
    }

    const onSignup = async(email, password, username) => {
        try {
            const authUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
            console.log('Firebase User Created Successful', email, password)

            db.collection('users').doc(authUser.user.email).set({
                owner_uid: authUser.user.uid,
                username: username,
                email: authUser.user.email,
                profile_picture: await getRandomProfilePicture(),
            })
        } catch (error) {
            Alert.alert(error.message)
        }
    }

  return (
    <View style={styles.wrapper}>
    <Formik
        initialValues={{email: '', username: '', password: ''}}
        onSubmit={values =>{
            onSignup(values.email, values.password, values.username)
        }}
        validationSchema={SignupFormSchema}
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
      <TextInput placeholder='Email'
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
          1 > values.username.length || values.username.length >=6 ? '#ccc' : 'red'
        },
    ]}>
      <TextInput placeholder='Username'
                autoCapitalize='none'
                textContentType='username'
                autoFocus={true}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
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
      <Pressable style={styles.button(isValid)} titleSize={20} onPress={handleSubmit} disabled={!isValid}>
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
      <View style={styles.signupContainer}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.push('LoginScreen')}>
            <Text style={{Color: '#6BB0F5'}}>      Log in</Text>
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

export default SignupForm