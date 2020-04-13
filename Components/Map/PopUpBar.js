import React from "react"
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native"

export default function PopUpBar(props) {
    console.log("HI FROM PopUpBar")
    if (props.visibility) {
        return (
            <View style={styles.container}>
                <View style={styles.popUpBar}>

                    <Image style={styles.Icon} source={props.sourceLogo} />

                    <View style={styles.TextBox} >

                        <Text style={styles.NameText} >{props.name}</Text>
                        <Text style={styles.AddressText} >Address : {props.location}.</Text>
                        <Text style={styles.RatingText} >Rating : {props.rating}</Text>

                    </View>

                    <View style={styles.ButtonBox} >
                        <TouchableOpacity activeOpacity={.75} onPress={() => { alert("Hospitals") }}>
                            <View style={styles.ActionButton} >
                                <Text style={styles.BtnText} >CALL</Text>

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={.75} onPress={() => { props.PopUpBarDisabler() }}>

                            <View style={styles.CancelButton} >
                                <Text style={styles.BtnText} >CANCEL</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                </View>
            </View>
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
        fontWeight: "bold",
        color: "rgba(20, 20, 20, .85)",

    },
    RatingText: {
        fontWeight: "bold",
        color: "rgba(20, 20, 20, .85)",
    },
    AddressText: {
        paddingTop: 10,
        fontWeight: "bold",
        alignItems: 'flex-start',
        color: "rgba(20, 20, 20, .85)",
    },



    ButtonBox: {
        width: "100%",
        height: 50,
        top: 65,


        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    ActionButton: {
        width: 140,
        height: "100%",
        backgroundColor: "green",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    CancelButton: {
        width: 140,
        height: "100%",
        backgroundColor: "#dc143c",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    BtnText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold"
    }

})