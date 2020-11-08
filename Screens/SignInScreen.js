import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ToastAndroid, ActivityIndicator } from 'react-native'
import theme from '../theme.json'
import auth from '@react-native-firebase/auth'

const SignInScreen = ({ navigation }) => {
    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        setSubmitted(true)
        await auth().signInWithEmailAndPassword(email, password).then(() => {
            setSubmitted(false);
            setEmail("");
            setPassword("");
        }).catch((error) => {
            ToastAndroid.showWithGravity(error.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM),
            setSubmitted(false)
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome!</Text>
            <Text style={styles.signInText}>Sign In</Text>
            <TextInput style={styles.textInput} placeholder="Email"
                placeholderTextColor='white'
                value={email}
                onChangeText={(e) => { setEmail(e) }}
                editable={!submitted}
            ></TextInput>
            <TextInput style={styles.textInput} placeholder="Password"
                placeholderTextColor='white'
                secureTextEntry={true}
                value={password}
                onChangeText={(e) => { setPassword(e) }}
                editable={!submitted}
            ></TextInput>
            <TouchableOpacity style={styles.signInButton} activeOpacity={0.8} onPress={handleSubmit} disabled = {submitted}>
                {
                    submitted ? <ActivityIndicator color='white' size = {32}></ActivityIndicator> : <Text style={styles.signInText}>Sign In</Text>
                }
            </TouchableOpacity>

            <Text style={styles.signUpText}>Don't have an account?<Text style={{ color: theme.blue, fontWeight: 'bold' }} onPress={() => {
                navigation.push("SignUpScreen")
            }}> Sign Up</Text></Text>
        </View>
    )
}

export default SignInScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        backgroundColor: theme.black,
        justifyContent: 'center'
    },
    welcomeText: {
        color: 'white',
        fontSize: 52,
        fontWeight: 'bold',
        marginVertical: 20
    },
    signInText: {
        color: 'white',
        fontSize: 24
    },
    textInput: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        color: 'white',
        marginVertical: 20
    },
    signInButton: {
        backgroundColor: theme.blue,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 30,
        width: "60%",
        alignSelf: 'center'
    },
    signUpText: {
        color: 'white',
        alignSelf: 'center',
        marginVertical: 30
    }
})
