import { Text, View, Image, ScrollView, TouchableOpacity, Linking } from "react-native";
import { colors } from "../../theme/colors";
import {typography} from "../../theme/typography";

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
        <Text style={[typography.h2, { color: "#9B5802" }]}> The Culture Buff  </Text>from the{" "}
        <Text style={[typography.h2, { color: "#9B5802" }]}>
        Golden Age
        </Text>
        </Text>
        <Image
          source={require("../../assets/images/AcademicMobile.png")}
          style={{ width: 260, height: 260, marginTop: 40 }}
        />
        <Text style={[typography.p, { textAlign: "center", width: 320, marginTop: 20, }]}>
        Based on your answers, your Polish history guide is <Text style={typography.pBold}>The Culture Buff .</Text>
        </Text>
        <Text style={[typography.p, { textAlign: "center", width: 360, marginTop: 20, }]}>
        Explore how Poland flourished during this era, and how it led Europe
        through innovation, and by serving as a cultural hub that shaped the nation’s identity.
        </Text>

        {/* You May Like */}
        <Text style={[typography.h3, { textAlign: "center", width: 360, marginTop: 50, color: "#9B5802" }]}>
          You May Like
        </Text>
        <View style = {{width: 360, backgroundColor: colors.white, height: 48, borderRadius: 20, marginTop: 20, alignItems: "center", justifyContent: "center" }}>
          <Text style = {typography.p}>The Polish-Lithuanian Commonwealth</Text>
        </View>
        <View style = {{width: 360, backgroundColor: colors.white, height: 48, borderRadius: 20, marginTop: 20, alignItems: "center", justifyContent: "center" }}>
          <Text style = {typography.p}>Renaissance & Enlightenment</Text>
        </View>

        {/* Historical Events */}
        <Text style={[typography.h3, { textAlign: "center", width: 360, marginTop: 50, color: "#9B5802" }]}>
        Historical events to explore
        </Text>

        <View style = {{width: 360, backgroundColor: colors.white, height: 140, borderRadius: 20, marginTop: 30, alignItems: "center", justifyContent: "center" }}>
          <View style ={{width: 64, height: 42, backgroundColor: "#9B5802", borderRadius: 20, position: "absolute", top: -16, left: 0, alignItems: "center", justifyContent: "center"}}>
            <Text style = {[typography.pBold, {color: colors.white, textAlign: "center", width: 64}]}>1635</Text>
          </View>
          <Text style = {[typography.p, {width: 300}]}>
            <Text style= {[typography.pBold, {width: 300}]}>Armistice of Stuhmsdorf </Text> 
            {"\n"}
            Poland signs (Armistice of Stuhmsdorf) a peace treaty with Sweden, securing its power.
          </Text>
        </View>

        <View style = {{width: 360, backgroundColor: colors.white, height: 140, borderRadius: 20, marginTop: 30, alignItems: "center", justifyContent: "center" }}>
        <View style ={{width: 64, height: 42, backgroundColor: "#9B5802", borderRadius: 20, position: "absolute", top: -16, left: 0, alignItems: "center", justifyContent: "center"}}>
            <Text style = {[typography.pBold, {color: colors.white, textAlign: "center", width: 64}]}>1653</Text>
          </View>
          <Text style = {[typography.p, {width: 300}]}>
            <Text style= {[typography.pBold, {width: 300}]}>Conflict and Decline </Text> 
            {"\n"}
            Internal conflicts and wars begin, marking the decline of Poland’s strength.
          </Text>
        </View>

         {/* Contents you can explore */}
         <Text style={[typography.h3, { textAlign: "center", width: 360, marginTop: 50, color: "#9B5802" }]}>
        Contents you can explore        
        </Text>
        <Text style={[typography.p, { textAlign: "center", width: 350, marginTop: 10, marginBottom: 20, }]}>
        Click on the links below to explore more!
        </Text>

        <TouchableOpacity 
        onPress={() => Linking.openURL("https://www.youtube.com/watch?v=M0p6NKANE08")}
        style = {{width: 360, backgroundColor: colors.white, height: 140, borderRadius: 20, marginTop: 20, alignItems: "center", justifyContent: "center" , flexDirection: "row"}}>
          <Image
            source={require("../../assets/images/GuidePictures/Copernicus.png")}
            style={{ width: 140, height: 138, borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20, marginLeft: 102, marginRight: 20 }} 
            >
          </Image>
          <Text style= {[typography.pBold, {width: 300}]}>Copernicus Summary </Text> 
        </TouchableOpacity>

        <TouchableOpacity 
         onPress={() => Linking.openURL("https://www.youtube.com/watch?v=3tHxPkigGRw")}       
         style = {{width: 360, backgroundColor: colors.white, height: 140, borderRadius: 20, marginTop: 20, alignItems: "center", justifyContent: "center" , flexDirection: "row"}}>
          <Image
            source={require("../../assets/images/GuidePictures/Heliocentric.png")}
            style={{ width: 140, height: 138, borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20, marginLeft: 102, marginRight: 20 }} 
            >
          </Image>
          <Text style= {[typography.pBold, {width: 300}]}>Heliocentric Model </Text> 
        </TouchableOpacity>

        <TouchableOpacity 
         onPress={() => Linking.openURL("https://commons.wikimedia.org/wiki/Category:Things_named_after_Nicolaus_Copernicus")}  
         style = {{width: 360, backgroundColor: colors.white, height: 140, borderRadius: 20, marginTop: 20, alignItems: "center", justifyContent: "center" , flexDirection: "row"}}>
          <Image
            source={require("../../assets/images/GuidePictures/Statue.png")}
            style={{ width: 140, height: 138, borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20, marginLeft: 102, marginRight: 20 }} 
            >
          </Image>
          <Text style= {[typography.pBold, {width: 300}]}>
            Things named after 
            {"\n"}
            Copernicus
              </Text> 
        </TouchableOpacity>

        <RetryButton onPress={() => {}} />

    </ScrollView>
  );
}
