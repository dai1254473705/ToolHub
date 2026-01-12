/**
 * 首页组件
 */
import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Input, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES } from '@/constants/categories';
import { searchTools, getHotTools, getNewTools } from '@/constants/tools';
import CategorySection from '@/components/CategorySection';
import ToolCard from '@/components/ToolCard';
import './index.less';

const { Title, Paragraph } = Typography;
const { Search } = Input;

const Home: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [searchValue, setSearchValue] = useState(searchQuery);
  const [searchResults, setSearchResults] = useState(searchQuery ? searchTools(searchQuery) : []);

  useEffect(() => {
    if (searchQuery) {
      setSearchValue(searchQuery);
      setSearchResults(searchTools(searchQuery));
    } else {
      setSearchValue('');
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    if (value.trim()) {
      setSearchResults(searchTools(value.trim()));
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <Title level={1} className="hero-title">
            ⚡ ToolHub
          </Title>
          <Paragraph className="hero-description">
            全功能在线开发工具集合，为开发者和数据处理人员提供便捷服务
          </Paragraph>
          <Search
            placeholder="搜索工具..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            className="hero-search"
            style={{ width: '100%', maxWidth: 600 }}
          />
        </div>
      </div>

      {/* 搜索结果 */}
      {searchValue && searchResults.length > 0 && (
        <div className="search-results-section">
          <Title level={2}>搜索结果 ({searchResults.length})</Title>
          <Row gutter={[16, 16]}>
            {searchResults.map((tool) => (
              <Col xs={24} sm={12} md={8} lg={6} xl={4} key={tool.id}>
                <ToolCard tool={tool} />
              </Col>
            ))}
          </Row>
        </div>
      )}

      {/* 无搜索结果 */}
      {searchValue && searchResults.length === 0 && (
        <div className="search-results-section">
          <Empty
            description="未找到相关工具"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </div>
      )}

      {/* 无搜索时显示所有分类 */}
      {!searchValue && (
        <>
          {/* 热门工具 */}
          <div className="hot-tools-section">
            <Title level={2} className="section-title">
              🔥 热门工具
            </Title>
            <Row gutter={[16, 16]}>
              {getHotTools().map((tool) => (
                <Col xs={24} sm={12} md={8} lg={6} xl={4} key={tool.id}>
                  <ToolCard tool={tool} />
                </Col>
              ))}
            </Row>
          </div>

          {/* 最新工具 */}
          {getNewTools().length > 0 && (
            <div className="new-tools-section">
              <Title level={2} className="section-title">
                ✨ 最新工具
              </Title>
              <Row gutter={[16, 16]}>
                {getNewTools().map((tool) => (
                  <Col xs={24} sm={12} md={8} lg={6} xl={4} key={tool.id}>
                    <ToolCard tool={tool} />
                  </Col>
                ))}
              </Row>
            </div>
          )}

          {/* 所有分类 */}
          <div className="all-categories-section">
            <Title level={2} className="section-title">
              📂 所有工具分类
            </Title>
            {CATEGORIES.map((category) => (
              <CategorySection key={category.id} category={category} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;