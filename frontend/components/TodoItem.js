import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

const TodoItem = ({ todo, deleteTodo, toggleTodo }) => {
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => toggleTodo(todo.id)}>
        <Text style={[styles.text, { textDecorationLine: todo.completed ? 'line-through' : 'none' }]}>
          {todo.text}
        </Text>
      </TouchableOpacity>
      <Button title="Delete" color="#ff4d4d" onPress={() => deleteTodo(todo.id)} />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 15,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
  },
});

export default TodoItem;
