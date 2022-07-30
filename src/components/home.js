import React from 'react'
import {TouchableOpacity, View, Text,StyleSheet } from 'react-native'
//import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
    const navigate = useNavigate();
    const back = () => {
        navigate(-1)
      }
    const onPressButton = () => back()
    return (
        <View>
            <TouchableOpacity style={[{ marginTop: 60, width: 100, }]} onPress={onPressButton}>
                <Text style={styles.buttonText}>
                    Back
                </Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    buttonText: {
      color: 'white',
      fontSize: 18,
      textAlign: 'center',
      fontFamily: 'Roboto',
      borderRadius: 8,
      padding: 15,
      backgroundColor: '#f17434'
    },
  });
