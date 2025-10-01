import React, { useState, useEffect } from 'react';
import { Typography, Tabs, Card, Input, Button, Space, message, Slider } from 'antd';
import { CopyOutlined, RedoOutlined, ClockCircleOutlined, CodeOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import './index.css';

const { Title } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;

// 颜色转换工具组件
const ColorConverter: React.FC = () => {
  const [hex, setHex] = useState<string>('#1890ff');
  const [rgb, setRgb] = useState<{ r: number; g: number; b: number }>({ r: 24, g: 144, b: 255 });
  const [hsl, setHsl] = useState<{ h: number; s: number; l: number }>({ h: 210, s: 95, l: 55 });
  const [isInputHex, setIsInputHex] = useState<boolean>(true);
  const [isInputRgb, setIsInputRgb] = useState<boolean>(false);
  const [isInputHsl, setIsInputHsl] = useState<boolean>(false);

  // HEX转RGB
  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  // RGB转HSL
  const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  // HSL转RGB
  const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
    h /= 360;
    s /= 100;
    l /= 100;
    let r: number, g: number, b: number;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number): number => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  };

  // RGB转HEX
  const rgbToHex = (r: number, g: number, b: number): string => {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
  };

  // HEX输入变化
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^#?([a-f\d]{3}|[a-f\d]{6})$/i.test(value)) {
      setHex(value);
      if (isInputHex) {
        const newRgb = hexToRgb(value);
        setRgb(newRgb);
        setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
        setIsInputRgb(false);
        setIsInputHsl(false);
      }
    }
  };

  // RGB输入变化
  const handleRgbChange = (type: 'r' | 'g' | 'b', value: number) => {
    const newRgb = { ...rgb, [type]: value };
    setRgb(newRgb);
    if (isInputRgb) {
      setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
      setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
      setIsInputHex(false);
      setIsInputHsl(false);
    }
  };

  // HSL输入变化
  const handleHslChange = (type: 'h' | 's' | 'l', value: number) => {
    const newHsl = { ...hsl, [type]: value };
    setHsl(newHsl);
    if (isInputHsl) {
      const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
      setRgb(newRgb);
      setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
      setIsInputHex(false);
      setIsInputRgb(false);
    }
  };

  // 复制颜色值
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      message.success('已复制到剪贴板');
    });
  };

  // 监听输入焦点
  useEffect(() => {
    const handleHexFocus = () => setIsInputHex(true);
    const handleRgbFocus = () => setIsInputRgb(true);
    const handleHslFocus = () => setIsInputHsl(true);

    const hexInput = document.getElementById('hex-input');
    const rgbInputR = document.getElementById('rgb-input-r');
    const rgbInputG = document.getElementById('rgb-input-g');
    const rgbInputB = document.getElementById('rgb-input-b');
    const hslInputH = document.getElementById('hsl-input-h');
    const hslInputS = document.getElementById('hsl-input-s');
    const hslInputL = document.getElementById('hsl-input-l');

    if (hexInput) hexInput.addEventListener('focus', handleHexFocus);
    if (rgbInputR) rgbInputR.addEventListener('focus', handleRgbFocus);
    if (rgbInputG) rgbInputG.addEventListener('focus', handleRgbFocus);
    if (rgbInputB) rgbInputB.addEventListener('focus', handleRgbFocus);
    if (hslInputH) hslInputH.addEventListener('focus', handleHslFocus);
    if (hslInputS) hslInputS.addEventListener('focus', handleHslFocus);
    if (hslInputL) hslInputL.addEventListener('focus', handleHslFocus);

    return () => {
      if (hexInput) hexInput.removeEventListener('focus', handleHexFocus);
      if (rgbInputR) rgbInputR.removeEventListener('focus', handleRgbFocus);
      if (rgbInputG) rgbInputG.removeEventListener('focus', handleRgbFocus);
      if (rgbInputB) rgbInputB.removeEventListener('focus', handleRgbFocus);
      if (hslInputH) hslInputH.removeEventListener('focus', handleHslFocus);
      if (hslInputS) hslInputS.removeEventListener('focus', handleHslFocus);
      if (hslInputL) hslInputL.removeEventListener('focus', handleHslFocus);
    };
  }, []);

  return (
    <div className="color-converter-container">
      <div className="color-preview" style={{ backgroundColor: hex }}></div>
      <div className="color-inputs">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Space style={{ width: '100%' }}>
            <Input 
              id="hex-input"
              value={hex}
              onChange={handleHexChange}
              placeholder="#1890ff"
              style={{ flex: 1 }}
            />
            <Button icon={<CopyOutlined />} onClick={() => copyToClipboard(hex)}>
              复制
            </Button>
          </Space>
          <Space style={{ width: '100%' }}>
            <Input 
              id="rgb-input-r"
              type="number"
              min={0}
              max={255}
              value={rgb.r}
              onChange={(e) => handleRgbChange('r', parseInt(e.target.value) || 0)}
              placeholder="R"
              style={{ width: '80px' }}
            />
            <Slider 
              min={0}
              max={255}
              value={rgb.r}
              onChange={(value) => handleRgbChange('r', value)}
              style={{ flex: 1 }}
            />
          </Space>
          <Space style={{ width: '100%' }}>
            <Input 
              id="rgb-input-g"
              type="number"
              min={0}
              max={255}
              value={rgb.g}
              onChange={(e) => handleRgbChange('g', parseInt(e.target.value) || 0)}
              placeholder="G"
              style={{ width: '80px' }}
            />
            <Slider 
              min={0}
              max={255}
              value={rgb.g}
              onChange={(value) => handleRgbChange('g', value)}
              style={{ flex: 1 }}
            />
          </Space>
          <Space style={{ width: '100%' }}>
            <Input 
              id="rgb-input-b"
              type="number"
              min={0}
              max={255}
              value={rgb.b}
              onChange={(e) => handleRgbChange('b', parseInt(e.target.value) || 0)}
              placeholder="B"
              style={{ width: '80px' }}
            />
            <Slider 
              min={0}
              max={255}
              value={rgb.b}
              onChange={(value) => handleRgbChange('b', value)}
              style={{ flex: 1 }}
            />
          </Space>
          <Space style={{ width: '100%' }}>
            <Input 
              id="hsl-input-h"
              type="number"
              min={0}
              max={360}
              value={hsl.h}
              onChange={(e) => handleHslChange('h', parseInt(e.target.value) || 0)}
              placeholder="H"
              style={{ width: '80px' }}
            />
            <Slider 
              min={0}
              max={360}
              value={hsl.h}
              onChange={(value) => handleHslChange('h', value)}
              style={{ flex: 1 }}
            />
          </Space>
          <Space style={{ width: '100%' }}>
            <Input 
              id="hsl-input-s"
              type="number"
              min={0}
              max={100}
              value={hsl.s}
              onChange={(e) => handleHslChange('s', parseInt(e.target.value) || 0)}
              placeholder="S"
              style={{ width: '80px' }}
            />
            <Slider 
              min={0}
              max={100}
              value={hsl.s}
              onChange={(value) => handleHslChange('s', value)}
              style={{ flex: 1 }}
            />
          </Space>
          <Space style={{ width: '100%' }}>
            <Input 
              id="hsl-input-l"
              type="number"
              min={0}
              max={100}
              value={hsl.l}
              onChange={(e) => handleHslChange('l', parseInt(e.target.value) || 0)}
              placeholder="L"
              style={{ width: '80px' }}
            />
            <Slider 
              min={0}
              max={100}
              value={hsl.l}
              onChange={(value) => handleHslChange('l', value)}
              style={{ flex: 1 }}
            />
          </Space>
        </Space>
      </div>
    </div>
  );
};

