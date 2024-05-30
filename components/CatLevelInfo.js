import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { Tooltip } from 'react-native-elements';

const CatLevelInfo = () => {

  const window = Dimensions.get('window');
  const windowWidth = window.width;
  const windowHeight = window.height;

  const catLevelInfoText = () => {
    return (
      <ScrollView>
        <Text style={{fontSize: 14}}>
          <Text style={{fontWeight: "bold"}}>Affection Level</Text>{'\n'}
          1: Very independent, rarely seeks out human interaction, prefers solitude.{'\n'}
          2: Occasionally affectionate, may enjoy petting but on their own terms.{'\n'}
          3: Moderately affectionate, enjoys being around people, sometimes seeks out attention.{'\n'}
          4: Quite affectionate, often seeks out human interaction, enjoys being petted.{'\n'}
          5: Extremely affectionate, loves being around people, constantly seeks attention and physical contact.{'\n'}{'\n'}
          
          <Text style={{fontWeight: "bold"}}>Playfulness Level</Text>{'\n'}
          1: Very calm, rarely engages in play, prefers to rest.{'\n'}
          2: Occasionally playful, may show interest in toys sometimes.{'\n'}
          3: Moderately playful, enjoys playing with toys and interactive games sometimes.{'\n'}
          4: Quite playful, often engages in play, shows a lot of interest in toys and games.{'\n'}
          5: Extremely playful, always active and engaged, loves to play with toys and people.{'\n'}{'\n'}
          
          <Text style={{fontWeight: "bold"}}>Kid-Friendly Level</Text>{'\n'}
          1: Not tolerant of children, may react negatively to their presence.{'\n'}
          2: Tolerates children occasionally, but generally prefers to avoid them.{'\n'}
          3: Moderately kid-friendly, gets along with children but may need some space.{'\n'}
          4: Quite kid-friendly, generally patient and tolerant, enjoys playing with children.{'\n'}
          5: Extremely kid-friendly, very patient and tolerant, loves interacting with children.{'\n'}{'\n'}
          
          <Text style={{fontWeight: "bold"}}>Energy Level</Text>{'\n'}
          1: Very low energy, prefers sleeping and resting most of the time.{'\n'}
          2: Occasionally active, has short bursts of energy but mostly calm.{'\n'}
          3: Moderate energy, balanced between rest and activity.{'\n'}
          4: Quite energetic, frequently active, enjoys physical activities and exploring.{'\n'}
          5: Extremely energetic, constantly active and on the move, requires lots of stimulation.{'\n'}
        </Text>
      </ScrollView>
    );
  };

  return (
    <View>
      <Tooltip popover={catLevelInfoText()} width={300} height={400} backgroundColor="white">
        <Feather name="info" size={24} color="#F15025" />
      </Tooltip>
    </View>
  );
};

export default CatLevelInfo;

const styles = StyleSheet.create();
