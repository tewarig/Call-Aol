import React, { useState, useEffect } from 'react';
import { TextInput, View, TouchableOpacity, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import connectionApi from '../../api/connection';

const VerifyOTP = ({ route: { params: { phoneNumber } }, navigation }) => {
    // If null, no SMS has been sent
    //const [confirm, setConfirm] = useState(true);
    const [otp, setOtp] = useState('');
    //const [otpArray, setOtpArray] = useState(['', '', '', '']);
    const [confirm, setConfirm] = useState(null);


    useEffect(() => {
        signInWithPhoneNumber();
    }, []);
    
    async function signInWithPhoneNumber() {
        try {
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            setConfirm(confirmation);
        } catch (e) {
            alert(JSON.stringify(e));
        }
    }

    async function confirmCode() {
        try {
            const code = otp;
            const response = await confirm.confirm(code);
            if (response) {
                console.log(response);
                //connection code===================================
                const data = { phone: response.user._user.phoneNumber };
                console.log(JSON.stringify(data));
                try {
                    const resp = await connectionApi.post('/signup',  data );
                    console.log(resp.data);
                } catch (err) {
                    console.log(err);
                }
                //===================================================
                navigation.navigate('Home',{'phone':response.user._user.phoneNumber });
            }
        } catch (e) {
            alert(JSON.stringify(e));
        }
    }

    return (
        <View>
            <TextInput
                style={style.display}
                value={otp}
                onChangeText={text => setOtp(text)}
                keyboardType="number-pad"
            />
            <TouchableOpacity
                onPress={() => {
                    confirmCode();
                }}
            >
                <Text>
                    submit
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    display: {
        borderColor: 'black',
        borderWidth: 2,
    }
});
export default VerifyOTP;