// 时间戳转换工具组件
const TimestampConverter: React.FC = () => {
  const [timestamp, setTimestamp] = useState<string>(Date.now().toString());
  const [dateTime, setDateTime] = useState<string>(new Date().toLocaleString());
  const [useSeconds, setUseSeconds] = useState<boolean>(false);
  const [isInputTimestamp, setIsInputTimestamp] = useState<boolean>(true);

  // 转换时间戳到日期时间
  const timestampToDateTime = (ts: string): string => {
    const numTs = parseInt(ts);
    if (isNaN(numTs)) return '无效的时间戳';
    const date = new Date(useSeconds ? numTs * 1000 : numTs);
    return date.toLocaleString();
  };

  // 转换日期时间到时间戳
  const dateTimeToTimestamp = (dt: string): string => {
    try {
      const date = new Date(dt);
      return (useSeconds ? Math.floor(date.getTime() / 1000) : date.getTime()).toString();
    } catch {
      return '无效的日期时间';
    }
  };

  // 时间戳输入变化
  const handleTimestampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimestamp(e.target.value);
  };

  // 日期时间输入变化
  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateTime(e.target.value);
  };

  // 执行转换
  const handleConvert = () => {
    if (isInputTimestamp) {
      setDateTime(timestampToDateTime(timestamp));
    } else {
      setTimestamp(dateTimeToTimestamp(dateTime));
    }
  };

  // 切换输入类型
  const toggleInputType = () => {
    setIsInputTimestamp(!isInputTimestamp);
  };

  // 切换秒/毫秒
  const toggleSeconds = () => {
    setUseSeconds(!useSeconds);
  };

  // 复制结果
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      message.success('已复制到剪贴板');
    });
  };

  // 生成当前时间戳
  const generateCurrentTimestamp = () => {
    const now = Date.now();
    setTimestamp(useSeconds ? Math.floor(now / 1000).toString() : now.toString());
    setDateTime(new Date(now).toLocaleString());
    setIsInputTimestamp(true);
  };

  return (
    <div className="timestamp-converter-container">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Space>
            <Button 
              type="primary"
              onClick={handleConvert}
              icon={<CodeOutlined />}
            >
              转换
            </Button>
            <Button 
              onClick={toggleInputType}
              icon={<RedoOutlined />}
            >
              切换
            </Button>
            <Button 
              onClick={generateCurrentTimestamp}
              icon={<ClockCircleOutlined />}
            >
              当前时间
            </Button>
          </Space>
          <Space>
            <Button 
              onClick={toggleSeconds}
              type={useSeconds ? "primary" : "default"}
            >
              {useSeconds ? '秒级' : '毫秒级'}
            </Button>
          </Space>
        </Space>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input 
            value={timestamp}
            onChange={handleTimestampChange}
            placeholder={useSeconds ? "输入秒级时间戳" : "输入毫秒级时间戳"}
            disabled={!isInputTimestamp}
            prefix={isInputTimestamp ? <span style={{ color: '#1890ff' }}>*</span> : null}
          />
          <Input 
            value={dateTime}
            onChange={handleDateTimeChange}
            placeholder="输入日期时间"
            disabled={isInputTimestamp}
            prefix={!isInputTimestamp ? <span style={{ color: '#1890ff' }}>*</span> : null}
          />
          <Button 
            onClick={() => copyToClipboard(dateTime)}
            icon={<CopyOutlined />}
          >
            复制结果
          </Button>
        </Space>
      </Space>
    </div>
  );
};

