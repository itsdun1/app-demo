
import React from 'react';
import { Text, View, TextInput, ImageBackground, 
    StyleSheet, Dimensions } from 'react-native';
    import birds from './../assets/birds.png'

  
// const screenHeight = Dimensions.get('window').height;
// const screenWidth = Dimensions.get('window').width;
  
const BackgroundImg = ({imgURL, height, width}) => {
    // console.log(imgURL);
    let h = height ? height : 60;
    let w = width ? width : 50;
    // if(height)
    const styles = StyleSheet.create({
        img: {
          // height: screenHeight,
          // width: screenWidth,
          width: w,
          height: h,
          justifyContent: 'center',
          alignItems: 'center',
        }
      });
  return (
    <View>
      <ImageBackground
        source={{
            uri: imgURL
        }}
        resizeMode="stretch"
        style={styles.img}>
      </ImageBackground>
    </View>
  );
};
  
export default BackgroundImg;
  
// const styles = StyleSheet.create({
//   img: {
//     // height: screenHeight,
//     // width: screenWidth,
//     width: 50,
//     height: 60,
//     justifyContent: 'center',
//     alignItems: 'center',
//   }
// //   input: {
// //     height: 40,
// //     margin: 12,
// //     borderWidth: 2,
// //     padding: 10,
// //   },
// });