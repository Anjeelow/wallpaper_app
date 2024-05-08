import { StyleSheet } from "react-native";

export const Style = StyleSheet.create({
    allcolorContainer:{
        width: '100%',
        height: '100%',
        backgroundColor: '#31363F',
        paddingLeft: 30,
    },
    allcolorView:{
        flexDirection: 'row',
    },
    allcolor: {
        justifyContent: 'center',
        height: 75,
        width: 120,
        margin: 5,
    },
    colorContainer: {
        flex: 1, 
        height: 48,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'black',
        marginHorizontal: 5,
    },
    wallpaperContainer: {
        flex: 1, 
        justifyContent: "center",
        alignItems: "center", 
        height: 150, 
        backgroundColor: '#010838', 
        margin: 5, 
        borderRadius: 10,
    },
    wallpaper: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    invisiblecontainer: {
        backgroundColor: 'transparent',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: "48%",
        height: 52,
        alignItems: "center",
        justifyContent: "space-evenly",
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 10,
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        color: 'white',
        justifyContent: 'center',
        alignContent: 'center',
    },
})