// Base64编解码工具组件
const Base64Converter: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isEncode, setIsEncode] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // 编码
  const encodeBase64 = (text: string): string => {
    try {
      return btoa(unescape(encodeURIComponent(text)));
    } catch {
      return '编码失败';
    }
  };

  // 解码
  const decodeBase64 = (text: string): string => {
    try {
      return decodeURIComponent(escape(atob(text)));
    } catch {
      return '解码失败';
    }
  };

  // 执行转换
  const handleConvert = () => {
    if (!input.trim()) {
      message.warning('请输入内容');
      return;
    }

    if (isEncode) {
      setOutput(encodeBase64(input));
    } else {
      setOutput(decodeBase64(input));
    }
  };

  // 切换编码/解码
  const toggleEncodeDecode = () => {
    setIsEncode(!isEncode);
    setInput('');
    setOutput('');
  };

  // 复制结果
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      message.success('已复制到剪贴板');
    });
  };

  // 清除输入
  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  return (
    <div className="base64-converter-container">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Space>
            <Button 
              type="primary"
              onClick={handleConvert}
              icon={<CodeOutlined />}
            >
              {isEncode ? '编码' : '解码'}
            </Button>
            <Button 
              onClick={toggleEncodeDecode}
              icon={<RedoOutlined />}
            >
              切换
            </Button>
            <Button 
              onClick={handleClear}
            >
              清除
            </Button>
          </Space>
          <Button 
            type="text"
            icon={showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '隐藏' : '显示'}
          </Button>
        </Space>
        <TextArea 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isEncode ? "输入要编码的文本" : "输入要解码的Base64字符串"}
          rows={4}
        />
        <TextArea 
          value={output}
          readOnly
          placeholder={isEncode ? "Base64编码结果" : "解码结果"}
          rows={4}
          type={showPassword ? "text" : "password"}
        />
        <Button 
          onClick={() => copyToClipboard(output)}
          icon={<CopyOutlined />}
          disabled={!output}
        >
          复制结果
        </Button>
      </Space>
    </div>
  );
};

