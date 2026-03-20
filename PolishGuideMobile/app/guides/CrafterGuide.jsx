import { Text, View, Image, ScrollView, TouchableOpacity, Linking } from "react-native";
import { colors } from "../../theme/colors";
import {typography} from "../../theme/typography";
import RetryButton from "../../components/Buttons/RetryButton";

export default function Index() {
  return (
    <ScrollView
    contentContainerStyle={{
      flexGrow: 1,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 80,
    }}
      >
        <Text style={[typography.h2, { textAlign: "center", width: 350,       marginTop: 40 }]}>
        Your Guide: 
        <Text style={[typography.h2, { color: "#2F702F" }]}> The Crafter </Text>from the{" "}
        <Text style={[typography.h2, { color: "#2F702F" }]}>
        Rebirth of Poland
        </Text>
        </Text>
        <Image
          source={require("../../assets/images/CraftingMobile.png")}
          style={{ width: 260, height: 260, marginTop: 40 }}
        />
        <Text style={[typography.p, { textAlign: "center", width: 320, marginTop: 20, }]}>
        Based on your answers, your Polish history guide is <Text style={[typography.pBold, {color: "#2F702F" }]}>The Crafter.</Text>
        </Text>
        <Text style={[typography.p, { textAlign: "center", width: 360, marginTop: 20, }]}>
        Discover how Poland rebuilt itself, restoring its independence through hard work, resilience, and a renewed sense of national identity.
        </Text>

        {/* What To Do Now */}
        <Text style={[typography.h3, { textAlign: "center", width: 360, marginTop: 50, color: "#2F702F" }]}>
          What To Do Now
        </Text>
        <Text style={[typography.p, { textAlign: "center", width: 360, marginTop: 20 }]}>
        <Text style= {[typography.pBold, {width: 300}]}>Please find a tablet </Text> 
          and select your guide to begin exploring.
  
        Explore a selection of historical events you might find interesting.
      </Text>
 


        {/* Historical Events */}
        <View style = {{width: 360, backgroundColor: colors.white, height: 140, borderRadius: 20, marginTop: 30, alignItems: "center", justifyContent: "center" }}>
          <View style ={{width: 64, height: 42, backgroundColor: "#2F702F", borderRadius: 20, position: "absolute", top: -16, left: 0, alignItems: "center", justifyContent: "center"}}>
            <Text style = {[typography.pBold, {color: colors.white, textAlign: "center", width: 64}]}>1914</Text>
          </View>
          <Text style = {[typography.p, {width: 300}]}>
            <Text style= {[typography.pBold, {width: 300}]}>WWI Begins </Text> 
            {"\n"}
            Poland’s land is controlled by Germany, Russia, and Austro-Hungary.
          </Text>
        </View>

        <View style = {{width: 360, backgroundColor: colors.white, height: 140, borderRadius: 20, marginTop: 30, alignItems: "center", justifyContent: "center" }}>
        <View style ={{width: 64, height: 42, backgroundColor: "#2F702F", borderRadius: 20, position: "absolute", top: -16, left: 0, alignItems: "center", justifyContent: "center"}}>
            <Text style = {[typography.pBold, {color: colors.white, textAlign: "center", width: 64}]}>1918</Text>
          </View>
          <Text style = {[typography.p, {width: 300}]}>
            <Text style= {[typography.pBold, {width: 300}]}>Independence </Text> 
            {"\n"}
            Poland regains independence after WWI ends.
          </Text>
        </View>

        <View style = {{width: 360, backgroundColor: colors.white, height: 140, borderRadius: 20, marginTop: 30, alignItems: "center", justifyContent: "center" }}>
        <View style ={{width: 64, height: 42, backgroundColor: "#2F702F", borderRadius: 20, position: "absolute", top: -16, left: 0, alignItems: "center", justifyContent: "center"}}>
            <Text style = {[typography.pBold, {color: colors.white, textAlign: "center", width: 64}]}>1920</Text>
          </View>
          <Text style = {[typography.p, {width: 300}]}>
            <Text style= {[typography.pBold, {width: 300}]}>Battle of Warsaw  </Text> 
            {"\n"}
            Poland defeats the Soviet Red Army.
          </Text>
        </View>


        {/* Take Home Content */}
          <Text style={[typography.h3, { textAlign: "center", width: 360, marginTop: 50, color: "#2F702F" }]}>
          Take Home Content  
        </Text>
        <Text style={[typography.p, { textAlign: "center", width: 350, marginTop: 10, marginBottom: 20, }]}>
        Click on the links below to explore more!
        </Text>

        <TouchableOpacity 
        onPress={() => Linking.openURL("https://en.wikipedia.org/wiki/History_of_Poland_during_World_War_I")}
        style = {{width: 360, backgroundColor: colors.white, height: 140, borderRadius: 20, marginTop: 20, alignItems: "center", justifyContent: "center" , flexDirection: "row"}}>
          <Image
            source={require("../../assets/images/GuidePictures/War.png")}
            style={{ width: 140, height: 138, borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20, marginLeft: 102, marginRight: 20 }} 
            >
          </Image>
          <Text style= {[typography.pBold, {width: 300}]}>
          History of Poland 
          {"\n"}
          during World War I
              </Text> 
        </TouchableOpacity>

        <TouchableOpacity 
         onPress={() => Linking.openURL("https://neweasterneurope.eu/2018/11/05/independence-poland-1918/")}       
         style = {{width: 360, backgroundColor: colors.white, height: 140, borderRadius: 20, marginTop: 20, alignItems: "center", justifyContent: "center" , flexDirection: "row"}}>
          <Image
            source={require("../../assets/images/GuidePictures/Drawing.png")}
            style={{ width: 140, height: 138, borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20, marginLeft: 102, marginRight: 20 }} 
            >
          </Image>
          <Text style= {[typography.pBold, {width: 300}]}>
          More than
          {"\n"}
          independence. Poland
          {"\n"}
          and 1918
              </Text> 
        </TouchableOpacity>

        <TouchableOpacity 
         onPress={() => Linking.openURL("https://www.youtube.com/watch?v=zwSvr90pFA0")}  
         style = {{width: 360, backgroundColor: colors.white, height: 140, borderRadius: 20, marginTop: 20, alignItems: "center", justifyContent: "center" , flexDirection: "row"}}>
          <Image
            source={require("../../assets/images/GuidePictures/Victory.png")}
            style={{ width: 140, height: 138, borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20, marginLeft: 102, marginRight: 20 }} 
            >
          </Image>
          <Text style= {[typography.pBold, {width: 300}]}>
            The Battle of Warsaw-
            {"\n"}
            Poland’s victory for 
            {"\n"}
            Europe’s freedom
              </Text> 
        </TouchableOpacity>

        <RetryButton />

    </ScrollView>
  );
}