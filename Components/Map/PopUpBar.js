import React, { useRef, useEffect } from "react"
import { View, StyleSheet, Text, Image, TouchableOpacity, Animated } from "react-native"

import { useFonts } from '@use-expo/font';

export default function PopUpBar(props) {
    const popAnim = useRef(new Animated.Value(0)).current;


    const animateIn = () => {
        Animated.timing(popAnim, {
            fromValue: 0.01,
            duration: 200,
            toValue: 1,
        }).start();

    };

    const animateOut = () => {
        Animated.timing(popAnim, {
            fromValue: 1.01,
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


    useEffect(() => {

        console.log(popAnim)

    }, [popAnim])



    if (props.visibility && fontsLoaded) {
        animateIn()
        return (
            <View style={styles.container}>
                <Animated.View style={{
                    width: "75%",
                    height: 300,
                    backgroundColor: "#fff",
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
                }}>

                    <Image style={styles.Icon} source={props.sourceLogo} />

                    <View style={styles.TextBox} >

                        <Text style={styles.NameText} >{props.name}</Text>
                        <Text style={styles.AddressText} >Address : {props.location}.</Text>
                        <Text style={styles.RatingText} >Rating : {props.rating}</Text>

                    </View>

                    <View style={styles.ButtonBox} >
                        <TouchableOpacity activeOpacity={.75} onPress={animateOut}>
                            <View style={styles.ActionButton} >
                                <Text style={styles.BtnText} >CALL</Text>

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={.75} onPress={animateOut}>

                            <View style={styles.CancelButton} >
                                <Text style={styles.BtnText} >CANCEL</Text>
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
    popUpBar: {

        width: "75%",
        height: 300,
        backgroundColor: "#fff",
        alignItems: 'center',
        borderRadius: 20,

        shadowColor: "red",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        transform: [{ scale: 1 }],
        shadowRadius: 10,
        elevation: 24,
        color: "#F5F5F5",

    },
    Icon: {
        width: 50,
        height: 50,
        top: 20,
    },
    TextBox: {
        width: "100%",
        height: 120,
        top: 40,
        paddingHorizontal: 20,

    },

    NameText: {
        fontSize: 18,
        color: "rgba(20, 20, 20, .85)",
        fontFamily: "Roboto-Bold",


    },
    RatingText: {
        paddingTop: 5,

        color: "rgba(20, 20, 20, .75)",
        fontFamily: "Roboto-Medium",

    },
    AddressText: {
        paddingTop: 10,
        alignItems: 'flex-start',
        color: "rgba(20, 20, 20, .75)",
        fontWeight: "400",
        fontFamily: "Roboto-Medium",

    },



    ButtonBox: {
        width: "90%",
        height: 50,
        top: 65,



        flexDirection: "row",
        justifyContent: "space-between"
    },
    ActionButton: {
        position: "relative",
        width: 125,
        height: "100%",
        backgroundColor: "green",
        borderRadius: 10,
        flex: 1,

        alignItems: "center",
        justifyContent: "center",
    },
    CancelButton: {
        position: "relative",
        width: 125,
        height: "100%",
        backgroundColor: "#dc143c",
        borderRadius: 10,
        flex: 1,

        alignItems: "center",
        justifyContent: "center",
    },
    BtnText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold"
    }

})