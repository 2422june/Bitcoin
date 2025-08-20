import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-card-bg border-t border-border-color mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 로고 및 설명 */}
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-bitcoin-gold rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-2xl">₿</span>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-gray-300">
                수준 높은 AI 기술을 통해 여러분을 달로 초대하는 세계 최고의 비트코인 예측 서비스입니다.
              </p>
            </div>
          </div>

          {/* 저작권 및 면책 조항 */}
          <div className="space-y-4">
            <p className="text-gray-400 text-sm">
              © 2025 Logo. All Rights Reserved.
            </p>
            <div className="text-xs text-gray-500 leading-relaxed">
              <p className="mb-2">
                본 웹사이트에서 제공하는 정보는 정보 제공 목적으로만 제공되며, 재무적 조언이나 법적 조언을 대체하지 않습니다. 
                투자 결정을 내리기 전에 항상 자체 연구를 수행하고 필요시 전문가와 상담하시기 바랍니다.
              </p>
              <p>
                암호화폐 거래는 높은 위험을 수반하며, 투자한 자본의 일부 또는 전체를 잃을 수 있습니다. 
                과거 성과가 미래 결과를 보장하지 않습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

