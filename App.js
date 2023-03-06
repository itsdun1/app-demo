
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableWithoutFeedback, ImageBackground, Platform } from 'react-native';
import Bird from './components/Bird'
import Obstacles from './components/Obstacles'
// import weather from './assets/weather.jpeg'
import { Text, Card, Button, Icon, ListItem,PricingCard, lightColors, Header, HeaderProps } from '@rneui/themed';
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
// import mario from './assets/mario.jpegxr';
import {files} from './assets/data-uri.js'
import {notification} from 'antd';
import alert from './components/alert.js'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Flappy from './components/Flappy';
import Home from './components/Home';
import axios from 'axios'
import CardC from './components/CardC';


export default function App({navigation}) {
  const Stack = createNativeStackNavigator();
  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height
  const birdLeft = screenWidth / 2
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
  // setBirdBottom(0);
  // setObstaclesLeft(-60);
  // setObstaclesLeftTwo(-60);
  // const createTwoButtonAlert = () =>
  //   Alert.alert('Alert Title', 'My Alert Msg', [
  //     {
  //       text: 'Play a game',
  //       onPress: () => {
  //         // gameOver()
  //         // setOffline(true);
  //         setBirdBottom(screenHeight / 2);
  //         setObstaclesLeft(screenWidth);
  //         setObstaclesLeftTwo(screenWidth + screenWidth/2 + 30);
  //         setObstaclesNegHeight(0);
  //         setObstaclesNegHeightTwo(0);
  //         setIsGameOver(false);
  //         setOffline(true);
  //       },
  //       style: 'cancel',
  //     },
  //     {text: 'Wait', onPress: () => console.log('OK Pressed')},
  //   ]);
  
//start bird falling

axios.interceptors.request.use(function (config) {     
  // Do something before request is sent 
  console.log(config);    
  return config;   
}, function (error) {     
  // Do something with request error  
  console.error(error);   
  return Promise.reject(error);   
}); 

axios.interceptors.response.use(function (response) {        
  // Do something with response data     
  console.log(response);
  return response;   
}, function (error) {     
  // Do something with response error 
  console.log(error.message);
  if(error && error.message == 'Network Error') {
    console.log('Inside')
    // createTwoButtonAlert();
  }   
  console.error(error); 
  return Promise.reject(error);   
});
  // useEffect(() => {

  //   console.log(birdBottom, obstacleHeight, screenWidth, screenHeight, "birdBottom, obstacleHeight, screenWidth. screenHeight");
  //   if (birdBottom > 0) {
  //     gameTimerId = setInterval(() => {
  //       setBirdBottom(birdBottom => birdBottom - gravity)
  //     },30)
  
  //     return () => {
  //       clearInterval(gameTimerId)
  //     }
  //   }
  //   //if i dont have birdBottom as a dependecy, it wont stop
  // }, [birdBottom])
  // console.log(birdBottom)

  const jump = () => {
    if (!isGameOver && (birdBottom < screenHeight)) {
      setBirdBottom(birdBottom => birdBottom + 50)
      console.log('jumped')
    }
  }

  // //start first obstacle
  // useEffect(() => {
  //   if (obstaclesLeft > -60) {
  //     obstaclesTimerId = setInterval(() => {
  //       setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5)
  //     }, 30)
  //     return () => {
  //       clearInterval(obstaclesTimerId)
  //     }
  //   } else {
  //     setScore(score => score +1)
  //     setObstaclesLeft(screenWidth)
  //     setObstaclesNegHeight( - Math.random() * 100)
  //   }
  // }, [obstaclesLeft])

  // //start second obstacle
  // useEffect(() => {
  //   if (obstaclesLeftTwo > -60) {
  //     obstaclesTimerIdTwo = setInterval(() => {
  //       setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5)
  //     }, 30)
  //       return () => {
  //         clearInterval(obstaclesTimerIdTwo)
  //       }
  //     } else {
  //         setScore(score => score +1)
  //         setObstaclesLeftTwo(screenWidth)
  //         setObstaclesNegHeightTwo( - Math.random() * 100)
  //       }
  // }, [obstaclesLeftTwo])

  //   //check for collisions
  //   useEffect(() => {
  //     // console.log(obstaclesLeft)
  //     // console.log(screenWidth/2)
  //     // console.log(obstaclesLeft > screenWidth/2)
  //     console.log(birdBottom, "birdBottom", obstaclesNegHeight + obstacleHeight + 30, "obstaclesNegHeight + obstacleHeight + 30", obstaclesNegHeight + obstacleHeight + gap -30);
  //     if (
  //       ((birdBottom < (obstaclesNegHeight + obstacleHeight + 30) ||
  //       birdBottom > (obstaclesNegHeight + obstacleHeight + gap -30)) &&
  //       (obstaclesLeft > screenWidth/2 -40 && obstaclesLeft < screenWidth/2 + 40 )
  //       )
  //       || 
  //       ((birdBottom < (obstaclesNegHeightTwo + obstacleHeight + 30) ||
  //       birdBottom > (obstaclesNegHeightTwo + obstacleHeight + gap -30)) &&
  //       (obstaclesLeftTwo > screenWidth/2 -40 && obstaclesLeftTwo < screenWidth/2 + 40 )
  //       )
  //       ) 
  //       {
  //       console.log('game over')
  //       gameOver()
  //     }
  //   })


  //   const reload = (() => {
  //     setBirdBottom(screenHeight / 2);
  //     setObstaclesLeft(screenWidth);
  //     setObstaclesLeftTwo(screenWidth + screenWidth/2 + 30);
  //     setObstaclesNegHeight(0);
  //     setObstaclesNegHeightTwo(0);
  //     setIsGameOver(false);
  //     setOffline(true);
  //     console.log('reloaded');
  //   })

  //   const  triggerNot  = (() => {
  //     console.log('Trigger triggerNot')
  //     notification.open({
  //       message: 'No Internet Connection',
  //       duration: 0,
  //       placement: 'topRight',
  //       description: <Button onClick={() => { reload()}} type="primary"  size="small">Play The Game</Button>,
  //       // onClick : reload
  //     })
  //   })

  const routeDetailed = () => {
    console.log('Inside Detailed')
    navigation.navigate('Flappy');
}

    const createTwoButtonAlert = () =>
    alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Rerty 123',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Play Game', onPress: () => routeDetailed },
    ], {cancelable: true});

    
    // useEffect(() => {
    //   // Subscribe to network state updates
    //   const unsubscribe = NetInfo.addEventListener((state) => {
    //     // setNetInfo(
    //     //   `Connection type: ${state.type}
    //     //   Is connected?: ${state.isConnected}
    //     //   IP Address: ${state.details.ipAddress}`
    //     // );
    //     console.log(state)
    //     console.log(offline, 'offline')
    //     if(!state.isConnected && state.isInternetReachable !== null &&  !state.isInternetReachable && !offline) {
    //       // setNetInfo(false);
    //       console.log('Inside connected')
    //       // reload();
    //       // triggerNot();
    //       createTwoButtonAlert();
    //       // setOffline(true);
    //       // setShowAlert(true);
          
    //       // showAlert = true;
    //       // createTwoButtonAlert()
    //       console.log(offline,'offline', showAlert, 'showAlert')
    //     } else if(state.isConnected && state.isInternetReachable) {
    //       setOffline(false);
    //     }
    //     console.log(state);
    //   });
  
    //   return () => {
    //     // Unsubscribe to network state updates
    //     unsubscribe();
    //   };
    // }, [offline]);

  //   // useEffect(() => {
  //   //   async function fetchData() {
  //   //     // You can await here
  //   //     const response = await callAPIs();
  //   //     console.log(response);
  //   //     setEarnings(response.earnings)
  //   //     // ...
  //   //   }
  //   //   fetchData();
  //   // }, []); // 
     
  //   const gameOver = () => {
  //     clearInterval(gameTimerId)
  //     clearInterval(obstaclesTimerId)
  //     clearInterval(obstaclesTimerIdTwo)
  //     setIsGameOver(true)
  //   }

  //   // useEffect(() => {
  //   //   window.addEventListener("offline", (event) => {
  //   //     console.log('offline')
  //   //     offline = true;
  //   //   });
      
  //   //   window.addEventListener("online", (event) => {
  //   //     offline = false;
  //   //     console.log('online')

  //   //   });
  //   // })
  
  //   const playgroundNavigate = () => {

  //   }

  //   const callAPIs = async () => {
  //     try {
  //       // const response = await fetch(
  //       //   'https://wgn9xka0wg.api.quickmocker.com/earnings',
  //       // );
  //       // const json = await response.json();
  //       const json = {
  //         earnings: 19000
  //       }
  //       console.log(json);
  //       return json;
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   async function fetchData() {
  //     // You can await here
  //     const response = await callAPIs();
  //     console.log(response);
  //     setEarnings(response.earnings)
  //     // ...
  //   }

    // fetchData();

  return (
    <TouchableWithoutFeedback onPress={jump}>
       {/* <View> */}
        
       <NavigationContainer >
      <Stack.Navigator 
      initialRouteName="Home" 
      screenOptions={{
    headerShown: true
  }}>
      <Stack.Screen name="Earnings Distribution" component={CardC} />
      <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Flappy"
          component={Flappy}
          options={{title: 'Flappy Bird'}}
        />
      </Stack.Navigator>
    </NavigationContainer>










       {/* <View style={styles.container}>
  <Dialog
    visible={true}
    dialogAnimation={new SlideAnimation({
      slideFrom: 'bottom',
    })}
  >
    <DialogContent>
      You are offline
    </DialogContent>
  </Dialog>
</View> */}

       
      {/* { true &&  */}
      {/* <View style={styles.container}>
      <ImageBackground 
          source={{
            uri: weather
          }}
          style={{ flex: 1,
            width: null,
            height: null,
            }}
        ></ImageBackground>
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
      </View> */}
      {/* } */}

     {/* {
      showAlert && <AwesomeAlert
      show={showAlert}
      showProgress={false}
      title="AwesomeAlert"
      message="I have a message for you!"
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showCancelButton={true}
      showConfirmButton={true}
      cancelText="No, Stay Here"
      confirmText="Offline? Play Game"
      confirmButtonColor="#DD6B55"
      onCancelPressed={() => {
        // this.hideAlert();
        setShowAlert(false)
        setOffline(false);
      }}
      onConfirmPressed={() => {
        setBirdBottom(screenHeight / 2);
      setObstaclesLeft(screenWidth);
      setObstaclesLeftTwo(screenWidth + screenWidth/2 + 30);
      setObstaclesNegHeight(0);
      setObstaclesNegHeightTwo(0);
      setIsGameOver(false);
      setOffline(true);
      setShowAlert(false);
      }}
    />
     }  */}

      {/* <Card.Title>CARD WITH DIVIDER</Card.Title>
        <Card.Divider/>
        <View style={{position:"relative",alignItems:"center"}}>
          <Image
              style={{width:"100%",height:100}}
              resizeMode="contain"
              source={{ uri: "https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4" }}
            />
          <Text >Pranshu Chittora</Text>
         </View> */}
         {/* <Card></Card> */}
         {/* <View>
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
        button={{ title: ' View Detailed', icon: 'flight-takeoff', onPress : fetchData }}
      />


</View> */}
{/* </View> */}
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // backgroundColor: 'red',
  },
})