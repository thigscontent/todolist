import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

export default function App() {
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTask();
    }, []);

    async function createTask() {
        const data = {
            task: input,
            done: false
        };
        console.log(data);
        await axios.post('http://192.168.1.12:3001/tasks/', data)
        .then(response => {
            setTasks([...tasks, { ...data, _id: response.data._id }]);
        })
        .catch(error => {
            console.log(error);
        });
    }

    async function getTask() {
        await axios.get('http://192.168.1.12:3001/tasks')
        .then(response => {
            setTasks(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    async function deleteTask(taskData, index) {
        await axios.delete(`http://192.168.1.12:3001/tasks/${taskData._id}`)
        .then(() => {
            const updatedTasks = tasks.filter((task, idx) => idx !== index);
            setTasks(updatedTasks);
        })
        .catch(error => {
            console.log(error);
        });
    }

    async function updateTask(taskData) {
        const data = {
            done: taskData.done
        };
        await axios.put(`http://192.168.1.12:3001/tasks/${taskData._id}`, data)
        .catch(error => {
            console.log(error);
        });
    }

    function addTask() {
        if (input.trim() !== '') {
            const newTask = {
                task: input,
                done: false
            };
            setTasks([...tasks, newTask]);
            setInput('');
            createTask();
        }
    }

    function done(index) {
        const updatedTasks = tasks.map((task, idx) => {
            if (idx === index) {
                const updatedTask = { ...task, done: !task.done };
                updateTask(updatedTask);
                return updatedTask;
            }
            return task;
        });
        const sortedTasks = updatedTasks.sort((a, b) => {
            return a.done === b.done ? 0 : a.done ? 1 : -1;
        });
        setTasks(sortedTasks);
    }

    const renderItem = ({ item, index }) => (
        <View style={styles.taskContainer}>
            <TouchableOpacity onPress={() => done(index)} style={styles.checkbox}>
                <Text>{item.done ? '✓' : ''}</Text>
            </TouchableOpacity>
            <Text style={item.done ? styles.taskDone : styles.task}>{item.task}</Text>
            <TouchableOpacity onPress={() => deleteTask(item, index)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Tarefas</Text>
            <View style={styles.addTaskContainer}>
                <TextInput
                    style={styles.input}
                    value={input}
                    placeholder="Adicionar tarefa"
                    onChangeText={text => setInput(text)}
                />
                <Button title="Adicionar Tarefa" onPress={addTask} />
            </View>
            <FlatList
                data={tasks}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    addTaskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
    },
    taskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: '#ccc',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    task: {
        flex: 1,
        fontSize: 18,
    },
    taskDone: {
        flex: 1,
        fontSize: 18,
        textDecorationLine: 'line-through',
        color: '#aaa',
    },
    deleteButton: {
        marginLeft: 10,
        padding: 5,
    },
    deleteButtonText: {
        color: 'red',
        fontWeight: 'bold',
    },
});
