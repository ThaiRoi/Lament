import React, { useState, useEffect, useRef } from "react";
import {
    View,
    StyleSheet,
    Text,
    PermissionsAndroid,
    Button,
    Image

} from "react-native";
import MapView, { Marker, Polyline, Polygon } from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';


async function getLocationPermission() {
    try {
        const hasLocationPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "i need your location",
                message: "so i can know where you live and pay a vist :)"
                    +
                    "nothing creepy here",
                buttonNeutral: "Ask me later",
                buttonNegative: "Cancel",
                buttonPositive: "Okay bro"
            }
        );
        console.log("granted status" + hasLocationPermission);
    } catch (error) {
        console.warn(error);
    }
}


const Map = () => {
    useEffect(() => {
        getLocationPermission();
    }, [])

    const map = useRef();
    
    async function fitMapToMarkers() {
        map.current.fitToCoordinates(coords, {
              edgePadding: {
                top: 50,
                right: 50,
                bottom: 50,
                left: 50,
              },
            });
    }

    const [curPos, setCurPos] = useState({ latitude: 0, longitude: 0});
    const [region, setRegion] = useState();
    const goToCurrentPosition = async () => {
        Geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                setCurPos(
                    {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    }
                );
                // setRegion(
                //     {
                //     latitude: position.coords.latitude,
                //     longitude: position.coords.longitude,
                //     latitudeDelta: 0.001,
                //     longitudeDelta: 0.001,
                //     }
                // );
                map.current.animateToRegion({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }, 1000)
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message + " omegalul you sucks");
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );

        
        // map.region = {
        //         latitude: curPos.coords.latitude,
        //         longitude: curPos.coords.longitude,
        //         latitudeDelta: 1,
        //         longitudeDelta: 1,
        // }

    }
    const [coords, setCoords] = useState([
        { latitude: 20.9846741, longitude: 105.8471761 },
        { latitude: 21.036715, longitude: 105.835141 },
        { latitude: 21.002351, longitude: 105.861336 },
    ]);
    
    
        
        
        
          


    return (
        <View style={styles.body}>
            <MapView
                ref={map}
                style={styles.map}
                initialRegion={{
                    latitude: 37,
                    longitude: -122,
                    latitudeDelta: 1,
                    longitudeDelta: 1,
                }}
                region = {region}
                onMapReady={fitMapToMarkers}

            >
                <Marker
                    coordinate={{ latitude: 20.9846741, longitude: 105.8471761 }}
                    title="TItle"
                    description="keep on trying"
                >
                    <Image source={require('../../assets/FearMe.png')} style={{ height: 20, width: 35 }} />
                </Marker>
                <Marker
                    coordinate={{ latitude: 21.036715, longitude: 105.835141 }}
                    title="Lanwg Bacs"
                    description="Khong co gi quy hon doc lap tu do"
                >
                    <Image source={require('../../assets/FearMe.png')} style={{ height: 20, width: 35 }} />
                </Marker>
                <Marker
                    coordinate={{ latitude: 21.002351, longitude: 105.861336 }}
                    title="Home"
                    description="huh"
                >
                    <Image source={require('../../assets/FearMe.png')} style={{ height: 20, width: 35 }} />
                </Marker>

                <Marker
                    coordinate={{ latitude: curPos.latitude, longitude: curPos.longitude }}
                    title="me"
                    description="huh"
                />
          <Polygon
            coordinates={coords}
            strokeColor={'rgb(0, 0, 0)'}
            strokeWidth={6}
          />
            </MapView>
            <View
                style={{
                    position: 'absolute',//use absolute position to show button on top of the map
                    bottom: '10%', //for center align
                    alignSelf: 'center', //for align to right
                    height: 50,
                    width: 200,
                    backgroundColor: 'gray'
                }}
            >
                <Button
                    style={{}}
                    title="Go to Current Position!"
                    onPress={goToCurrentPosition}
                />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 30,
        margin: 10,
        color: 'black',
    },
    map: {
        height: '100%',
        width: '100%'
    },

});
export default Map;
// {"coords":
//     {"accuracy": 15.836999893188477,
//     "altitude": -7.099999904632568,
//     "altitudeAccuracy": 1,
//     "heading": 0,
//     "latitude": 20.984657,
//     "longitude": 105.8467763,
//     "speed": 0},
// "mocked": false,
// "provider": "fused",
// "timestamp": 1684980926682}