// JSON格式化工具组件
const JSONFormatter: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isValidJson, setIsValidJson] = useState<boolean | null>(null);

  // 格式化JSON
  const handleFormat = () => {
    if (!input.trim()) {
      message.warning('请输入JSON内容');
      return;
    }

    try {
      const parsedJson = JSON.parse(input);
      const formatted = JSON.stringify(parsedJson, null, 2);
      setOutput(formatted);
      setIsValidJson(true);
      message.success('JSON格式化成功');
    } catch (error) {
      setIsValidJson(false);
      message.error(`JSON解析错误: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  };

  // 压缩JSON
  const handleMinify = () => {
    if (!input.trim()) {
      message.warning('请输入JSON内容');
      return;
    }

    try {
      const parsedJson = JSON.parse(input);
      const minified = JSON.stringify(parsedJson);
      setOutput(minified);
      setIsValidJson(true);
      message.success('JSON压缩成功');
    } catch (error) {
      setIsValidJson(false);
      message.error(`JSON解析错误: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  };

  // 复制结果
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      message.success('已复制到剪贴板');
    });
  };

  // 清除输入
  const handleClear = () => {
    setInput('');
    setOutput('');
    setIsValidJson(null);
  };

  return (
    <div className="json-formatter-container">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
          <Button 
            type="primary"
            onClick={handleFormat}
            icon={<CodeOutlined />}
          >
            格式化
          </Button>
          <Button 
            onClick={handleMinify}
          >
            压缩
          </Button>
          <Button 
            onClick={handleClear}
          >
            清除
          </Button>
        </Space>
        <TextArea 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="请输入JSON内容"
          rows={5}
          className={isValidJson === false ? 'error-input' : ''}
        />
        {isValidJson === false && (
          <div className="error-message">
            JSON格式错误，请检查输入内容
          </div>
        )}
        <TextArea 
          value={output}
          readOnly
          placeholder="格式化后的JSON结果"
          rows={5}
          className="monospace"
        />
        <Button 
          onClick={() => copyToClipboard(output)}
          icon={<CopyOutlined />}
          disabled={!output}
        >
          复制结果
        </Button>
      </Space>
    </div>
  );
};

// 主开发工具组件
const DevTools: React.FC = () => {
  return (
    <div className="dev-tools-container">
      <Title level={2}>开发辅助工具</Title>
      <div className="text-gray-500">开发辅助工具集合，包括颜色转换、时间戳转换等功能</div>
      
      <div className="dev-tools-tabs">
        <Tabs defaultActiveKey="1" size="large">
          <TabPane tab="颜色转换" key="1">
            <Card title="颜色格式转换工具">
              <ColorConverter />
            </Card>
          </TabPane>
          <TabPane tab="时间戳转换" key="2">
            <Card title="时间戳与日期时间转换工具">
              <TimestampConverter />
            </Card>
          </TabPane>
          <TabPane tab="Base64编解码" key="3">
            <Card title="Base64编码解码工具">
              <Base64Converter />
            </Card>
          </TabPane>
          <TabPane tab="JSON格式化" key="4">
            <Card title="JSON格式化与压缩工具">
              <JSONFormatter />
            </Card>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default DevTools;