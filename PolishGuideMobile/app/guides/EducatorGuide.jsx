import { Text, View, Image, ScrollView, TouchableOpacity, Linking } from "react-native";
import { colors } from "../../theme/colors";
import {typography} from "../../theme/typography";
import RetryButton from "../../components/Buttons/RetryButton";
import { useWindowDimensions } from "react-native";

export default function Index() {
  const { width } = useWindowDimensions();
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
        <Text style={[typography.h2, { textAlign: "center", width: width * 0.9,  marginTop: 40 }]}>
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
        <Text style={[typography.p, { textAlign: "center", width: width * 0.8
        , marginTop: 20, }]}>
        Based on your answers, your Polish history guide is <Text style={[typography.pBold, {color: "#9B5802" }]}>The Culture Buff.</Text>
        </Text>
        <Text style={[typography.p, { textAlign: "center", width: width * 0.9, marginTop: 20, }]}>
        Explore how Poland flourished during this era, and how it led Europe
        through innovation, and by serving as a cultural hub that shaped the nation’s identity.
        </Text>

        {/* What To Do Now */}
        <Text style={[typography.h3, { textAlign: "center", width: 360, marginTop: 50, color: "#9B5802" }]}>
        What To Do Now
        </Text>
        <Text style={[typography.p, { textAlign: "center", width: width * 0.9, marginTop: 20 }]}>
        <Text style= {[typography.pBold, {width: 300}]}>Please find a tablet </Text> 
          and select your guide to begin exploring.
  
        Explore a selection of historical events you might find interesting.
      </Text>
 

        {/* Historical Events */}
        <View style = {{width: width * 0.9, backgroundColor: colors.white, height: 140, borderRadius: 20, marginTop: 30, alignItems: "center", justifyContent: "center" }}>
          <View style ={{width: 64, height: 42, backgroundColor: "#9B5802", borderRadius: 20, position: "absolute", top: -16, left: 0, alignItems: "center", justifyContent: "center"}}>
            <Text style = {[typography.pBold, {color: colors.white, textAlign: "center", width: 64}]}>1635</Text>
          </View>
          <Text style = {[typography.p, {width: width * 0.8}]}>
            <Text style= {[typography.pBold, {width: width * 0.8}]}>Armistice of Stuhmsdorf </Text> 
            {"\n"}
            Poland signs (Armistice of Stuhmsdorf) a peace treaty with Sweden, securing its power.
          </Text>
        </View>

        <View style = {{width: width * 0.9, backgroundColor: colors.white, height: 140, borderRadius: 20, marginTop: 30, alignItems: "center", justifyContent: "center" }}>
        <View style ={{width: 64, height: 42, backgroundColor: "#9B5802", borderRadius: 20, position: "absolute", top: -16, left: 0, alignItems: "center", justifyContent: "center"}}>
            <Text style = {[typography.pBold, {color: colors.white, textAlign: "center", width: 64}]}>1653</Text>
          </View>
          <Text style = {[typography.p, {width: width * 0.8}]}>
            <Text style= {[typography.pBold, {width: width * 0.8}]}>Conflict and Decline </Text> 
            {"\n"}
            Internal conflicts and wars begin, marking the decline of Poland’s strength.
          </Text>
        </View>

         {/* Take Home Content*/}
         <Text style={[typography.h3, { textAlign: "center", width: 360, marginTop: 50, color: "#9B5802" }]}>
        Take Home Content        
        </Text>
        <Text style={[typography.p, { textAlign: "center", width: 350, marginTop: 10, marginBottom: 20, }]}>
        Click on the links below to explore more!
        </Text>


        <View style = {{flexDirection: "column", justifyContent: "center", alignItems: "center", }}>
        <TouchableOpacity 
        onPress={() => Linking.openURL("https://www.youtube.com/watch?v=M0p6NKANE08")}
        style={{
          width: width * 0.9,
          backgroundColor: colors.white,
          height: 140,
          borderRadius: 20,
          marginTop: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
          <Image
            source={require("../../assets/images/GuidePictures/Copernicus.png")}
            style={{ width: 140, height: "100%", borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20}} >
          </Image>
          <Text style= {[typography.pBold,{
          flex: 1,
          paddingHorizontal: 16,
        },]}>
          Copernicus Summary 
          </Text> 
        </TouchableOpacity>

        <TouchableOpacity 
         onPress={() => Linking.openURL("https://www.youtube.com/watch?v=3tHxPkigGRw")}       
         style={{
          width: width * 0.9,
          backgroundColor: colors.white,
          height: 140,
          borderRadius: 20,
          marginTop: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
          <Image
            source={require("../../assets/images/GuidePictures/Heliocentric.png")}
            style={{ width: 140, height: "100%", borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20}}>
          </Image>
          <Text style= {[typography.pBold,{
          flex: 1,
          paddingHorizontal: 16,
        },]}>
          Heliocentric Model 
          </Text> 
        </TouchableOpacity>

        <TouchableOpacity 
         onPress={() => Linking.openURL("https://commons.wikimedia.org/wiki/Category:Things_named_after_Nicolaus_Copernicus")}  
         style={{
          width: width * 0.9,
          backgroundColor: colors.white,
          height: 140,
          borderRadius: 20,
          marginTop: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
          <Image
            source={require("../../assets/images/GuidePictures/Statue.png")}
            style={{ width: 140, height: "100%", borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20}} 
            >
          </Image>
          <Text style= {[typography.pBold,{
          flex: 1,
          paddingHorizontal: 16,
        },]}>
            Things named after 
            {"\n"}
            Copernicus
              </Text> 
        </TouchableOpacity>
        </View>

        <RetryButton />

    </ScrollView>
  );
}
