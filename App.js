import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';


import * as Font from 'expo-font';


let customFonts = {
  "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
  "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf")

}

import MainMap from "./Components/Map/MainMap"

import HospitalIcon from "./assets/Images/Buttons/Hospital.png"
import FireFighterIcon from "./assets/Images/Buttons/FireFighter.png"
import PoliceStationIcon from "./assets/Images/Buttons/PoliceStation.png"

import Loading from './Components/Loading';
import AlertButtonBur from "./Components/MainPage/AlertButtonBur"


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      mapLoaded: false,
      showPopUpBar: false,

    }

    this.hasMapLoaded = this.hasMapLoaded.bind(this);

    this.PopUpBarHandlerEnabler = this.PopUpBarHandlerEnabler.bind(this);
    this.PopUpBarHandlerDisabler = this.PopUpBarHandlerDisabler.bind(this);
  }


  async componentDidMount() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  hasMapLoaded() {
    this.setState({ mapLoaded: true });
  }

  PopUpBarHandlerEnabler() {
    this.setState({ showPopUpBar: true })
  }

  PopUpBarHandlerDisabler() {
    this.setState({ showPopUpBar: false })
  }



  render() {
    if (this.state.fontsLoaded) {

      return (

        <View style={styles.container}>

          <AlertButtonBur
            visibility={this.state.showPopUpBar}
            PopUpBarDisabler={this.PopUpBarHandlerDisabler}
          />

          {this.state.mapLoaded ? (
            <View style={styles.DepartmentButtonsBody}>

              <TouchableOpacity activeOpacity={.75} onPress={() => { alert("Hospitals") }}>
                <View style={styles.DepartmentButton1}>
                  <Image style={styles.DepartmentButtonIcon} source={HospitalIcon} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={.75} onPress={() => { alert("Fire Fighter") }}>
                <View style={styles.DepartmentButton2}>
                  <Image style={styles.DepartmentButtonIcon} source={FireFighterIcon} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={.75} onPress={() => { alert("Police Stations") }}>
                <View style={styles.DepartmentButton3}>
                  <Image style={styles.DepartmentButtonIcon} source={PoliceStationIcon} />
                </View>
              </TouchableOpacity>

            </View>

          ) : (
              <View></View>
            )}

          {this.state.mapLoaded ? (

            < View style={styles.SendAlertButtonBody}>
              <TouchableOpacity activeOpacity={.75} onPress={() => { this.setState({ showPopUpBar: true }) }}>
                <View style={styles.SendAlertButton} >
                  <Text
                    style={{
                      fontSize: 25,
                      color: "rgba(256,256,256,1)",
                      fontFamily: "Roboto-Medium",
                    }}
                  >
                    SEND ALERT
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

          ) : (
              <View></View>
            )}

          <MainMap hasMapLoaded={this.hasMapLoaded} />

        </View >
      );
    }

    return (
      <View style={styles.container} >

        <Loading data="Fonts" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "Roboto-Regular",
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  SendAlertButtonBody: {
    position: "absolute",
    bottom: "6%",
    zIndex: 5,
    width: "75%",
    height: 60,

  },
  SendAlertButton: {
    fontFamily: "Roboto-Regular",
    backgroundColor: "#dc143c",
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    height: "100%",
    borderRadius: 10

  },



  DepartmentButtonsBody: {
    position: "absolute",
    bottom: "16%",
    zIndex: 5,
    width: "74%",
    height: 75,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  DepartmentButton1: {
    fontFamily: "Roboto-Regular",
    backgroundColor: "green",
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 75,
    borderRadius: 50,
  },

  DepartmentButton2: {
    fontFamily: "Roboto-Regular",
    backgroundColor: "#dc143c",
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 75,
    borderRadius: 50
  },
  DepartmentButton3: {
    fontFamily: "Roboto-Regular",
    backgroundColor: "#304ffe",
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 75,
    borderRadius: 50
  },
  DepartmentButtonIcon: {
    width: 25,
    height: 25,
  }
});
