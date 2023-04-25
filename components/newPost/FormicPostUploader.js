import React, { useState, useEffect } from 'react'
import * as yup from 'yup';
import { Formik } from 'formik';
import {Button, Image, View, Text } from 'react-native';
import { TextInput } from 'react-native';
import {  Divider } from 'react-native-elements';
import validUrl from 'valid-url'
import {firebase, db} from '../../firebase'

const placeholder_img = 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg'

const uploadPostSchema = yup.object().shape({
    imageUrl: yup.string().url().required('A url is required'),
    caption: yup.string().max(2200, 'Caption has reached the max limit.')
});

const FormicPostUploader = ({navigation}) => {
    const [thumbnailUrl, setThumbnailUrl] = useState(placeholder_img)
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null)

    const getUsername = () => {
      const user = firebase.auth().currentUser
      const unsubscribe = db.collection('users').where('owner_uid', '==', user.uid).limit(1).onSnapshot(
        snapshot => snapshot.docs.map(doc=> {
          setCurrentLoggedInUser({
            username: doc.data().username,
            profilePicture: doc.data().profile_picture,
          })
        })
      )
      return unsubscribe
    }

    useEffect(()=>{
        getUsername()
    },[])

    const uploadPostToFirebase = (imageUrl, caption) =>{
      const unsubscribe = db.collection('users').doc(firebase.auth().currentUser.email).collection('posts')
      .add({
        imageUrl: imageUrl,
        user: currentLoggedInUser.username,
        profile_picture: currentLoggedInUser.profilePicture,
        owner_uid: firebase.auth().currentUser.uid,
        owner_email: firebase.auth().currentUser.email,
        caption: caption,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        likes_by_users: [],
        comments: [],
      })
      .then(()=> navigation.goBack())
      return unsubscribe
    }

  return (
   <Formik initialValues={{caption: '', imageUrl: ''}}
    onSubmit={(values) =>{
      uploadPostToFirebase(values.imageUrl, values.caption)
      }} 
    validationSchema={uploadPostSchema} 
    validateOnMount={true}>
        {({handleBlur, handleChange, handleSubmit, values, errors, isValid})=>
        <>
            <View style={{margin: 20, justifyContent: 'space-between', flexDirection: 'row'}}>
                <Image source={{uri: validUrl.isUri(thumbnailUrl) ? thumbnailUrl : placeholder_img}} style={{height: 100, width: 100}}/>
            <View style={{flex: 1, marginLeft: 10}}>
            <TextInput style={{fontSize: 20}} placeholder='Write a caption'
             placeholderTextColor='grey'
              multiline={true} 
              onChangeText={handleChange('caption')}
                onBlur={handleBlur('caption')}
                value={values.caption}
              />
              </View>
            </View>
            <Divider width={1} orientation='vertical'/>
            <TextInput style={{fontSize: 20}} placeholder='Insert an image'
            onChange={e => setThumbnailUrl(e.nativeEvent.text)}
             placeholderTextColor='grey'
             onChangeText={handleChange('imageUrl')}
                onBlur={handleBlur('imageUrl')}
                value={values.imageUrl}
             />
             {errors.imageUrl && (
              <Text style={{fontSize: 10, color: 'red'}}>
                {errors.imageUrl}
              </Text>
             )}
             <Button onPress={handleSubmit} title='Share' disabled={!isValid}/>
        </>
        }
   </Formik>
  )
}

export default FormicPostUploader