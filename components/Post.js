import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements'
import {firebase, db} from '../firebase'

const PostFooterIcons = [
  {
    name: 'Like',
    imageurl: 'https://img.icons8.com/ios-glyphs/512/hearts.png',
    likedImageUrl: 'https://img.icons8.com/color/512/hearts.png',
  },
  {
    name: 'Comment',
    imageurl: 'https://img.icons8.com/external-royyan-wijaya-detailed-outline-royyan-wijaya/512/external-comment-communication-royyan-wijaya-detailed-outline-royyan-wijaya.png',
  },
  {
    name: 'Share',
    imageurl: 'https://img.icons8.com/material-sharp/512/share.png',
  },
  {
    name: 'Save',
    imageurl: 'https://img.icons8.com/material/512/bookmark-outline.png',
  },
]

const Post = ({post}) => {
  const handleLike = post => {
    const currentLikeStatus = !post.likes_by_users.includes(
      firebase.auth().currentUser.email
    )
    db.collection('users')
    .doc(post.owner_email)
    .collection('posts')
    .doc(post.id)
    .update({
      likes_by_users: currentLikeStatus ? firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.email) :
      firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.email),
    })
    .then(() =>{
      console.log("Document updated successfully!")
    })
    .catch(error =>{
      console.log("Error updating document:", error)
    })
  }
  return (
    <View style={{marginBottom: 30}}>
    <Divider width={1} orientation='vertical'/>
      <PostHeader post={post}/>
      <PostImage post={post}/>
      <View style={{marginHorizontal: 15, marginTop: 10}}>
      <PostFooter post={post} handleLike={handleLike}/>
      <Likes post={post}/>
      <Caption post={post}/>
      <CommentSection post={post}/>
      <Comment post={post}/>
      </View>
    </View>
  )
}

const PostHeader = ({post}) =>(
        <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 5, alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={{uri: post.profile_picture}} style={styles.story}/>
                <Text style={{marginLeft: 5, fontWeight: '700'}}>{post.username}</Text>
            </View>
            <Text style={{fontWeight: '900'}}>...</Text>
        </View>
)

const PostImage = ({post}) => (
  <View style={{width: '100%', height: 450}}>
  <Image source={{uri: post.imageUrl}} style={{height: '100%', resizeMode: 'cover'}}/>
  </View>
)

const PostFooter = ({handleLike, post}) =>(
  <View style={{flexDirection: 'row'}}>
  <View style={styles.leftFooterIcon}>
  <TouchableOpacity onPress={()=> handleLike(post)}>
    <Image style={styles.footerIcon} source={{uri: post.likes_by_users.includes(firebase.auth().currentUser.email)
    ? PostFooterIcons[0].likedImageUrl
    : PostFooterIcons[0].imageurl
    }}/>
  </TouchableOpacity>
  <Icon imgStyle={styles.footerIcon} imgUrl={PostFooterIcons[1].imageurl}/>
  <Icon imgStyle={[styles.footerIcon, styles.shareIcon]} imgUrl={PostFooterIcons[2].imageurl}/>
  </View>
  <View style={{flex: 1, alignItems: 'flex-end'}}>
  <Icon imgStyle={styles.footerIcon} imgUrl={PostFooterIcons[3].imageurl}/>
  </View>
  </View>
)

const Icon = ({imgStyle, imgUrl}) =>(
  <TouchableOpacity>
    <Image style={imgStyle} source={{uri: imgUrl}}/>
  </TouchableOpacity>
)

const Likes = ({post}) =>(
  <View style={{flexDirection: 'row', marginTop: 4}}>
  <Text style={{fontWeight: '600'}}>{post.likes_by_users.length.toLocaleString('en')} Likes</Text>
  </View>
)

const Caption = ({post}) =>(
  <View style={{marginTop: 5}}>
  <Text>
  <Text style={{fontWeight: '600'}}>{post.username}</Text>
  <Text>  {post.caption}</Text>
  </Text>
  </View>
)

const CommentSection = ({post}) =>(
  <View style={{marginTop: 5}}>
  {!!post.comments.length && (
  <Text style={{color: 'gray'}}>
  View {post.comments.length > 1 ? 'all' : ' '} {post.comments.length}{' '}
    {post.comments.length > 1 ? 'Comments' : 'Comment'}
  </Text>
  )}
  </View>
)

const Comment = ({post}) =>(
  <>
    {post.comments.map((comment, index) =>(
      <View key={index} style={{flexDirection: 'row', marginTop: 5}}>
        <Text>
          <Text>{comment.user}</Text>
          {comment.comment}
        </Text>
      </View>
    ))}
  </>
)

const styles = StyleSheet.create({
    story: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginLeft: 6,
        borderWidth: 3,
        borderColor: 'orange',
    },
    footerIcon: {
      height: 33,
      width: 33,
      color: 'black',
    },
    shareIcon: {
      transform: [{rotate: '320deg'}],
      marginTop: -3,
    },
    leftFooterIcon: {
      flexDirection: 'row',
      width: '32%',
      justifyContent: 'space-between',
    }
});

export default Post