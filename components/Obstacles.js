// import React from 'react';
// import { View } from 'react-native';


// const Obstacle = ({obsLeft, obswidth, obsHeight, gap, color, randomB})=> {
//     // const obstacleWidth = 60;
//     // const obstacleHeight = 300;
//     // const gap = 50;
//     return (
//         <>
//         <View style = {{
//             position: 'absolute',
//             backgroundColor: color,
//             width: obswidth,
//             height: 1000,
//             left: obsLeft,
//             bottom: randomB + obsHeight + gap
//         }}>

//         </View>

//         <View style = {{
//             position: 'absolute',
//             backgroundColor: color,
//             width: obswidth,
//             height: obsHeight,
//             left: obsLeft,
//             bottom: randomB
//         }}>

//         </View>
//         </>
//     )
// }

// export default Obstacle;


import React from 'react';
import { View } from 'react-native';
// import mario from './../assets/mario.jpeg';
import BackgroundImg from './BackgroundImage';
// import mario_r from './../assets/mario_r.jpg';
// import birds from './../assets/birds.png'


const Obstacles = ({
    color,
    obstacleWidth, 
    obstacleHeight, 
    randomBottom, 
    gap, 
    obstaclesLeft, url1, url2}) => {

    return (
        <>
            <View style={{
                position: 'absolute',
                backgroundColor: color,
                width: obstacleWidth,
                height: 500,
                left: obstaclesLeft,
                bottom: randomBottom + obstacleHeight + gap,
            }}>
                        <BackgroundImg height={500} width={obstacleWidth} imgURL={url2}></BackgroundImg>

            </View>
            <View style={{
                position: 'absolute',
                backgroundColor: color,
                width: obstacleWidth,
                height: obstacleHeight,
                left: obstaclesLeft,
                bottom: randomBottom,
            }}>

<BackgroundImg height={obstacleHeight} width={obstacleWidth} imgURL={url1}></BackgroundImg>

            </View>
        </>
    )
}

export default Obstacles