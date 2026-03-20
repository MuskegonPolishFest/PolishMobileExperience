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
        <Text style={[typography.h2, { color: "#D83F19" }]}> The Adventurer </Text>from the{" "}
        <Text style={[typography.h2, { color: "#D83F19" }]}>
        World War II & Occupation
        </Text>
        </Text>
        <Image
          source={require("../../assets/images/ExplorerMobile.png")}
          style={{ width: 260, height: 260, marginTop: 40 }}
        />
        <Text style={[typography.p, { textAlign: "center", width: 320, marginTop: 20, }]}>
        Based on your answers, your Polish history guide is <Text style={[typography.pBold, {color: "#D83F19" }]}>The Adventurer.</Text>
        </Text>
        <Text style={[typography.p, { textAlign: "center", width: 350, marginTop: 20, }]}>
        Navigate wartime Poland and witness acts of bravery, resistance, and
        survival from exciting triumphs, to tragic defeats, against the sweep of Nazi aggression.
        </Text>

        {/* You May Like */}
        <Text style={[typography.h3, { textAlign: "center", width: 360, marginTop: 50, color: "#D83F19" }]}>
          You May Like
        </Text>
        <Text style={[typography.p, { textAlign: "center", width: 360, marginTop: 20 }]}>
        <Text style= {[typography.pBold, {width: 300}]}>Please find a tablet </Text> 
          and select your guide to begin exploring.
  
        Explore a selection of historical events you might find interesting.
      </Text>
 

        {/* Historical Events */}
        <View style = {{width: 360, backgroundColor: colors.white, height: 140, borderRadius: 20, marginTop: 30, alignItems: "center", justifyContent: "center" }}>
          <View style ={{width: 64, height: 42, backgroundColor: "#D83F19", borderRadius: 20, position: "absolute", top: -16, left: 0, alignItems: "center", justifyContent: "center"}}>
            <Text style = {[typography.pBold, {color: colors.white, textAlign: "center", width: 64}]}>1939</Text>
          </View>
          <Text style = {[typography.p, {width: 300}]}>
            <Text style= {[typography.pBold, {width: 300}]}>WWI Begins </Text> 
            {"\n"}
            Germany and the USSR invade Poland.
             </Text>
        </View>

        <View style = {{width: 360, backgroundColor: colors.white, height: 140, borderRadius: 20, marginTop: 30, alignItems: "center", justifyContent: "center" }}>
        <View style ={{width: 64, height: 42, backgroundColor: "#D83F19", borderRadius: 20, position: "absolute", top: -16, left: 0, alignItems: "center", justifyContent: "center"}}>
            <Text style = {[typography.pBold, {color: colors.white, textAlign: "center", width: 64}]}>1944</Text>
          </View>
          <Text style = {[typography.p, {width: 300}]}>
            <Text style= {[typography.pBold, {width: 300}]}>Warsaw Uprising </Text> 
            {"\n"}
            A major rebellion against German rule fails.
            </Text>
        </View>

        <View style = {{width: 360, backgroundColor: colors.white, height: 140, borderRadius: 20, marginTop: 30, alignItems: "center", justifyContent: "center" }}>
        <View style ={{width: 64, height: 42, backgroundColor: "#D83F19", borderRadius: 20, position: "absolute", top: -16, left: 0, alignItems: "center", justifyContent: "center"}}>
            <Text style = {[typography.pBold, {color: colors.white, textAlign: "center", width: 64}]}>1945</Text>
          </View>
          <Text style = {[typography.p, {width: 300}]}>
            <Text style= {[typography.pBold, {width: 300}]}>WWII Ends </Text> 
            {"\n"}
            Poland falls under Soviet control.
            </Text>
        </View>


        {/* Take Home Content */}
        <Text style={[typography.h3, { textAlign: "center", width: 360, marginTop: 50, color: "#D83F19" }]}>
        Take Home Content        
        </Text>
        <Text style={[typography.p, { textAlign: "center", width: 350, marginTop: 10, marginBottom: 20, }]}>
        Click on the links below to explore more!
        </Text>

        <TouchableOpacity 
        onPress={() => Linking.openURL("https://en.wikipedia.org/wiki/Warsaw_Uprising")}
        style = {{width: 360, backgroundColor: colors.white, height: 140, borderRadius: 20, marginTop: 20, alignItems: "center", justifyContent: "center" , flexDirection: "row"}}>
          <Image
            source={require("../../assets/images/GuidePictures/Uprising.png")}
            style={{ width: 140, height: 138, borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20, marginLeft: 102, marginRight: 20 }} 
            >
          </Image>
          <Text style= {[typography.pBold, {width: 300}]}>
          Warsaw Uprising 
          {"\n"}
          Overview
              </Text> 
        </TouchableOpacity>

        <TouchableOpacity 
         onPress={() => Linking.openURL("https://www.youtube.com/watch?v=MPrQdlrCzPY")}       
         style = {{width: 360, backgroundColor: colors.white, height: 140, borderRadius: 20, marginTop: 20, alignItems: "center", justifyContent: "center" , flexDirection: "row"}}>
          <Image
            source={require("../../assets/images/GuidePictures/Pianist.png")}
            style={{ width: 140, height: 138, borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20, marginLeft: 102, marginRight: 20 }} 
            >
          </Image>
          <Text style= {[typography.pBold, {width: 300}]}>
          Scene from the Pianist
              </Text> 
        </TouchableOpacity>

        <TouchableOpacity 
         onPress={() => Linking.openURL("https://www.1944.pl/archiwum-historii-mowionej.html")}  
         style = {{width: 360, backgroundColor: colors.white, height: 140, borderRadius: 20, marginTop: 20, alignItems: "center", justifyContent: "center" , flexDirection: "row"}}>
          <Image
            source={require("../../assets/images/GuidePictures/Interview.png")}
            style={{ width: 140, height: 138, borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20, marginLeft: 102, marginRight: 20 }} 
            >
          </Image>
            <Text style= {[typography.pBold, {width: 300}]}>
            Oral History Archive
              </Text> 
        </TouchableOpacity>

        <RetryButton />

    </ScrollView>
  );
}
