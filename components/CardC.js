import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableWithoutFeedback, ImageBackground, Platform } from 'react-native';
import Bird from './Bird'
import Obstacles from './Obstacles'
// import weather from './assets/weather.jpeg'
import { Text, Card, Button, Icon, ListItem,PricingCard, lightColors, Header, HeaderProps, Avatar } from '@rneui/themed';
// import Card from './components/Card'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import {LinearGradient} from 'react-native-linear-gradient'
import job from '../assets/job.jpeg'
import NetInfo from "@react-native-community/netinfo";
import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog';
import AwesomeAlert from 'react-native-awesome-alerts';
// import mario_r from './assets/mario_r.jpg';
// import birds from './assets/birds.png'
// import mario from './assets/mario.jpeg';
import {files} from '../assets/data-uri.js'
import {notification} from 'antd';
import alert from './alert.js'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import axios from 'axios'


export default function CardC({ navigation }) {
  // const moveBack = () => {

  // }
      return (
        <View>

<ListItem bottomDivider>
    <Avatar
      rounded
      source={{ uri: 'https://mitra-leader.vahan.co/image/mitra-logo.png' }}
    />
    <ListItem.Content >
      <ListItem.Title>Daily Earnings Current Week</ListItem.Title>
      {/* <ListItem.Subtitle>President</ListItem.Subtitle> */}
      <ListItem.Subtitle style= {{flexDirection: 'row', fontSize: 27}}>17000 Rs</ListItem.Subtitle>
    </ListItem.Content>
  </ListItem>

  <ListItem bottomDivider>
    <Avatar
      rounded
      source={{ uri: 'https://mitra-leader.vahan.co/image/mitra-logo.png' }}
    />
    <ListItem.Content >
      <ListItem.Title>Incentives Current Week</ListItem.Title>
      {/* <ListItem.Subtitle>President</ListItem.Subtitle> */}
      <ListItem.Subtitle style= {{flexDirection: 'row', fontSize: 27}}>2000 Rs</ListItem.Subtitle>
    </ListItem.Content>
  </ListItem>

  <ListItem bottomDivider></ListItem>

  <ListItem bottomDivider>
    <Avatar
      rounded
      source={{ uri: 'https://mitra-leader.vahan.co/image/mitra-logo.png' }}
    />
    <ListItem.Content >
      <ListItem.Title>Total</ListItem.Title>
      {/* <ListItem.Subtitle>President</ListItem.Subtitle> */}
      <ListItem.Subtitle style= {{flexDirection: 'row', fontSize: 27}}>19000 Rs</ListItem.Subtitle>
    </ListItem.Content>
  </ListItem>

  <Button onPress={() => navigation.navigate('Home')}>
    Go Back
  </Button>

             {/* <Card.Title>CARD WITH DIVIDER</Card.Title>
        <Card.Divider/>
        <View style={{position:"relative",alignItems:"center"}}>
          <Image
              style={{width:"100%",height:100}}
              resizeMode="contain"
              source={{ uri: "https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4" }}
            />
          <Text >Pranshu Chittora</Text>
         </View>
         <Card></Card>
         { <View> */}
         {/* <Card>
          <Card.Title>Mitra</Card.Title>
          <Card.Divider /> */}
          {/* <Card.Image
            style={{ padding: 0 }}
            source={job}
          /> */}
          {/* <Text style={{ marginBottom: 10 }}>
            Work with multiple companies
          </Text> */}
          {/* <Button
            icon={
              <Icon
                name="code"
                color="#ffffff"
                iconStyle={{ marginRight: 10 }}
              />
            }
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            title="VIEW NOW"
          /> */}
        {/* </Card> */}

{/* <PricingCard
        color={lightColors.primary}
        title="Your Income"
        price={1000}
        info={['2023-02-21', '2023-02-27']}
        button={{ title: ' View Detailed', icon: 'flight-takeoff', onPress : fetchData }}
      /> */}
        </View>
      )
}
