import React from 'react';
import { Text, View } from 'react-native';
import styles from './faq.styles';

const FaqPageComponent = () => {
  // todo translates
  const list = [
    ['What is Gastro & Me team?', 'An enthusiastic 3 member team that is technologically changing the approach to cooking education 🎓'],
    ['What is goal?', 'To massive spread cooking skill thought new technology 🌟'],
    ['Is project needs support?', 'Now we have single developer who maintain application. Become our subscriber for support the project 🙏'],
    ['Is Voice Assistant will be updated?', 'Yes, we plan to extend the assistant with LLM in future 🔮']
  ];

  return (
    <View style={styles.container}>
      {list.map(([question, answer]) => (
        <View style={styles.item}>
          <Text style={styles.question}>{question}</Text>
          <Text style={styles.answer}>{answer}</Text>
        </View>
      ))}
    </View>
  );
};

export const FaqPage = FaqPageComponent;
