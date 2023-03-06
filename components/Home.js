import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableWithoutFeedback, ImageBackground, Platform } from 'react-native';
import Bird from './Bird'
import Obstacles from './Obstacles'
// import weather from './assets/weather.jpeg'
import { Text, Card, Button, Icon, ListItem,PricingCard, lightColors, Header, HeaderProps } from '@rneui/themed';
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
import {NavigationContainer, useRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import axios from 'axios'


export default function Home({ navigation }) {
    const [earning, setEarnings] = useState(0)
    const [offline, setOffline] = useState(false);
    const [connected, setConnected] = useState(true);


    const routeDetailed = () => {
        navigation.navigate('Earnings Distribution');
    }

    const routeHome = () => {
        navigation.navigate('Home');
    }

    const routeGame = () => {
        navigation.navigate('Flappy');
    }

    const createTwoButtonAlert = (connected) => {
    // const net =     NetInfo.fetch()   
    alert(connected ? 'Internet is connected' : 'Not able to connect with Server', 'Earnings Page', [
      {
        text: 'Retry Earnings Page ' ,
        onPress: () => routeHome(),
        style: 'cancel',
      },
      {text: 'Play Game', onPress: () => routeGame()},
    ], {cancelable: true});

}

    useEffect(() => {
        // Subscribe to network state updates
        const unsubscribe = NetInfo.addEventListener((state) => {
          // setNetInfo(
          //   `Connection type: ${state.type}
          //   Is connected?: ${state.isConnected}
          //   IP Address: ${state.details.ipAddress}`
          // );
          console.log(state)
          console.log(offline, 'offline')
        //   if()
        // console.log(useRoute().name, 'useRoute')
          if(!state.isConnected && state.isInternetReachable !== null &&  !state.isInternetReachable) {
            // setNetInfo(false);
            console.log('Inside connected')
            // reload();
            // triggerNot();
            setOffline(true);
            setConnected(false);
            createTwoButtonAlert(false);
            // setOffline(true);
            // setShowAlert(true);
            
            // showAlert = true;
            // createTwoButtonAlert()
            // console.log(offline,'offline', showAlert, 'showAlert')
          } else if(state.isConnected && state.isInternetReachable) {
            console.log('Online')
            if(offline) {
                setOffline(false);
                setConnected(true);
                createTwoButtonAlert(true);
            }
          }
          console.log(state);
        });
    
        return () => {
          // Unsubscribe to network state updates
          unsubscribe();
        };
      }, [offline]);
      
    const callAPIs = async () => {
        try {
        //   const response = await fetch(
        //     Platform.OS === 'web' ? 'http://localhost:3000/earnings' : 'http://192.168.1.5:3000/earnings', {
        //         // mode: 'no-cors'
        //     }
        //   );
          const res = await axios.get(`http://192.168.1.5:3000/earnings`, {
            headers: {
                component: 'Home'
            }
          });
            // console.log(res)
        //   const json = await response.json();
        //   const json = {
        //     earnings: 19000
        //   }
          console.log(res.data);
          return res.data;
        } catch (error) {
            if(error && error.message == 'Network Error') {
                console.log('Inside')
                createTwoButtonAlert(connected);
              } 
          console.error(error);
        }
      };
  
      async function fetchData() {
        // You can await here
        const response = await callAPIs();
        console.log(response);
        setEarnings(response.earnings)
        // ...
      }

      useEffect(() => {
        fetchData();
    }, []);

      return (
        <View>

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
         <Card>
          <Card.Title>Mitra</Card.Title>
          <Card.Divider />
          <Card.Image
            style={{ padding: 0 }}
            source={job}
          />
          <Text style={{ marginBottom: 10 }}>
            Work with multiple companies
          </Text>
          <Button
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
          />
        </Card>

<PricingCard
        color={lightColors.primary}
        title="Your Income"
        price={earning}
        info={['2023-02-21', '2023-02-27']}
        button={{ title: ' View Detailed', icon: 'flight-takeoff', onPress : routeDetailed }}
      >
        
      </PricingCard>
     <Button onPress={fetchData}>
    Refresh Earnings
  </Button>
        </View>
      )
}
