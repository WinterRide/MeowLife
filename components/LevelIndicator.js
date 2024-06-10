import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CatLevelInfo from './CatLevelInfo';

const LevelIndicator = ({level}) => {

    const window = Dimensions.get('window');
    const windowWidth = window.width;
    const windowHeight = window.height;

    const levels = level.map(obj => Object.values(obj)[0]);

    levelAdjuster = (val) => {
        if (val == 5) {
            return "100%"
        } else if (val == 4) {
            return "80%"
        } else if (val == 3) {
            return "60%"
        } else if (val == 2) {
            return "40%"
        } else {
            return "20%"
        }
    }

  return (
    <View style={{gap: 10}}>
        <View style={{flexDirection: "row", gap: 5}}>
            <Text style={{color: "gray"}}>Cat Indicator</Text>
            <CatLevelInfo levelColor={"gray"}/>
        </View>
        <View style={{flexDirection: "row", alignItems: "center", gap: 30}}>
            <Text style={{color: "#FF9999", fontWeight: "bold", width: "20%"}}>Affection</Text>
            <View style={{flex: 1, height: 20, width: "80%", backgroundColor: "#FF9999", right: 0, borderRadius: 10}}>
                <View style={{width: levelAdjuster(levels[0]), height: 20, backgroundColor: "#CE4545", borderRadius: 10}} />
                <Text style={{position: "absolute", color: "white", alignSelf: "center", fontWeight: "bold"}}>{levels[0]} / 5</Text>
            </View>
        </View>

        <View style={{flexDirection: "row", alignItems: "center", gap: 30}}>
            <Text style={{color: "#F7B654", fontWeight: "bold", width: "20%"}}>Playfulness</Text>
            <View style={{flex: 1, height: 20, width: "80%", backgroundColor: "#F7B654", right: 0, borderRadius: 10}}>
                <View style={{width: levelAdjuster(levels[1]), height: 20, backgroundColor: "#EE9714", borderRadius: 10}} />
                <Text style={{position: "absolute", color: "white", alignSelf: "center", fontWeight: "bold"}}>{levels[1]} / 5</Text>
            </View>
        </View>

        <View style={{flexDirection: "row", alignItems: "center", gap: 30}}>
            <Text style={{color: "#6D8CC8", fontWeight: "bold", width: "20%"}}>Kid-Friendly</Text>
            <View style={{flex: 1, height: 20, width: "80%", backgroundColor: "#6D8CC8", right: 0, borderRadius: 10}}>
                <View style={{width: levelAdjuster(levels[2]), height: 20, backgroundColor: "#215AC9", borderRadius: 10}} />
                <Text style={{position: "absolute", color: "white", alignSelf: "center", fontWeight: "bold"}}>{levels[2]} / 5</Text>
            </View>
        </View>

        <View style={{flexDirection: "row", alignItems: "center", gap: 30}}>
            <Text style={{color: "#97D881", fontWeight: "bold", width: "20%"}}>Energy</Text>
            <View style={{flex: 1, height: 20, width: "80%", backgroundColor: "#97D881", right: 0, borderRadius: 10}}>
                <View style={{width: levelAdjuster(levels[3]), height: 20, backgroundColor: "#2BA900", borderRadius: 10}} />
                <Text style={{position: "absolute", color: "white", alignSelf: "center", fontWeight: "bold"}}>{levels[3]} / 5</Text>
            </View>
        </View>
      
    </View>
  )
}

export default LevelIndicator

const styles = StyleSheet.create({})