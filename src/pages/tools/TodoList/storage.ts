import localforage from 'localforage';
import type { TodoItem } from './types';

// 配置localforage
localforage.config({
  name: 'ToolHub',
  storeName: 'todolist',
});

// 存储键名
const TODO_ITEMS_KEY = 'todo_items';

// 获取所有任务项
export const getAllTodos = async (): Promise<TodoItem[]> => {
  try {
    const todos = await localforage.getItem<TodoItem[]>(TODO_ITEMS_KEY);
    return todos || [];
  } catch (error) {
    console.error('Error getting todos:', error);
    return [];
  }
};

// 添加任务项
export const addTodo = async (todo: Omit<TodoItem, 'id' | 'createdAt' | 'updatedAt' | 'completed'>): Promise<TodoItem> => {
  try {
    const todos = await getAllTodos();
    const newTodo: TodoItem = {
      ...todo,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    todos.push(newTodo);
    await localforage.setItem(TODO_ITEMS_KEY, todos);
    return newTodo;
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

// 更新任务项
export const updateTodo = async (id: string, updates: Partial<TodoItem>): Promise<TodoItem | null> => {
  try {
    const todos = await getAllTodos();
    const index = todos.findIndex(todo => todo.id === id);
    if (index === -1) return null;
    
    todos[index] = {
      ...todos[index],
      ...updates,
      updatedAt: new Date(),
    };
    
    await localforage.setItem(TODO_ITEMS_KEY, todos);
    return todos[index];
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

// 删除任务项
export const deleteTodo = async (id: string): Promise<boolean> => {
  try {
    const todos = await getAllTodos();
    const filteredTodos = todos.filter(todo => todo.id !== id);
    if (todos.length === filteredTodos.length) return false;
    
    await localforage.setItem(TODO_ITEMS_KEY, filteredTodos);
    return true;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};