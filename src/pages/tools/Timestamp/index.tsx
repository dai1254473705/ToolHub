/**
 * 时间戳转换工具
 */
import React, { useState } from 'react';
import { Card, Row, Col, Typography, Input, Button, message, Radio, Space } from 'antd';
import { CopyOutlined, SyncOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useTranslation } from 'react-i18next';

dayjs.extend(utc);
import './index.less';

const { Title, Text } = Typography;

const Timestamp: React.FC = () => {
  const { t } = useTranslation();
  const [timestamp, setTimestamp] = useState('');
  const [datetime, setDatetime] = useState('');
  const [unit, setUnit] = useState<'s' | 'ms'>('ms');

  // 时间戳转日期
  const handleTimestampToDate = () => {
    if (!timestamp.trim()) {
      message.warning(t('tools.timestamp.messages.inputTimestamp'));
      return;
    }

    const ts = parseInt(timestamp.trim());
    if (isNaN(ts)) {
      message.error(t('tools.timestamp.messages.invalidTimestamp'));
      return;
    }

    try {
      // 根据单位转换
      const milliseconds = unit === 's' ? ts * 1000 : ts;
      const date = dayjs(milliseconds);
      setDatetime(date.format('YYYY-MM-DD HH:mm:ss'));
      message.success(t('tools.timestamp.messages.success'));
    } catch {
      message.error(t('tools.timestamp.messages.errorTimestamp'));
    }
  };

  // 日期转时间戳
  const handleDateToTimestamp = () => {
    if (!datetime.trim()) {
      message.warning(t('tools.timestamp.messages.inputDatetime'));
      return;
    }

    try {
      const date = dayjs(datetime);
      if (!date.isValid()) {
        message.error(t('tools.timestamp.messages.invalidDatetime'));
        return;
      }

      const ts = unit === 's' ? date.unix() : date.valueOf();
      setTimestamp(ts.toString());
      message.success(t('tools.timestamp.messages.success'));
    } catch {
      message.error(t('tools.timestamp.messages.errorDatetime'));
    }
  };

  // 设置为当前时间
  const handleSetCurrentTime = () => {
    const now = dayjs();
    const ts = unit === 's' ? now.unix() : now.valueOf();
    setTimestamp(ts.toString());
    setDatetime(now.format('YYYY-MM-DD HH:mm:ss'));
  };

  // 复制时间戳
  const handleCopyTimestamp = () => {
    if (!timestamp) {
      message.warning(t('tools.timestamp.messages.copyEmpty'));
      return;
    }
    navigator.clipboard.writeText(timestamp).then(() => {
      message.success(t('tools.timestamp.messages.copySuccess'));
    });
  };

  // 复制日期时间
  const handleCopyDatetime = () => {
    if (!datetime) {
      message.warning(t('tools.timestamp.messages.copyEmpty'));
      return;
    }
    navigator.clipboard.writeText(datetime).then(() => {
      message.success(t('tools.timestamp.messages.copySuccess'));
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
      <Title level={2}>{t('tools.timestamp.title')}</Title>
      <Text type="secondary">{t('tools.timestamp.description')}</Text>

      {/* 当前时间显示 */}
      <Card className="current-time-card" bordered={false}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text type="secondary">{t('tools.timestamp.current.ms')}</Text>
            <div className="time-value">{formats.timestamp}</div>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text type="secondary">{t('tools.timestamp.current.s')}</Text>
            <div className="time-value">{formats.unix}</div>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text type="secondary">{t('tools.timestamp.current.datetime')}</Text>
            <div className="time-value">{dayjs().format('YYYY-MM-DD HH:mm:ss')}</div>
          </Col>
        </Row>
        <Button icon={<SyncOutlined />} onClick={handleSetCurrentTime} style={{ marginTop: 16 }}>
          {t('tools.timestamp.current.use')}
        </Button>
      </Card>

      {/* 转换工具 */}
      <Card className="tool-card" bordered={false}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* 单位选择 */}
          <div>
            <Text strong>{t('tools.timestamp.unit.label')}</Text>
            <Radio.Group value={unit} onChange={(e) => setUnit(e.target.value)} style={{ marginLeft: 16 }}>
              <Radio value="ms">{t('tools.timestamp.unit.ms')}</Radio>
              <Radio value="s">{t('tools.timestamp.unit.s')}</Radio>
            </Radio.Group>
          </div>

          {/* 时间戳转日期 */}
          <div className="convert-section">
            <Title level={4}>{t('tools.timestamp.toDatetime.title')}</Title>
            <Input
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              placeholder={unit === 'ms' ? t('tools.timestamp.toDatetime.placeholder.ms') : t('tools.timestamp.toDatetime.placeholder.s')}
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
              {t('tools.timestamp.toDatetime.button')}
            </Button>
          </div>

          {/* 日期转时间戳 */}
          <div className="convert-section">
            <Title level={4}>{t('tools.timestamp.toTimestamp.title')}</Title>
            <Input
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
              placeholder={t('tools.timestamp.toTimestamp.placeholder')}
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
              {t('tools.timestamp.toTimestamp.button')}
            </Button>
          </div>
        </Space>
      </Card>

      {/* 使用说明 */}
      <Card className="info-card" bordered={false}>
        <Title level={4}>{t('tools.timestamp.info.what.title')}</Title>
        <Text>
          {t('tools.timestamp.info.what.content')}
        </Text>
        <Title level={4} style={{ marginTop: 16 }}>
          {t('tools.timestamp.info.formats.title')}
        </Title>
        <ul>
          <li>{t('tools.timestamp.info.formats.list.0')}</li>
          <li>{t('tools.timestamp.info.formats.list.1')}</li>
          <li>{t('tools.timestamp.info.formats.list.2')}</li>
          <li>{t('tools.timestamp.info.formats.list.3')}</li>
        </ul>
        <Title level={4} style={{ marginTop: 16 }}>
          {t('tools.timestamp.info.supported.title')}
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
