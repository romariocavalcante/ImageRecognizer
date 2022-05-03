import React, { useState, useEffect, useRef } from "react";
import { Text, View, Button, Modal, Image } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

import { StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Camera } from 'expo-camera';

export default function Home(props) {

    const camRef = useRef(null);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [open, setOpen] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);

    const Stack = createNativeStackNavigator();


    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>Sem acesso à câmera.</Text>;
    }

    async function takePicture() {
        if (camRef) {
            const data = await camRef.current.takePictureAsync();
            setCapturedPhoto(data.uri);
            setOpen(true);
        }
    }

    return (

        <View style={styles.container}>

            <View style={styles.ContainerText}>
                <Text style={styles.TextHeader}>Envie uma foto para que o sistema classifique em uma das 10 classes do Dataset Fashion MNIST.</Text>
            </View>

            <Camera style={styles.camera} type={type} ref={camRef}>
            </Camera>

            <View style={styles.buttonContainer}>

                <TouchableOpacity style={styles.buttonCapturaImg} onPress={takePicture}>
                    <FontAwesome name="camera" size={23} color="#FFF" />
                </TouchableOpacity>

                {capturedPhoto &&

                    <Modal animationType="slide" transparent={false} visible={open}>
                        <View style={styles.modalFoto}>

                            <TouchableOpacity style={{ margin: 10 }} onPress={() => setOpen(false)}>

                                <FontAwesome name='window-close' size={50} color='#ff0000'></FontAwesome>

                            </TouchableOpacity>

                            <Image
                                style={styles.ImageCapture} source={{ uri: capturedPhoto }}
                            />
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => props.navigation.navigate('Result')}>
                                <Text style={styles.text}> Avançar </Text>
                            </TouchableOpacity>

                        </View>
                    </Modal>

                }

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                                ? (Camera.Constants.Type.front)
                                : (Camera.Constants.Type.back)
                        );
                    }}>
                    <Text style={styles.text}> Câmera Frontal </Text>
                </TouchableOpacity>


            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10,
        backgroundColor: "#5Ab3FF",
    },
    ContainerText: {
        flex: .05,
        backgroundColor: "#FFFF",
        paddingHorizontal: 40,
        paddingVertical: 20,
    },
    TextHeader: {
        fontSize: 15,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#F8F8F8",
        borderWidth: 1,
        padding: 15,
        borderRadius: 10,
        width: '60%',
        margin: 2,
    },
    camera: {
        flex: .6,
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 10,
    },
    buttonContainer: {
        flex: .2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffff"
    },
    buttonCapturaImg: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        margin: 20,
        borderRadius: 10,
        height: 30,
    },
    modalFoto: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    ImageCapture: {
        width: '100%',
        height: 450,
        borderRadius: 10,
    }
});
