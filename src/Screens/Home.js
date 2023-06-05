
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    TextInput,
    TouchableOpacity,
    Pressable
} from 'react-native';
import CustomButton from '../utils/CustomButton';
import GlobalStyle from '../utils/GlobalStyle';
import SQLite from 'react-native-sqlite-storage';
import { useSelector, useDispatch } from 'react-redux';
import { setName, setAge, increageAge, getUsers } from '../redux/actions';
import { FlatList } from 'react-native-gesture-handler';
import PushNotification from "react-native-push-notification";
import moment from 'moment';


const db = SQLite.openDatabase(
    {
        name: 'MainDB',
        location: 'default',
    },
    () => { },
    error => { console.log(error) }
);

export default function Home({ navigation, route }) {

    const { name, age, users } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    // const [name, setName] = useState('');
    // const [age, setAge] = useState('');

    useEffect(() => {
        getData();
        dispatch(getUsers());
    }, []);

    const getData = () => {
        try {
            // AsyncStorage.getItem('UserData')
            //     .then(value => {
            //         if (value != null) {
            //             let user = JSON.parse(value);
            //             setName(user.Name);
            //             setAge(user.Age);
            //         }
            //     })
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT Name, Age FROM Users",
                    [],
                    (tx, results) => {
                        var len = results.rows.length;
                        if (len > 0) {
                            var userName = results.rows.item(0).Name;
                            var userAge = results.rows.item(0).Age;
                            dispatch(setName(userName));
                            dispatch(setAge(userAge));
                        }
                    }
                )
            })
        } catch (error) {
            console.log(error);
        }
    }

    const updateData = async () => {
        if (name.length == 0) {
            Alert.alert('Warning!', 'Please write your data.')
        } else {
            try {
                // var user = {
                //     Name: name
                // }
                // await AsyncStorage.mergeItem('UserData', JSON.stringify(user));
                db.transaction((tx) => {
                    tx.executeSql(
                        "UPDATE Users SET Name=?",
                        [name],
                        () => { Alert.alert('Success!', 'Your data has been updated.') },
                        error => { console.log(error) }
                    )
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    const removeData = async () => {
        try {
            // await AsyncStorage.clear();
            db.transaction((tx) => {
                tx.executeSql(
                    "DELETE FROM Users",
                    [],
                    () => { navigation.navigate('Login') },
                    error => { console.log(error) }
                )
            })
        } catch (error) {
            console.log(error);
        }
    }

    

    const handleNotification = (item) => {
        console.log('aaaaaaaaaaaaaaaaaaaaaa');
        PushNotification.localNotification({
            channelId: 'testbaby',
            // title: 'you clicked on ' + item.name,
            // message: 'he or she is from ' + item.city + ', amazing!',
            title: 'Nhắc nhở cho mèo ăn',
            message: 'Cho hoàng thượng ăn không hoàng thượng chết đói',
            bigPictureUrl: 'https://file.hstatic.net/200000391405/file/co-nen-cho-meo-an-com-hay-khong-01_e30e3b1a45ab4c96ac57f66d5bbf7ae9.png',
            largeIconUrl: 'https://file.hstatic.net/200000391405/file/co-nen-cho-meo-an-com-hay-khong-01_e30e3b1a45ab4c96ac57f66d5bbf7ae9.png',
            });
       
        // let currentDate = new Date();
        // if(currentDate.getHours() > 8){
        //     currentDate.setDate(currentDate.getDate()+1);
        //     currentDate.setHours(8);
        // }
        // else {
        //     currentDate.setHours(8);
        // } 
        // PushNotification.localNotificationSchedule({
        //     channelId: 'testbaby',
        //     title: 'schedulded aaaa',
        //     message: 'Cho chết đói',
        //     date: currentDate,
        //     allowWhileIdle: true,
        //     repeatType: 'day',
        //     repeatTime: 1,
        // });
    }

    return (
        <View style={styles.body}>
            <Text style={[
                GlobalStyle.CustomFont,
                styles.text
            ]}>
                Welcome {name} !
            </Text>
            <FlatList
                data={users}
                renderItem={({item}) => (
                    <TouchableOpacity
                    onPress={ () => {
                                    handleNotification(item);
                                    navigation.navigate('Map',{
                                        city : item.city,
                                        name: item.name
                                    });
                                    }}>
                        <View style={{ backgroundColor: 'gray', width: 200, alignContent: 'center', padding: 10, borderWidth: 2, margin: 10 }}>
                            <Text style={{ textAlign: 'center', fontSize: 30 }}>{item.name}</Text>
                            <Text style={{ textAlign: 'center' }}>{item.city}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
   

            {/* <Text style={[
                GlobalStyle.CustomFont,
                styles.text
            ]}>
                Your age is {age}
            </Text>
            <TextInput
                style={styles.input}
                placeholder='Enter your name'
                value={name}
                onChangeText={(value) => dispatch(setName(value))}
            />
            <CustomButton
                title='Update'
                color='#ff7f00'
                onPressFunction={updateData}
            />
            <CustomButton
                title='Remove'
                color='#f40100'
                onPressFunction={removeData}
            />
            <CustomButton
                title='Add 1'
                color='blue'
                onPressFunction={() => {dispatch(increageAge())}}
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 40,
        margin: 10,
        color: 'black'
    },
    input: {
        width: 300,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 130,
        marginBottom: 10,
    }
})