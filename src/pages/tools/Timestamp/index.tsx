/**
 * 时间戳转换工具
 */
import React, { useState } from 'react';
import { Card, Row, Col, Typography, Input, Button, message, Radio, Space } from 'antd';
import { CopyOutlined, SyncOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
import './index.less';

const { Title, Text } = Typography;

const Timestamp: React.FC = () => {
  const [timestamp, setTimestamp] = useState('');
  const [datetime, setDatetime] = useState('');
  const [unit, setUnit] = useState<'s' | 'ms'>('ms');

  // 时间戳转日期
  const handleTimestampToDate = () => {
    if (!timestamp.trim()) {
      message.warning('请输入时间戳');
      return;
    }

    const ts = parseInt(timestamp.trim());
    if (isNaN(ts)) {
      message.error('请输入有效的时间戳');
      return;
    }

    try {
      // 根据单位转换
      const milliseconds = unit === 's' ? ts * 1000 : ts;
      const date = dayjs(milliseconds);
      setDatetime(date.format('YYYY-MM-DD HH:mm:ss'));
      message.success('转换成功');
    } catch (error) {
      message.error('转换失败，请检查时间戳格式');
    }
  };

  // 日期转时间戳
  const handleDateToTimestamp = () => {
    if (!datetime.trim()) {
      message.warning('请输入日期时间');
      return;
    }

    try {
      const date = dayjs(datetime);
      if (!date.isValid()) {
        message.error('日期格式不正确');
        return;
      }

      const ts = unit === 's' ? date.unix() : date.valueOf();
      setTimestamp(ts.toString());
      message.success('转换成功');
    } catch (error) {
      message.error('转换失败，请检查日期格式');
    }
  };

  // 设置为当前时间
  const handleSetCurrentTime = () => {
    const ts = unit === 's' ? Math.floor(Date.now() / 1000) : Date.now();
    setTimestamp(ts.toString());
    const date = dayjs();
    setDatetime(date.format('YYYY-MM-DD HH:mm:ss'));
  };

  // 复制时间戳
  const handleCopyTimestamp = () => {
    if (!timestamp) {
      message.warning('没有可复制的内容');
      return;
    }
    navigator.clipboard.writeText(timestamp).then(() => {
      message.success('已复制到剪贴板');
    });
  };

  // 复制日期时间
  const handleCopyDatetime = () => {
    if (!datetime) {
      message.warning('没有可复制的内容');
      return;
    }
    navigator.clipboard.writeText(datetime).then(() => {
      message.success('已复制到剪贴板');
    });
  };

  // 获取当前时间的各种格式
  const getCurrentTimeFormats = () => {
    const now = dayjs();
    return {
      timestamp: Date.now(),
      unix: now.unix(),
      iso: now.toISOString(),
      utc: now.utc().format('YYYY-MM-DD HH:mm:ss'),
      date: now.format('YYYY-MM-DD'),
      time: now.format('HH:mm:ss'),
    };
  };

  const formats = getCurrentTimeFormats();

  return (
    <div className="timestamp-tool">
      <Title level={2}>时间戳转换</Title>
      <Text type="secondary">Unix 时间戳与日期时间互相转换</Text>

      {/* 当前时间显示 */}
      <Card className="current-time-card" bordered={false}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text type="secondary">当前时间戳（毫秒）</Text>
            <div className="time-value">{formats.timestamp}</div>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text type="secondary">当前时间戳（秒）</Text>
            <div className="time-value">{formats.unix}</div>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text type="secondary">当前时间</Text>
            <div className="time-value">{dayjs().format('YYYY-MM-DD HH:mm:ss')}</div>
          </Col>
        </Row>
        <Button icon={<SyncOutlined />} onClick={handleSetCurrentTime} style={{ marginTop: 16 }}>
          使用当前时间
        </Button>
      </Card>

      {/* 转换工具 */}
      <Card className="tool-card" bordered={false}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* 单位选择 */}
          <div>
            <Text strong>时间戳单位：</Text>
            <Radio.Group value={unit} onChange={(e) => setUnit(e.target.value)} style={{ marginLeft: 16 }}>
              <Radio value="ms">毫秒（13位）</Radio>
              <Radio value="s">秒（10位）</Radio>
            </Radio.Group>
          </div>

          {/* 时间戳转日期 */}
          <div className="convert-section">
            <Title level={4}>时间戳 → 日期时间</Title>
            <Input
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              placeholder={unit === 'ms' ? '请输入毫秒时间戳，如：1699999999999' : '请输入秒时间戳，如：1699999999'}
              size="large"
              suffix={
                <Button
                  type="text"
                  icon={<CopyOutlined />}
                  onClick={handleCopyTimestamp}
                  disabled={!timestamp}
                />
              }
            />
            <Button
              type="primary"
              onClick={handleTimestampToDate}
              style={{ marginTop: 12 }}
              block
            >
              转换为日期时间
            </Button>
          </div>

          {/* 日期转时间戳 */}
          <div className="convert-section">
            <Title level={4}>日期时间 → 时间戳</Title>
            <Input
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
              placeholder="请输入日期时间，如：2024-01-01 12:00:00"
              size="large"
              suffix={
                <Button
                  type="text"
                  icon={<CopyOutlined />}
                  onClick={handleCopyDatetime}
                  disabled={!datetime}
                />
              }
            />
            <Button
              type="primary"
              onClick={handleDateToTimestamp}
              style={{ marginTop: 12 }}
              block
            >
              转换为时间戳
            </Button>
          </div>
        </Space>
      </Card>

      {/* 使用说明 */}
      <Card className="info-card" bordered={false}>
        <Title level={4}>什么是时间戳？</Title>
        <Text>
          时间戳（Timestamp）是指从 1970 年 1 月 1 日 00:00:00 UTC 到指定时间的总秒数或毫秒数。
          也称为 Unix 时间戳或 POSIX 时间。
        </Text>
        <Title level={4} style={{ marginTop: 16 }}>
          常见格式
        </Title>
        <ul>
          <li>秒级时间戳：10位数字，如 1699999999</li>
          <li>毫秒级时间戳：13位数字，如 1699999999999</li>
          <li>JavaScript 使用毫秒级时间戳</li>
          <li>PHP、Python 等语言通常使用秒级时间戳</li>
        </ul>
        <Title level={4} style={{ marginTop: 16 }}>
          支持的日期格式
        </Title>
        <ul>
          <li>YYYY-MM-DD HH:mm:ss</li>
          <li>YYYY/MM/DD HH:mm:ss</li>
          <li>YYYY-MM-DD</li>
          <li>ISO 8601 格式</li>
        </ul>
      </Card>
    </div>
  );
};

export default Timestamp;
