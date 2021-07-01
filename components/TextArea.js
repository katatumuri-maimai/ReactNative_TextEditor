import React, { Component } from 'react';
import { StyleSheet, Text} from 'react-native';

export default function MyTextArea(props) {
  const [value, onChangeText] = React.useState(props.value);

  return (
      <textarea
        placeholder={props.placeholder}
        className={props.className}
        onChange={event => onChangeText(event.target.value)}
      ></textarea>
  );
};
