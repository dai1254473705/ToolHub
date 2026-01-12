/**
 * 统计组件 - 集成 Google Analytics 和百度统计
 */
import React, { useEffect } from 'react';

interface AnalyticsProps {
  googleAnalyticsId?: string;
  baiduAnalyticsId?: string;
}

const Analytics: React.FC<AnalyticsProps> = ({
  googleAnalyticsId = '',
  baiduAnalyticsId = '',
}) => {
  useEffect(() => {
    // Google Analytics
    if (googleAnalyticsId) {
      // Google Analytics 4
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${googleAnalyticsId}');
      `;
      document.head.appendChild(script2);
    }

    // 百度统计
    if (baiduAnalyticsId) {
      const script = document.createElement('script');
      script.innerHTML = `
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?${baiduAnalyticsId}";
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(hm, s);
        })();
      `;
      document.head.appendChild(script);
    }
  }, [googleAnalyticsId, baiduAnalyticsId]);

  return null;
};

export default Analytics;
