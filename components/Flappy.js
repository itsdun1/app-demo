import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableWithoutFeedback, ImageBackground, Text } from 'react-native';
import Bird from './Bird'
import Obstacles from './Obstacles'
// import weather from './assets/weather.jpeg'
import {  Card, Button, Icon, ListItem,PricingCard, lightColors, Header, HeaderProps } from '@rneui/themed';
// import Card from './components/Card'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import {LinearGradient} from 'react-native-linear-gradient'
// import job from './assets/job.jpeg'
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
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Flappy({navigation}) {
  const Stack = createNativeStackNavigator();
  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height
//   const birdLeft = screenWidth / 2
  const [birdLeft, setBirdLeft]= useState(screenWidth / 2)
  const [birdBottom, setBirdBottom]= useState(screenHeight / 2)
  const [obstaclesLeft, setObstaclesLeft]= useState(screenWidth)
  const [obstaclesLeftTwo, setObstaclesLeftTwo]= useState(screenWidth + screenWidth/2 + 30)
  // const [birdBottom, setBirdBottom]= useState(-1)
  // const [obstaclesLeft, setObstaclesLeft]= useState(-100)
  // const [obstaclesLeftTwo, setObstaclesLeftTwo]= useState(-400)
  const [obstaclesNegHeight, setObstaclesNegHeight]= useState(0)
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo]= useState(0)
  const [isGameOver, setIsGameOver]= useState(false)
  const [score, setScore]= useState(0)
  const [earning, setEarnings] = useState(0)
  const [netInfo, setNetInfo] = useState(true);
  const gravity = 3
  let obstacleWidth = 60
  let obstacleHeight = 300
  let gap = 200
  let gameTimerId
  let obstaclesTimerId
  let obstaclesTimerIdTwo
  const mario_r = files.mario_r
  const mario = files.mario
  const weather = files.weather
  const bird = files.bird
  // let showAlert = false;
  let [showAlert, setShowAlert] = useState(false);
  let [offline, setOffline] = useState(false);
  const [connectedFlap, setConnectedFlap] = useState(true);

  const [reloadDone, setReloadDone]= useState(false)

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('highScore', value)
    } catch (e) {
      // saving error
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('highScore')
      if(value !== null) {
        // value previously stored
        return value;
      }
      return 0;
    } catch(e) {
      // error reading value
    }
  }

  useEffect(() => {

    console.log(birdBottom, obstacleHeight, screenWidth, screenHeight, "birdBottom, obstacleHeight, screenWidth. screenHeight");
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity)
      },30)
  
      return () => {
        clearInterval(gameTimerId)
      }
    }
    //if i dont have birdBottom as a dependecy, it wont stop
  }, [birdBottom])
  console.log(birdBottom)

  const jump = () => {
    if (!isGameOver && (birdBottom < screenHeight)) {
      setBirdBottom(birdBottom => birdBottom + 50)
      console.log('jumped')
    }
  }

  //start first obstacle
  useEffect(() => {
    if (obstaclesLeft > -60) {
      obstaclesTimerId = setInterval(() => {
        setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5)
      }, 30)
      return () => {
        clearInterval(obstaclesTimerId)
      }
    } else {
      setScore(score => score +1)
      setObstaclesLeft(screenWidth)
      setObstaclesNegHeight( - Math.random() * 100)
    }
  }, [obstaclesLeft])

  //start second obstacle
  useEffect(() => {
    if (obstaclesLeftTwo > -60) {
      obstaclesTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5)
      }, 30)
        return () => {
          clearInterval(obstaclesTimerIdTwo)
        }
      } else {
          setScore(score => score +1)
          setObstaclesLeftTwo(screenWidth)
          setObstaclesNegHeightTwo( - Math.random() * 100)
        }
  }, [obstaclesLeftTwo])

    //check for collisions
    useEffect(() => {
      // console.log(obstaclesLeft)
      // console.log(screenWidth/2)
      // console.log(obstaclesLeft > screenWidth/2)
      console.log(birdBottom, "birdBottom", obstaclesNegHeight + obstacleHeight + 30, "obstaclesNegHeight + obstacleHeight + 30", obstaclesNegHeight + obstacleHeight + gap -30);
      if (
        ((birdBottom < (obstaclesNegHeight + obstacleHeight + 30) ||
        birdBottom > (obstaclesNegHeight + obstacleHeight + gap -30)) &&
        (obstaclesLeft > screenWidth/2 -40 && obstaclesLeft < screenWidth/2 + 40 )
        )
        || 
        ((birdBottom < (obstaclesNegHeightTwo + obstacleHeight + 30) ||
        birdBottom > (obstaclesNegHeightTwo + obstacleHeight + gap -30)) &&
        (obstaclesLeftTwo > screenWidth/2 -40 && obstaclesLeftTwo < screenWidth/2 + 40 )
        )
        ) 
        {
        console.log('game over')
        gameOver()
      }
    })


    const reload = (() => {
      setBirdBottom(screenHeight / 2);
      setObstaclesLeft(screenWidth);
      setObstaclesLeftTwo(screenWidth + screenWidth/2 + 30);
      setObstaclesNegHeight(0);
      setObstaclesNegHeightTwo(0);
      setIsGameOver(false);
      // setOffline(true);
    //   birdLeft = screenWidth / 2;
      setBirdLeft(screenWidth / 2);
      console.log('reloaded');
    })

    const  triggerNot  = (() => {
      console.log('Trigger triggerNot')
      notification.open({
        message: 'No Internet Connection',
        duration: 0,
        placement: 'topRight',
        description: <Button onClick={() => { reload()}} type="primary"  size="small">Play The Game</Button>,
        // onClick : reload
      })
    })

    const routeDetailed = () => {
      navigation.navigate('Flappy');
  }

  const routeHome = () => {
    navigation.navigate('Home');
}

    const createTwoButtonAlert = () =>
    alert(offline ? 'Internet is connected Floppy 1' : 'Not able to connect with Server Floppy', 'My Alert Msg', [
      {
        text: 'Retry Earnings Page',
        onPress: () => routeHome(),
        // style: 'cancel',
      },
      {text: 'Play Game', onPress: () => reload()},
    ], {cancelable: false});

    const playAgain = async (connectedFlap) => {
      let highScore = await getData();
      let updatedHighScore;
      console.log(highScore, 'highScore', score, 'score')
      if(score > highScore) {
        highScore = score;
        await storeData('' + highScore);
      }
      setScore(0);
    alert(connectedFlap ? 'Internet is connected Floppy 2' : 'Not able to connect with Server Floppy 2', `High Score => ${highScore}  Your score = ${score}`, [
      {
        // cancelable: true,
        text: 'Restart',
        onPress: () => reload(),
        // style: 'cancel'
      },
      {
        text: 'Retry Earnings Page',
        onPress: () => routeHome(),
        // style: 'cancel',
      }
    //   {text: 'OK', onPress: () => reload()},
    ], {
        cancelable: false,
      });
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
        if(!state.isConnected && state.isInternetReachable !== null &&  !state.isInternetReachable) {
          // setNetInfo(false);
          console.log('Inside connected')
          // reload();
          // triggerNot();
          setOffline(true);
          // createTwoButtonAlert();
          // playAgain(false);
          setConnectedFlap(false);
          // setOffline(true);
          // setShowAlert(true);
          
          // showAlert = true;
          // createTwoButtonAlert()
          console.log(offline,'offline', showAlert, 'showAlert')
        } else if(state.isConnected && state.isInternetReachable) {
          if(offline) {
            setOffline(false);
            setConnectedFlap(true);
            // createTwoButtonAlert();
            playAgain(true);
        }
          console.log('Inside Online');
          // setOffline(false);
        }
        console.log(state);
      });
  
      return () => {
        // Unsubscribe to network state updates
        unsubscribe();
      };
    }, [offline]);

    // useEffect(() => {
    //   async function fetchData() {
    //     // You can await here
    //     const response = await callAPIs();
    //     console.log(response);
    //     setEarnings(response.earnings)
    //     // ...
    //   }
    //   fetchData();
    // }, []); // 
     
    const gameOver = () => {
      clearInterval(gameTimerId)
      clearInterval(obstaclesTimerId)
      clearInterval(obstaclesTimerIdTwo)
      if(!isGameOver) {

      setIsGameOver(true)
      playAgain(connectedFlap);
      }
    }

    // useEffect(() => {
    //   window.addEventListener("offline", (event) => {
    //     console.log('offline')
    //     offline = true;
    //   });
      
    //   window.addEventListener("online", (event) => {
    //     offline = false;
    //     console.log('online')

    //   });
    // })
  
    const playgroundNavigate = () => {

    }

    const callAPIs = async () => {
      try {
        // const response = await fetch(
        //   'https://wgn9xka0wg.api.quickmocker.com/earnings',
        // );
        // const json = await response.json();
        const json = {
          earnings: 19000
        }
        console.log(json);
        return json;
      } catch (error) {
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

    // fetchData();

  return (
    <TouchableWithoutFeedback onPress={jump}>
   <View style={styles.container}>
      <ImageBackground 
          source={{
            uri: weather
          }}
          style={{ flex: 1,
            width: null,
            height: null,
            }}
        >
          <Text >{score}</Text>
        </ImageBackground>
        <Bird 
          birdBottom = {birdBottom} 
          birdLeft = {birdLeft}
          url = {bird}
        />
        <Obstacles 
          color={'green'}
          obstacleWidth = {obstacleWidth}
          obstacleHeight = {obstacleHeight}
          randomBottom = {obstaclesNegHeight}
          gap = {gap}
          obstaclesLeft = {obstaclesLeft}
          url1 = {mario}
          url2 = {mario_r}
        />
        <Obstacles 
          color={'yellow'}
          obstacleWidth = {obstacleWidth}
          obstacleHeight = {obstacleHeight}
          randomBottom = {obstaclesNegHeightTwo}
          gap = {gap}
          obstaclesLeft = {obstaclesLeftTwo}
          url1 = {mario}
          url2 = {mario_r}
        />
      </View>
    
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
  
      // backgroundColor: 'red',
    },
    text: {
      color: 'white',
      fontSize: 30,
      lineHeight: 40,
      fontWeight: 'bold',
      textAlign: 'left',
      backgroundColor: '#000000c0',
    },
  })