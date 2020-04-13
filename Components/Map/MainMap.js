import React from 'react';

import MapView, { Marker } from 'react-native-maps';


import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';


import * as Permissions from "expo-permissions";

import * as Font from 'expo-font';

//import GetNearestPoliceStation from "./GetNearestPoliceStation"

import axios from "axios"

import HospitalIcon from "../../assets/Images/Markers/Hospital.png"
import FireFighterIcon from "../../assets/Images/Markers/FireFighter.png"
import PoliceStationIcon from "../../assets/Images/Markers/PoliceStation.png"

import Loading from "../Loading"
import PopUpBar from './PopUpBar';


const HospitalLocation = require("./Jeson/Hospital.json")
const FireFighterLocation = require("./Jeson/FireFighter.json")
const PoliceStationLocation = require("./Jeson/PoliceStation.json")


export default class MainMap extends React.Component {
    constructor() {
        super();
        this.state = {
            latitude: null,
            longitude: null,

            //REMOVE IF YOUR USING A REAL API
            hospitalLocation: HospitalLocation,
            fireFighterLocation: FireFighterLocation,
            policeStationLocation: PoliceStationLocation,

            //REMOVE IF YOUR USING A POOR
            /*hospitalLocation: {},
            fireFighterLocation: {},
            policeStationLocation: {},*/

            showPopUpBar: false,
            selectedLocationID: "",
            selectedLocationName: "",
            selectedLocationLogo: "",
            selectedLocationRating: "",
            selectedLocationLocation: "",
        }

        this.PopUpBarHandlerEnabler = this.PopUpBarHandlerEnabler.bind(this);
        this.PopUpBarHandlerDisabler = this.PopUpBarHandlerDisabler.bind(this);

    }

    async componentDidMount() {

        const { status } = await Permissions.getAsync(Permissions.LOCATION)
        //        console.log(this.state.location);

        if (status != "granted") {
            const response = await Permissions.askAsync(Permissions.LOCATION)
        }

        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }, async () => {

                const { latitude, longitude } = this.state
                this.props.hasMapLoaded()
                /*
                                console.log("Current Location is : " + latitude + " / " + longitude)
                
                                const urlForHospitals = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1000&type=point_of_interest&keyword=all+hospitals+near+me&key=AIzaSyBGYg0TuEC__8cY3Cakke34oraif4lIHwI`
                                const urlFireFighters = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1000&type=point_of_interest&keyword=fire+station&key=AIzaSyBGYg0TuEC__8cY3Cakke34oraif4lIHwI`
                                const urlPoliceStations = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1000&type=point_of_interest&keyword=police+station&key=AIzaSyBGYg0TuEC__8cY3Cakke34oraif4lIHwI`
                
                                console.log("url : " + urlForHospitals)
                
                                const HospitalLocation = await axios.get(urlForHospitals)
                                const FireFighterLocation = await axios.get(urlFireFighters)
                                const PoliceStationLocation = await axios.get(urlPoliceStations)
                
                                console.log(HospitalLocation)
                                console.log(FireFighterLocation)
                                console.log(PoliceStationLocation)
                
                                this.setState({ hospitalLocation: HospitalLocation.data })
                                this.setState({ fireFighterLocation: FireFighterLocation.data })
                                this.setState({ policeStationLocation: PoliceStationLocation.data })
                
                
                                console.log(this.state.hospitalLocation)
                                console.log(this.state.fireFighterLocation)
                                console.log(this.state.policeStationLocation)
                
                */
                /*hospitalLocation: HospitalLocation,
                fireFighterLocation: FireFighterLocation,
                policeStationLocation: PoliceStationLocation,*/



            }),
            (error) => console.log("ERROR : ", error)
        )

    }

    PopUpBarHandlerEnabler() {
        this.setState({ showPopUpBar: true })
    }

    PopUpBarHandlerDisabler() {
        this.setState({ showPopUpBar: false })
    }


    render(props) {
        const { latitude, longitude } = this.state

        const hospitalLocation = this.state.hospitalLocation.results
        const fireFighterLocation = this.state.fireFighterLocation.results
        const policeStationLocation = this.state.policeStationLocation.results

        if (latitude) {


            return (<View>
                <PopUpBar
                    visibility={this.state.showPopUpBar}
                    id={this.state.selectedLocationID}
                    name={this.state.selectedLocationName}
                    sourceLogo={this.state.selectedLocationLogo}
                    location={this.state.selectedLocationLocation}
                    rating={this.state.selectedLocationRating}
                    PopUpBarDisabler={this.PopUpBarHandlerDisabler}

                />

                <MapView style={styles.mapStyle}
                    showsUserLocation
                    followUserLocation={true}
                    showsCompass={false}
                    showsMyLocationButton={false}
                    pitchEnabled={false}

                    minZoomLevel={14}

                    initialRegion={{
                        latitude,
                        longitude,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.01
                    }}>



                    {hospitalLocation.map(id => {
                        const latitude = id.geometry.location.lat
                        const longitude = id.geometry.location.lng
                        return (
                            <MapView.Marker key={id.id} coordinate={{ latitude, longitude }} onPress={() => {
                                this.setState({
                                    showPopUpBar: true,
                                    selectedLocationID: id.id,
                                    selectedLocationName: id.name,
                                    selectedLocationLogo: HospitalIcon,
                                    selectedLocationRating: id.rating,
                                    selectedLocationLocation: id.vicinity,

                                })
                            }}>

                                <Image style={styles.Icon} source={HospitalIcon} />


                            </MapView.Marker>

                        )
                    })}

                    {fireFighterLocation.map(id => {
                        const latitude = id.geometry.location.lat
                        const longitude = id.geometry.location.lng
                        return (
                            <MapView.Marker key={id.id} coordinate={{ latitude, longitude }} onPress={() => {
                                this.setState({
                                    showPopUpBar: true,
                                    selectedLocationID: id.id,
                                    selectedLocationName: id.name,
                                    selectedLocationLogo: FireFighterIcon,
                                    selectedLocationRating: id.rating,
                                    selectedLocationLocation: id.vicinity,

                                })
                            }}>
                                <Image style={styles.Icon} source={FireFighterIcon} />
                            </MapView.Marker>

                        )
                    })}

                    {policeStationLocation.map(id => {
                        const latitude = id.geometry.location.lat
                        const longitude = id.geometry.location.lng
                        return (
                            <MapView.Marker key={id.id} coordinate={{ latitude, longitude }} onPress={() => {
                                this.setState({
                                    showPopUpBar: true,
                                    selectedLocationID: id.id,
                                    selectedLocationName: id.name,
                                    selectedLocationLogo: PoliceStationIcon,
                                    selectedLocationRating: id.rating,
                                    selectedLocationLocation: id.vicinity,

                                })
                            }}>
                                <Image style={styles.Icon} source={PoliceStationIcon} />
                            </MapView.Marker>

                        )
                    })}




                </MapView>
            </View>

            );
        } else {

            return (

                < Loading />
            )
        }

    }
}

const styles = StyleSheet.create({
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        transform: [{ scale: 1.06 }],
        zIndex: 0
    },
    Icon: {
        width: 40,
        height: 40,
    }
});
