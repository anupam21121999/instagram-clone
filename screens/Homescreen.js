import {StyleSheet, View, Text} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/home/Header'
import Stories from '../components/Stories'
import Post from '../components/Post'
import { ScrollView } from 'react-native'
import {POSTS} from '../data/posts'
import BottomTabs from '../components/home/BottomTabs'
import {bottomTabIcons} from '../components/home/BottomTabs'
import {db} from '../firebase'

const Homescreen = ({navigation}) => {
  const [posts, setPosts] = useState([])

  useEffect(()=>{
      db.collectionGroup('posts')
      .onSnapshot(snapshot=>{
        setPosts(snapshot.docs.map(post=>(
          {id: post.id, ...post.data()})))
      })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation}/>
      <Stories/>
      <ScrollView>
      {posts.map((post, index) => (
        <Post post={post} key={index}/>
      ))}
      </ScrollView>
      <BottomTabs icons={bottomTabIcons}/>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
  });

export default Homescreen