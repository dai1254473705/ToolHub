import React from 'react';
import { Form, Input, Select, Button, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
      title={todo ? t('tools.todoList.edit') : t('tools.todoList.add')}
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
          label={t('tools.todoList.form.title')}
          rules={[{ required: true, message: t('tools.todoList.form.required') }]}
        >
          <Input placeholder={t('tools.todoList.form.titlePlaceholder')} />
        </Form.Item>
        <Form.Item
          name="description"
          label={t('tools.todoList.form.desc')}
        >
          <TextArea rows={4} placeholder={t('tools.todoList.form.descPlaceholder')} />
        </Form.Item>
        <Form.Item
          name="priority"
          label={t('tools.todoList.form.priority')}
          initialValue={Priority.MEDIUM}
          rules={[{ required: true, message: t('tools.todoList.form.priorityPlaceholder') }]}
        >
          <Select placeholder={t('tools.todoList.form.priorityPlaceholder')}>
            <Option value={Priority.LOW}>{t('tools.todoList.form.priorities.low')}</Option>
            <Option value={Priority.MEDIUM}>{t('tools.todoList.form.priorities.medium')}</Option>
            <Option value={Priority.HIGH}>{t('tools.todoList.form.priorities.high')}</Option>
          </Select>
        </Form.Item>
        <Form.Item className="text-right">
          <Button onClick={onCancel} className="mr-2">
            {t('common.cancel')}
          </Button>
          <Button type="primary" onClick={handleSubmit}>
            {todo ? t('tools.todoList.update') : t('tools.todoList.add')}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TodoForm;