import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Modal, Upload, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { CATEGORIES } from '../../types/website';
import type { WebsiteBookmark } from '../../types/website';

const { Option } = Select;

interface WebsiteBookmarkFormProps {
  isVisible: boolean;
  onCancel: () => void;
  onSave: (website: Omit<WebsiteBookmark, 'id' | 'createdAt' | 'updatedAt'>) => void;
  editingWebsite?: WebsiteBookmark | null;
}

const WebsiteBookmarkForm: React.FC<WebsiteBookmarkFormProps> = ({
  isVisible,
  onCancel,
  onSave,
  editingWebsite
}) => {
  const [form] = Form.useForm();
  const [logoUrl, setLogoUrl] = useState<string>('');

  // 初始化表单数据
  useEffect(() => {
    if (isVisible) {
      if (editingWebsite) {
        form.setFieldsValue(editingWebsite);
        setLogoUrl(editingWebsite.logoUrl);
      } else {
        form.resetFields();
        setLogoUrl('');
      }
    }
  }, [isVisible, editingWebsite, form]);

  // 处理表单提交
  const handleSubmit = () => {
    form.validateFields().then(values => {
      onSave({
        title: values.title,
        url: values.url.startsWith('http') ? values.url : `https://${values.url}`,
        logoUrl: logoUrl,
        category: values.category
      });
    });
  };

  // 处理上传
  const uploadProps: UploadProps = {
    name: 'logo',
    multiple: false,
    beforeUpload: (file) => {
      // 检查文件类型
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        Modal.error({ title: '只能上传图片文件' });
        return Upload.LIST_IGNORE;
      }
      
      // 检查文件大小
      const isLessThan2M = file.size / 1024 / 1024 < 2;
      if (!isLessThan2M) {
        Modal.error({ title: '图片大小必须小于 2MB' });
        return Upload.LIST_IGNORE;
      }
      
      // 读取文件为base64
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      return false; // 阻止自动上传
    },
    showUploadList: false
  };

  return (
    <Modal
      title={editingWebsite ? '编辑网站收藏' : '添加网站收藏'}
      open={isVisible}
      onCancel={onCancel}
      onOk={handleSubmit}
      okText="保存"
      cancelText="取消"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          category: '其他'
        }}
      >
        <Form.Item
          name="title"
          label="网站名称"
          rules={[{ required: true, message: '请输入网站名称' }]}
        >
          <Input placeholder="请输入网站名称" />
        </Form.Item>
        
        <Form.Item
          name="url"
          label="网站链接"
          rules={[
            { required: true, message: '请输入网站链接' },
            { type: 'url', message: '请输入有效的网址' }
          ]}
          getValueFromEvent={(e) => {
            const value = e.target.value;
            if (value && !value.startsWith('http')) {
              // 尝试自动获取网站favicon
              const domain = value.includes('//') ? value.split('//')[1].split('/')[0] : value.split('/')[0];
              setLogoUrl(`https://${domain}/favicon.ico`);
            }
            return value;
          }}
        >
          <Input placeholder="请输入网站链接" />
        </Form.Item>
        
        <Form.Item
          name="category"
          label="分类"
          rules={[{ required: true, message: '请选择分类' }]}
        >
          <Select placeholder="请选择网站分类">
            {CATEGORIES.map(category => (
              <Option key={category} value={category}>{category}</Option>
            ))}
          </Select>
        </Form.Item>
        
        <Form.Item
          label="网站Logo"
          tooltip="可以上传自定义Logo图片或使用默认favicon"
        >
          <div className="logo-upload-section">
            {logoUrl ? (
              <div className="logo-preview">
                <img src={logoUrl} alt="预览" />
                <Button type="text" danger onClick={() => setLogoUrl('')}>
                  删除
                </Button>
              </div>
            ) : (
              <Upload.Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">点击或拖拽图片到此处上传</p>
                <p className="ant-upload-hint">支持 PNG、JPG、GIF 格式，大小不超过 2MB</p>
              </Upload.Dragger>
            )}
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default WebsiteBookmarkForm;