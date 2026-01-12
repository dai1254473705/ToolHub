/**
 * SEO 组件 - 使用 react-helmet-async 管理 Meta 标签
 */
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noindex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image = '/og-image.png',
  url = window.location.href,
  type = 'website',
  noindex = false,
}) => {
  const { t } = useTranslation();
  const siteTitle = t('app.name');
  const siteDescription = t('app.description');
  const fullTitle = title ? `${title} - ${siteTitle}` : siteTitle;
  const finalDescription = description || siteDescription;

  // 默认关键词
  const defaultKeywords = '开发工具,在线工具,JSON工具,Base64,UUID,二维码,正则表达式,时间戳,颜色转换';
  const finalKeywords = keywords || defaultKeywords;

  return (
    <Helmet>
      {/* 基础 Meta 标签 */}
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="zh_CN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={image} />

      {/* 额外的 SEO 标签 */}
      <meta name="theme-color" content="#1890ff" />
      <meta name="msapplication-TileColor" content="#1890ff" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
