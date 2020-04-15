import React, { useRef } from "react"
import { View, Image, StyleSheet, Text, Animated } from "react-native"

import LoadingIcon from "../assets/Images/Loading/LoadingIcon.png"

export default function (props) {

    const rotateAnim = useRef(new Animated.Value(0)).current;





    React.useEffect(() => {
        Animated.timing(
            rotateAnim,
            {
                toValue: 180,
                duration: 10000,
            }
        ).start();
    }, [])




    return (
        <View style={styles.LoadingBar} >
            <Animated.View style={{
                transform: [{ rotate: rotateAnim }]         // Bind opacity to animated value
            }}>
                <Image style={[styles.LoadingBarIcon]} source={LoadingIcon} />
            </Animated.View>

            <Text style={styles.LoadingBarText} >Loading...{props.data}</Text>
        </View>
    )

}



const styles = StyleSheet.create({
    LoadingBar: {
        width: "100%",
        height: 100,

        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"

    },
    LoadingBarIcon: {
        width: 50,
        height: 50
    },
    LoadingBarText: {
        fontSize: 32,
        left: 10,
        color: "#6262AF",
        fontWeight: "bold"
    }
})