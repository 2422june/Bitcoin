import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-border-color mt-12" style={{ backgroundColor: 'rgba(67,67,67,0.34)' }}>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-[1420px] mx-auto overflow-hidden">

          {/* 아이콘 + 소개 문구 */}
          <div className="flex items-start space-x-3 mb-8">
            <img src="/bitcoin-icon.svg" alt="Bitcoin" className="w-12 h-12 object-contain mt-1" />
            <p className="text-[16px] font-bold leading-relaxed text-gray-300">
              수준 높은 AI 기술을 통해
            <br></br>
              여러분을 달로 초대하는 세계 최고의 비트코인 예측 서비스입니다.
            </p>
          </div>
          <div className="h-12"></div>

          {/* 저작권 */}
          <p className="text-gray-400 text-sm mb-4">© 2025 Logo. All Rights Reserved.</p>

          {/* 면책 조항 */}
          <p className="text-xs text-gray-500 leading-relaxed">
            본 웹사이트의 정보는 귀하에게 정보제공만을 목적으로 제공합니다. 그러므로 콘텐츠에 어떠한 것도 보증하지 않습니다(정확성 및 최신성을 포함하되 이에 국한되지 않음). 제공한 콘텐츠의 어떤 부분도 귀하가 어떤 목적 또는 특정하게 의존할 수 있는 재무적 조언, 법적 조언 또는 기타 모든 형태의 조언을 구성하지 않습니다. 당사 콘텐츠에 의존하는 것은 귀하 자신의 판단에 의한 선택이며, 귀하는 당사의 콘텐츠에 의존하기 전에 스스로 조사, 검토, 분석, 검증을 수행해야 합니다. 거래는 큰 손실이 발생할 수 있는 위험한 활동입니다. 따라서 결정을 내리기 전에 본인의 재무 관리자와 상담하세요. 당사 사이트의 모든 콘텐츠는 권유 또는 제안을 위한 것이 아닙니다.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
