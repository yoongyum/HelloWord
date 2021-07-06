import React from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import WordItem from "./WordItem";

export default function WordList({ vocas, onCheck, onRemove }) {
   return (
      <ScrollView style={{ width: "100%" }}>
         <View style={{ alignItems: "center" }}>
            {vocas.map((voca) => (
               <WordItem key={voca.id} {...voca} onCheck={onCheck} onRemove={onRemove} />
            ))}
         </View>
      </ScrollView>
   );
}
