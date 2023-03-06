// import React from 'react';
// import { View, ImageBackground } from 'react-native';
// import birds from './../assets/birds.png'

// const Bird = ({birdBottom, birdLeft})=> {
//     const birdWidth = 50
//     const birdHeight = 60
//     return (
//         <View style = {{
//             position: 'absolute',
//             backgroundColor: 'black',
//             width: 50,
//             height: 60,
//             left: birdLeft - (birdWidth/2),
//             bottom: birdBottom - (birdHeight/2)
//         }}>
//             {/* <ImageBackground
//                 source={birds}  style={styles.image}
//             ></ImageBackground> */}
//         </View>
//     )
// }


// // const styles = StyleSheet.create({
// //     container: {
// //       flex: 1,
// //       flexDirection: 'column',
// //     },
// //     image: {
// //       flex: 1,
// //       resizeMode: 'cover',
// //       justifyContent: 'center',
// //     },
// //     text: {
// //       color: 'white',
// //       fontSize: 42,
// //       fontWeight: 'bold',
// //       textAlign: 'center',
// //       backgroundColor: '#000000a0',
// //     },
// //   });

// export default Bird;

import React from 'react';
import { View } from 'react-native';
import BackgroundImg from './BackgroundImage';
// import birds from './../assets/birds.png'

const Bird = ({birdBottom, birdLeft, url}) => {
    const birdWidth = 50
    const birdHeight = 60

    return (
        <View style={{
            position: 'absolute',
            backgroundColor: 'blue',
            width: birdWidth,
            height: birdHeight,
            left: birdLeft - (birdWidth/2),
            bottom: birdBottom - (birdHeight/2),
        }}>

        <BackgroundImg imgURL={url}></BackgroundImg>
        </View>
    )
}

export default Bird