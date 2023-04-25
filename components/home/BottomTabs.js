import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { Divider } from 'react-native-elements'

export const bottomTabIcons = [
    {
        name: 'HOME',
        active: 'https://img.icons8.com/ios-glyphs/512/home-page.png',
        inactive: 'https://img.icons8.com/material-outlined/512/home-page.png',
    },
    {
        name: 'SEARCH',
        active: 'https://img.icons8.com/sf-black/512/search.png',
        inactive: 'https://img.icons8.com/sf-regular/512/search.png',
    },
    {
        name: 'REELS',
        active: 'https://img.icons8.com/ios-filled/512/instagram-reel.png',
        inactive: 'https://img.icons8.com/ios/512/instagram-reel.png',
    },
    {
        name: 'SHOP',
        active: 'https://img.icons8.com/material-rounded/512/shopping-mall.png',
        inactive: 'https://img.icons8.com/material-outlined/512/shopping-mall.png',
    },
    {
        name: 'PROFILE',
        active: 'https://img.icons8.com/ios-filled/512/user-male-circle.png',
        inactive: 'https://img.icons8.com/ios/512/user-male-circle--v1.png',
    },
]

const BottomTabs = ({icons}) => {
    const [activeTab, setActiveTab] = useState('HOME')

    const Icon = ({icon}) =>(
        <TouchableOpacity onPress={()=> setActiveTab(icon.name)}>
            <Image source={{uri: activeTab=== icon.name ? icon.active : icon.inactive}} style={[styles.icon,
                icon.name==='Profile' ? styles.profilePic : null,
                activeTab === 'Profile' && icon.name === activeTab ? styles.profilePic(activeTab) : null
            ]}/>
        </TouchableOpacity>
    )
  return (
    <View style={styles.wrapper}>
    <Divider width={1} orientation= 'vertical'/>
    <View style={styles.container}>
      {icons.map((icon,index)=>(
        <Icon icon={icon} key={index}/>
      ))}
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        width: '100%',
        bottom: '0%',
        zIndex: 999,
        backgroundColor: 'grey'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50,
        paddingTop: 10,
    },
    icon: {
        width: 30,
        height: 30,
    },
    profilePic: {
        borderRadius: 50,
        borderColor: '#fff',
    }
  });

export default BottomTabs