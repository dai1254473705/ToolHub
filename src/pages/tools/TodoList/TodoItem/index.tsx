import React from 'react';
import { Card, Tag, Button, Typography, Space, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import  { type TodoItemType, Priority } from '../types';

const { Text, Paragraph } = Typography;

interface TodoItemProps {
  todo: TodoItemType;
  onToggleComplete: (id: string) => void;
  onEdit: (todo: TodoItemType) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onEdit, onDelete }) => {
  const { t } = useTranslation();

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case Priority.HIGH:
        return 'red';
      case Priority.MEDIUM:
        return 'orange';
      case Priority.LOW:
        return 'green';
      default:
        return 'blue';
    }
  };

  const getPriorityText = (priority: Priority) => {
    switch (priority) {
      case Priority.HIGH:
        return t('tools.todoList.form.priorities.high');
      case Priority.MEDIUM:
        return t('tools.todoList.form.priorities.medium');
      case Priority.LOW:
        return t('tools.todoList.form.priorities.low');
      default:
        return t('tools.todoList.form.priorities.medium');
    }
  };

  return (
    <Card
      className={`todo-item-card mb-4 hover:shadow-md transition-shadow ${todo.completed ? 'opacity-70' : ''}`}
      extra={
        <Space size="small">
          <Button
            type="text"
            icon={todo.completed ? <CloseCircleOutlined /> : <CheckCircleOutlined />}
            onClick={() => onToggleComplete(todo.id)}
            title={todo.completed ? t('tools.todoList.item.markUncomplete') : t('tools.todoList.item.markComplete')}
          />
          <Button type="text" icon={<EditOutlined />} onClick={() => onEdit(todo)} title={t('tools.todoList.item.edit')} />
          <Popconfirm
            title={t('tools.todoList.item.deleteConfirm')}
            onConfirm={() => onDelete(todo.id)}
            okText={t('common.confirm')}
            cancelText={t('common.cancel')}
          >
            <Button type="text" danger icon={<DeleteOutlined />} title={t('tools.todoList.item.delete')} />
          </Popconfirm>
        </Space>
      }
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">          
          <div className="flex items-center mb-2">
            <Text strong className={todo.completed ? 'line-through' : ''}>
              {todo.title}
            </Text>
            <Tag color={getPriorityColor(todo.priority)} className="ml-2">
              {getPriorityText(todo.priority)}
            </Tag>
          </div>
          {todo.description && (
            <Paragraph className={`mb-2 ${todo.completed ? 'line-through' : ''}`}>
              {todo.description}
            </Paragraph>
          )}
          <Text type="secondary" className="text-xs">
            {t('tools.todoList.item.created')}{new Date(todo.createdAt).toLocaleString()}
          </Text>
          {todo.updatedAt !== todo.createdAt && (
            <Text type="secondary" className="text-xs ml-2">
              {t('tools.todoList.item.updated')}{new Date(todo.updatedAt).toLocaleString()}
            </Text>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TodoItem;