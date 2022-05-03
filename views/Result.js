import React from "react";
import { Text, View, Button } from "react-native";

import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function Result(props) {

    const Stack = createNativeStackNavigator();

    return (
        <View>
            <Text>Esse é o componente Result!</Text>
            <Button title="Tirar outra Foto" onPress={() =>props.navigation.navigate('Home')}></Button>
        </View>
    )
}