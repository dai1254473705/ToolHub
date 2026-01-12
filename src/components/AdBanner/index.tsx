/**
 * 广告位组件
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import './AdBanner.less';

interface AdBannerProps {
  type?: 'horizontal' | 'vertical' | 'square';
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ type = 'horizontal', className = '' }) => {
  const { t } = useTranslation();

  return (
    <div className={`ad-banner ad-banner-${type} ${className}`}>
      <div className="ad-placeholder">
        <div className="ad-content">
          <div className="ad-icon">📢</div>
          <div className="ad-text">
            <div className="ad-title">{t('common.adSpace') || '广告位'}</div>
            <div className="ad-desc">
              {type === 'horizontal' && '横幅广告 728x90'}
              {type === 'vertical' && '侧边栏广告 300x250'}
              {type === 'square' && '方形广告 300x300'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
