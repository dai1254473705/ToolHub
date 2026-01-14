/**
 * 首页组件
 */
import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CATEGORIES } from '@/constants/categories';
import { searchTools, getHotTools, getNewTools } from '@/constants/tools';
import CategorySection from '@/components/CategorySection';
import ToolCard from '@/components/ToolCard';
import SEO from '@/components/SEO';
// import AdBanner from '@/components/AdBanner'; // 暂时屏蔽广告位
import './index.less';

const { Title } = Typography;

const Home: React.FC = () => {
  const { t } = useTranslation();
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
    <>
      <SEO />
      <div className="home-page">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 text-white py-20 px-6 sm:px-12 text-center shadow-2xl mx-4 sm:mx-0 mt-6 mb-12">
          {/* 背景装饰 */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute bottom-[-30%] left-[-10%] w-[400px] h-[400px] rounded-full bg-purple-500/20 blur-3xl"></div>
            <div className="absolute top-[20%] left-[20%] w-[100px] h-[100px] rounded-full bg-indigo-400/20 blur-2xl animate-pulse"></div>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-lg font-sans">
              ⚡ {t('app.name')}
            </h1>
            <p className="text-lg sm:text-xl text-indigo-100 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              {t('app.description')}
            </p>
            <div className="max-w-2xl mx-auto p-1 rounded-2xl backdrop-blur-sm shadow-2xl relative group">
              {/* 光晕效果 */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
              
              <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-xl overflow-hidden p-1.5 h-16">
                 <SearchOutlined className="text-gray-400 text-xl ml-4 mr-3" />
                 <input 
                   type="text" 
                   className="flex-1 h-full bg-transparent border-none outline-none text-lg text-gray-800 dark:text-gray-100 placeholder-gray-400"
                   placeholder={t('common.search')}
                   value={searchValue}
                   onChange={(e) => handleSearch(e.target.value)}
                 />
                 {searchValue && (
                   <button 
                     onClick={() => handleSearch('')}
                     className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 mr-2 transition-colors"
                   >
                     <span className="text-lg">×</span>
                   </button>
                 )}
                 <button className="h-full px-8 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center">
                    {t('common.search')}
                 </button>
              </div>
            </div>
          </div>
        </div>

        {/* 广告位 - 暂时屏蔽 */}
        {/* <AdBanner type="horizontal" /> */}

        {/* 搜索结果 */}
        {searchValue && searchResults.length > 0 && (
          <div className="search-results-section">
            <Title level={2}>{t('common.search')} ({searchResults.length})</Title>
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
              description={t('common.noResults')}
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
                🔥 {t('common.hot')}
              </Title>
              <Row gutter={[16, 16]}>
                {getHotTools().map((tool) => (
                  <Col xs={24} sm={12} md={8} lg={6} xl={4} key={tool.id}>
                    <ToolCard tool={tool} />
                  </Col>
                ))}
              </Row>
            </div>

            {/* 广告位 - 暂时屏蔽 */}
            {/* <AdBanner type="horizontal" /> */}

            {/* 最新工具 */}
            {getNewTools().length > 0 && (
              <div className="new-tools-section">
                <Title level={2} className="section-title">
                  ✨ {t('common.new')}
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
                📂 {t('common.allTools')}
              </Title>
              {CATEGORIES.map((category) => (
                <CategorySection key={category.id} category={category} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;