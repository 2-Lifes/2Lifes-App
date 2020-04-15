import React, { useRef } from "react"
import { View, StyleSheet, Text, Image, TouchableOpacity, Animated } from "react-native"
import { useFonts } from '@use-expo/font';


export default function AlertButtonBur(props) {
    const popAnim = useRef(new Animated.Value(0)).current;

    const animateIn = () => {
        Animated.timing(popAnim, {
            fromValue: 0.01,
            duration: 200,
            toValue: 1,
        }).start();
        console.log("HI FROM ANTIMATE INNNNNNNNNNN")

    };

    const animateOut = () => {
        Animated.timing(popAnim, {
            fromValue: 1,
            duration: 200,
            toValue: 0.01, // works if I put 0.01
        }).start(() => {
            props.PopUpBarDisabler()
        });

    };

    const [fontsLoaded] = useFonts({
        "Roboto-Black": require("../../assets/fonts/Roboto-Black.ttf"),
        "Roboto-Bold": require("../../assets/fonts/Roboto-Bold.ttf"),
        "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
        "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf")

    })


    if (props.visibility && fontsLoaded) {
        animateIn()
        return (
            <View style={styles.container}>
                <Animated.View style={{
                    width: "75%",
                    height: 300,
                    backgroundColor: "#f5f5f5",
                    alignItems: 'center',
                    borderRadius: 20,

                    shadowColor: "red",
                    shadowOffset: {
                        width: 0,
                        height: 12,
                    },
                    shadowOpacity: 0.58,
                    transform: [{ scale: popAnim }],
                    shadowRadius: 10,
                    elevation: 24,
                    color: "#F5F5F5",
                    justifyContent: "space-between",

                }}>

                    <View style={styles.TextBox} >

                        <Text style={styles.NameText} >Our system has received your request for emergency service.  Please wait and receive the call from our operator !</Text>
                    </View>



                    <View style={styles.ButtonBox}>
                        <TouchableOpacity activeOpacity={.75} onPress={animateOut}>

                            <View style={styles.BackButton}>
                                <Text style={styles.BtnText}>Call Again</Text>

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={.75} onPress={animateOut}>

                            <View style={styles.BackButton}>
                                <Text style={styles.BtnText}>Back</Text>

                            </View>
                        </TouchableOpacity>
                    </View>


                </Animated.View>
            </View >
        )
    } else {
        return (
            <View ></View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        position: "absolute",
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: 'rgba(0,0,0,.5)',

        color: "red",
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 11
    },

    TextBox: {
        top: 25,
        paddingHorizontal: 15,
    },
    NameText: {
        textAlign: "center",
        fontSize: 16,
        fontFamily: "Roboto-Medium",
        color: "rgba(0,0,0,.85)"
    },

    ButtonBox: {
        width: "90%",
        height: 50,
        bottom: 20,
        flexDirection: "row",
        position: 'relative',
        justifyContent: "space-between"

    },
    BackButton: {
        width: 125,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#dc143c",
        borderRadius: 10,


    },
    BtnText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold"
    },

})