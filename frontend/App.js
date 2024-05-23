import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import TodoList from './components/TodoList';

const IP_ADDRESS = '192.168.1.102';
const BASE_URL = `http://${IP_ADDRESS}:3001/todos`;

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    axios.get(BASE_URL)
      .then(response => {
        const todos = response.data.map(todo => ({
          ...todo,
          id: todo.id || todo._id,
        }));
        setTodos(todos);
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Erro de Rede', 'Não foi possível conectar ao servidor.');
      });
  }, []);

  const addTodo = () => {
    axios.post(BASE_URL, { text: newTodo })
      .then(response => {
        setTodos([...todos, { ...response.data, id: response.data._id }]);
        setNewTodo('');
      })
      .catch(error => console.error(error));
  };

  const deleteTodo = (id) => {
    axios.delete(`${BASE_URL}/${id}`)
      .then(() => setTodos(todos.filter(todo => todo.id !== id)))
      .catch(error => console.error(error));
  };

  const toggleTodo = (id) => {
    axios.patch(`${BASE_URL}/${id}`)
      .then(() => setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a new task"
        value={newTodo}
        onChangeText={setNewTodo}
      />
      <Button title="Add" onPress={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    width: '100%',
  },
});
