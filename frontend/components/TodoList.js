import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import TodoItem from './TodoItem';

const TodoList = ({ todos, deleteTodo, toggleTodo }) => {
  return (
    <View style={styles.list}>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
          />
        )}
        keyExtractor={item => item.id ? item.id.toString() : item._id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
});

export default TodoList;
