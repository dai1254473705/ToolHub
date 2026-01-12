/**
 * 语言切换组件
 */
import React from 'react';
import { Dropdown, Button } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const languages = [
    { key: 'zh-CN', label: '简体中文', icon: '🇨🇳' },
    { key: 'en-US', label: 'English', icon: '🇺🇸' },
  ];

  const currentLanguage = languages.find((lang) => lang.key === i18n.language) || languages[0];

  const handleLanguageChange = (langKey: string) => {
    i18n.changeLanguage(langKey);
    // 更新 HTML lang 属性
    document.documentElement.lang = langKey;
  };

  const items = languages.map((lang) => ({
    key: lang.key,
    label: (
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 8 }}
        onClick={() => handleLanguageChange(lang.key)}
      >
        <span>{lang.icon}</span>
        <span>{lang.label}</span>
      </div>
    ),
  }));

  return (
    <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
      <Button type="text" className="language-switcher">
        <GlobalOutlined />
        <span style={{ marginLeft: 4 }}>{currentLanguage.icon}</span>
      </Button>
    </Dropdown>
  );
};

export default LanguageSwitcher;
