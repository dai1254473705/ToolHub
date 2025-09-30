import React from 'react';
import { Form, Input, Select, Button, Modal } from 'antd';
import { type TodoItemType, Priority } from '../types';

const { TextArea } = Input;
const { Option } = Select;

interface TodoFormProps {
  visible: boolean;
  todo?: TodoItemType;
  onCancel: () => void;
  onSubmit: (values: Omit<TodoItemType, 'id' | 'createdAt' | 'updatedAt' | 'completed'>) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ visible, todo, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (visible) {
      if (todo) {
        form.setFieldsValue({
          title: todo.title,
          description: todo.description,
          priority: todo.priority,
        });
      } else {
        form.resetFields();
      }
    }
  }, [visible, todo, form]);

  const handleSubmit = () => {
    form.validateFields().then(values => {
      onSubmit(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      title={todo ? '编辑任务' : '添加任务'}
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        className="mt-2"
      >
        <Form.Item
          name="title"
          label="任务标题"
          rules={[{ required: true, message: '请输入任务标题' }]}
        >
          <Input placeholder="请输入任务标题" />
        </Form.Item>
        <Form.Item
          name="description"
          label="任务详情"
        >
          <TextArea rows={4} placeholder="请输入任务详情（可选）" />
        </Form.Item>
        <Form.Item
          name="priority"
          label="优先级"
          initialValue={Priority.MEDIUM}
          rules={[{ required: true, message: '请选择优先级' }]}
        >
          <Select placeholder="请选择优先级">
            <Option value={Priority.LOW}>低优先级</Option>
            <Option value={Priority.MEDIUM}>中优先级</Option>
            <Option value={Priority.HIGH}>高优先级</Option>
          </Select>
        </Form.Item>
        <Form.Item className="text-right">
          <Button onClick={onCancel} className="mr-2">
            取消
          </Button>
          <Button type="primary" onClick={handleSubmit}>
            {todo ? '更新' : '添加'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TodoForm;