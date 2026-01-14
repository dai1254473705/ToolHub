import React, { useState, useEffect } from 'react';
import { Button, Typography, Space, Empty, Tabs, Spin, Badge } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import type { TodoItemType } from './types';
import { getAllTodos, addTodo, updateTodo, deleteTodo } from './storage';
import './index.css';

const { Title } = Typography;
const { TabPane } = Tabs;

const TodoList: React.FC = () => {
  const { t } = useTranslation();
  const [todos, setTodos] = useState<TodoItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [editingTodo, setEditingTodo] = useState<TodoItemType | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<string>('all');

  // 加载任务列表
  const loadTodos = async () => {
    setLoading(true);
    try {
      const data = await getAllTodos();
      // 按创建时间倒序排序
      data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setTodos(data);
    } catch (error) {
      console.error('Failed to load todos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  // 添加新任务
  const handleAddTodo = async (values: Omit<TodoItemType, 'id' | 'createdAt' | 'updatedAt' | 'completed'>) => {
    try {
      await addTodo(values);
      await loadTodos();
      setFormVisible(false);
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  // 更新任务
  const handleUpdateTodo = async (values: Omit<TodoItemType, 'id' | 'createdAt' | 'updatedAt' | 'completed'>) => {
    if (!editingTodo) return;
    
    try {
      await updateTodo(editingTodo.id, values);
      await loadTodos();
      setFormVisible(false);
      setEditingTodo(undefined);
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  // 删除任务
  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      await loadTodos();
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  // 切换任务完成状态
  const handleToggleComplete = async (id: string) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (todo) {
        await updateTodo(id, { completed: !todo.completed });
        await loadTodos();
      }
    } catch (error) {
      console.error('Failed to toggle todo status:', error);
    }
  };

  // 编辑任务
  const handleEditTodo = (todo: TodoItemType) => {
    setEditingTodo(todo);
    setFormVisible(true);
  };

  // 过滤任务
  const filteredTodos = todos.filter(todo => {
    if (activeTab === 'all') return true;
    if (activeTab === 'completed') return todo.completed;
    if (activeTab === 'pending') return !todo.completed;
    return true;
  });

  // 统计信息
  const totalCount = todos.length;
  const completedCount = todos.filter(todo => todo.completed).length;
  const pendingCount = totalCount - completedCount;

  return (
    <div className="todo-list-page">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <Title level={2}>{t('tools.todoList.title')}</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setFormVisible(true)}
          >
            {t('tools.todoList.add')}
          </Button>
        </div>
        
        <Space className="mb-4">
          <Badge count={totalCount}>
            <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">
              {t('tools.todoList.total')}
            </span>
          </Badge>
          <Badge count={pendingCount} color="blue">
            <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">
              {t('tools.todoList.pending')}
            </span>
          </Badge>
          <Badge count={completedCount} color="green">
            <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">
              {t('tools.todoList.completed')}
            </span>
          </Badge>
        </Space>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab} className="mb-4">
        <TabPane tab={t('tools.todoList.tabs.all')} key="all">
          {loading ? (
            <div className="text-center py-10">
              <Spin size="large" />
            </div>
          ) : filteredTodos.length === 0 ? (
            <Empty description={t('tools.todoList.empty.all')} />
          ) : (
            <div className="todo-items-list">
              {filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggleComplete={handleToggleComplete}
                  onEdit={handleEditTodo}
                  onDelete={handleDeleteTodo}
                />
              ))}
            </div>
          )}
        </TabPane>
        <TabPane tab={t('tools.todoList.tabs.pending')} key="pending">
          {loading ? (
            <div className="text-center py-10">
              <Spin size="large" />
            </div>
          ) : filteredTodos.length === 0 ? (
            <Empty description={t('tools.todoList.empty.pending')} />
          ) : (
            <div className="todo-items-list">
              {filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggleComplete={handleToggleComplete}
                  onEdit={handleEditTodo}
                  onDelete={handleDeleteTodo}
                />
              ))}
            </div>
          )}
        </TabPane>
        <TabPane tab={t('tools.todoList.tabs.completed')} key="completed">
          {loading ? (
            <div className="text-center py-10">
              <Spin size="large" />
            </div>
          ) : filteredTodos.length === 0 ? (
            <Empty description={t('tools.todoList.empty.completed')} />
          ) : (
            <div className="todo-items-list">
              {filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggleComplete={handleToggleComplete}
                  onEdit={handleEditTodo}
                  onDelete={handleDeleteTodo}
                />
              ))}
            </div>
          )}
        </TabPane>
      </Tabs>

      {/* 任务表单模态框 */}
      <TodoForm
        visible={formVisible}
        todo={editingTodo}
        onCancel={() => {
          setFormVisible(false);
          setEditingTodo(undefined);
        }}
        onSubmit={editingTodo ? handleUpdateTodo : handleAddTodo}
      />
    </div>
  );
};

export default TodoList;