import React from 'react';
import { Card, Tag, Button, Typography, Space, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import  { type TodoItemType, Priority } from '../types';

const { Text, Paragraph } = Typography;

interface TodoItemProps {
  todo: TodoItemType;
  onToggleComplete: (id: string) => void;
  onEdit: (todo: TodoItemType) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onEdit, onDelete }) => {
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
        return '高优先级';
      case Priority.MEDIUM:
        return '中优先级';
      case Priority.LOW:
        return '低优先级';
      default:
        return '普通';
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
            title={todo.completed ? '标记为未完成' : '标记为已完成'}
          />
          <Button type="text" icon={<EditOutlined />} onClick={() => onEdit(todo)} title="编辑任务" />
          <Popconfirm
            title="确定要删除这个任务吗？"
            onConfirm={() => onDelete(todo.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="text" danger icon={<DeleteOutlined />} title="删除任务" />
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
            创建时间：{new Date(todo.createdAt).toLocaleString()}
          </Text>
          {todo.updatedAt !== todo.createdAt && (
            <Text type="secondary" className="text-xs ml-2">
              更新时间：{new Date(todo.updatedAt).toLocaleString()}
            </Text>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TodoItem;