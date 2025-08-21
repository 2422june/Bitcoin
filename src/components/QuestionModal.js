import React, { useEffect, useState } from 'react';

const QuestionModal = ({ isOpen, onClose, question, answer }) => {
  // 질문별 답변 내용
  const getAnswerContent = (questionText) => {
    switch (questionText) {
             case '비트코인 관련 최신 이슈 알려줘':
         return (
           <div className="space-y-6">
             <h3 className="text-lg font-semibold mb-4">주요 이슈 요약</h3>
             
             <div className="space-y-4">
               <div>
                 <h4 className="font-semibold text-purple-300 mb-2">1. 사상 최고가 경신과 이후 조정</h4>
                 <p className="text-sm leading-relaxed mb-2">
                   비트코인은 최근 연방준비제도(Fed)의 금리 인하 기대, 기관 투자 증가, 규제 완화 등에 힘입어 124,000달러라는 사상 최고치를 기록했습니다. 다만 이후 118,000달러 수준으로 약 4% 하락했으며, 이는 인플레이션 지표에 대한 우려 때문으로 분석됩니다.
                 </p>
                 <div className="text-xs text-gray-400">
                   Reuters | Financial Times
                 </div>
               </div>

               <div>
                 <h4 className="font-semibold text-purple-300 mb-2">2. 시장 반등과 투자심리 변화</h4>
                 <p className="text-sm leading-relaxed mb-2">
                   8월 21일 기준 비트코인은 113,000달러 아래로 하락했다가 다시 114,000달러 선으로 상승했습니다. 이는 시장 전반의 혼조 흐름 속에서 일시적 회복세로 해석됩니다.
                 </p>
                 <div className="text-xs text-gray-400">
                   TradingView
                 </div>
               </div>

               <div>
                 <h4 className="font-semibold text-purple-300 mb-2">3. 레버리지 청산과 단기 가격 변동성</h4>
                 <p className="text-sm leading-relaxed mb-2">
                   최근 가격 하락은 레버리지 청산이 주요 원인으로, 23억 달러 상당의 오픈 포지션이 청산되면서 단기 급락이 발생했습니다. 하지만 일부 분석가는 이 하락이 일시적이며, 115,000달러 이상을 돌파하면 120,000달러 이상까지 상승 가능성이 있다고 봅니다.
                 </p>
                 <div className="text-xs text-gray-400">
                   BeInCrypto
                 </div>
               </div>

               <div>
                 <h4 className="font-semibold text-purple-300 mb-2">4. 메타플래닛(Metaplanet), 비트코인 매입 확대</h4>
                 <p className="text-sm leading-relaxed mb-2">
                   도쿄 상장사 Metaplanet이 <span className="font-semibold text-yellow-300">775 BTC(약 930억 엔)</span>를 추가 매입하며 보유량을 18,888 BTC로 늘렸습니다. 이 기업은 0% 금리 채권(18차 시리즈)을 발행해 비트코인 매입 자금을 마련하고 있으며, 스톡 매트릭스(MicroStrategy)를 눈여겨보는 다른 큰 투자자로 각광받고 있습니다.
                 </p>
                 <div className="text-xs text-gray-400">
                   AInvest | Cryptonews | Cryptopolitan | 분석 인사이트 | Cointelegraph
                 </div>
               </div>

               <div>
                 <h4 className="font-semibold text-purple-300 mb-2">5. 매매세력, 규제 리스크 및 시장 구조 분석</h4>
                 <p className="text-sm leading-relaxed mb-2">
                   일부 분석가들은 매도세가 강해지고 있으며, 비트코인 가격 하락은 <span className="font-semibold text-red-300">"조작 가능성(price manipulation)"</span>이라는 판단도 제기 중입니다. 연례 Fed 정책 이벤트(예: Jackson Hole 미팅)가 향후 가격 변동성을 키울 수 있다는 전망도 나옵니다.
                 </p>
                 <div className="text-xs text-gray-400">
                   Cointelegraph
                 </div>
               </div>
             </div>
           </div>
         );
       case '요즘 비트코인의 변동 요인을 알려줘':
         return (
           <div className="space-y-6">
             <div className="flex items-center gap-2 mb-4">
               <span className="text-lg font-semibold">좋은 질문이에요 👍</span>
             </div>
             <p className="text-sm leading-relaxed mb-4">
               최근(2025년 8월 기준) 비트코인의 변동 요인은 크게 다섯 가지로 정리할 수 있습니다:
             </p>
             
             <div className="space-y-4">
               <div>
                 <h4 className="font-semibold text-purple-300 mb-2">🔑 비트코인 변동 요인</h4>
                 <h5 className="font-semibold text-blue-300 mb-2">1. 거시경제 요인 (Fed, 금리, 달러 가치)</h5>
                 <p className="text-sm leading-relaxed mb-2">
                   미국 연방준비제도(Fed)의 금리 정책이 가장 큰 영향을 미칩니다.
                 </p>
                 <ul className="text-sm leading-relaxed mb-2 space-y-1">
                   <li>• 금리 인하 기대 → 위험자산 선호 증가 → BTC 상승</li>
                   <li>• 금리 인상 가능성 또는 인플레이션 우려 → BTC 하락</li>
                 </ul>
                 <p className="text-sm leading-relaxed mb-2">
                   달러 인덱스(DXY) 변동과도 밀접하게 연결되어 있어, 달러가 약세일 때 BTC가 오르는 경향이 있습니다.
                 </p>
               </div>

               <div>
                 <h5 className="font-semibold text-blue-300 mb-2">2. 레버리지 및 파생상품 시장</h5>
                 <p className="text-sm leading-relaxed mb-2">
                   최근 하락세 중 수십억 달러 규모의 선물 포지션 청산이 발생했는데, 이런 강제 청산(liquidation)이 단기 급등·급락을 만듭니다.
                 </p>
                 <p className="text-sm leading-relaxed mb-2">
                   특히 레버리지 과도 사용 → 가격이 조금만 움직여도 연쇄 청산 발생 → 급격한 가격 변동.
                 </p>
               </div>

               <div>
                 <h5 className="font-semibold text-blue-300 mb-2">3. 기관 및 기업의 매수·매도</h5>
                 <p className="text-sm leading-relaxed mb-2">
                   MicroStrategy, Metaplanet 같은 기업이 대규모 BTC 매입을 이어가고 있음 → 수급 불균형으로 상승 요인.
                 </p>
                 <p className="text-sm leading-relaxed mb-2">
                   반대로 기관들이 차익 실현을 위해 일부 매도할 경우 단기 하락 압력 발생.
                 </p>
               </div>

               <div>
                 <h5 className="font-semibold text-blue-300 mb-2">4. 규제 및 정책 리스크</h5>
                 <p className="text-sm leading-relaxed mb-2">
                   미국 SEC의 ETF 승인/거절, 각국의 암호화폐 세제 정책, 자금세탁방지(AML) 규제 뉴스가 바로 가격 변동으로 이어짐.
                 </p>
                 <ul className="text-sm leading-relaxed mb-2 space-y-1">
                   <li>• 예를 들어, ETF 승인은 유입 자금 확대 기대 → 상승 요인.</li>
                   <li>• 세금 강화, 규제 강화 뉴스 → 투자심리 위축 → 하락 요인.</li>
                 </ul>
               </div>

               <div>
                 <h5 className="font-semibold text-blue-300 mb-2">5. 시장 심리 및 외부 이벤트</h5>
                 <p className="text-sm leading-relaxed mb-2">
                   "가격 조작 의혹" 같은 뉴스, 거래소 해킹, 주요 인플루언서 발언, 전쟁/지정학적 이벤트도 단기 급등락 요인.
                 </p>
                 <p className="text-sm leading-relaxed mb-2">
                   특히 크립토 시장은 심리 의존도가 높아, 공포·탐욕 지수(Fear & Greed Index) 변화가 직접적으로 반영됨.
                 </p>
               </div>
             </div>
           </div>
                  );
       case '비트코인 현재 중요한게 뭐가 있어?':
         return (
           <div className="space-y-6">
             <div className="flex items-center gap-2 mb-4">
               <span className="text-lg font-semibold">좋은 포인트 짚으셨어요 👍</span>
             </div>
             <p className="text-sm leading-relaxed mb-4">
               "비트코인에서 지금 당장 중요한 것"을 꼽자면, 단순히 가격이 아니라 지금 시장이 어디에 집중하고 있는가예요.
             </p>
             <p className="text-sm leading-relaxed mb-4">
               2025년 8월 기준으로 핵심 포인트를 정리하면:
             </p>
             
             <div className="space-y-4">
               <div>
                 <h4 className="font-semibold text-purple-300 mb-2">📌 현재 비트코인에서 중요한 이슈들</h4>
                 <h5 className="font-semibold text-blue-300 mb-2">1. 연준(Fed) 정책과 금리 인하 기대</h5>
                 <p className="text-sm leading-relaxed mb-2">
                   최근 비트코인 신고점($124K)을 만든 가장 큰 이유가 Fed 금리 인하 기대감이에요.
                 </p>
                 <p className="text-sm leading-relaxed mb-2">
                   만약 실제로 금리가 인하되면 → 더 많은 기관 자금이 유입될 수 있고, 반대로 물가 우려가 커지면 → 하락 압력.
                 </p>
                 <p className="text-sm leading-relaxed mb-2">
                   <span className="font-semibold text-green-300">👉 거시경제 이벤트(특히 Jackson Hole 미팅)가 BTC 변동성의 핵심.</span>
                 </p>
               </div>

               <div>
                 <h5 className="font-semibold text-blue-300 mb-2">2. 레버리지 청산과 변동성 확대</h5>
                 <p className="text-sm leading-relaxed mb-2">
                   최근 며칠간 수십억 달러 규모의 포지션이 청산되면서 급락이 있었죠.
                 </p>
                 <p className="text-sm leading-relaxed mb-2">
                   시장에선 "강제 청산이 끝났는지 여부"를 주시 중입니다.
                 </p>
                 <p className="text-sm leading-relaxed mb-2">
                   <span className="font-semibold text-green-300">👉 안정적인 상승세로 돌아서려면 레버리지 의존도 완화가 중요.</span>
                 </p>
               </div>

               <div>
                 <h5 className="font-semibold text-blue-300 mb-2">3. 기관 및 기업 매수 (특히 Metaplanet, MicroStrategy)</h5>
                 <p className="text-sm leading-relaxed mb-2">
                   도쿄 상장사 Metaplanet이 추가 매입하면서 보유량 18,888 BTC 확보.
                 </p>
                 <p className="text-sm leading-relaxed mb-2">
                   이런 흐름은 "기업이 국채 대신 BTC를 준비금으로 삼는 시대"를 보여줍니다.
                 </p>
                 <p className="text-sm leading-relaxed mb-2">
                   <span className="font-semibold text-green-300">👉 기관 매수세 유지 여부가 중장기 핵심.</span>
                 </p>
               </div>

               <div>
                 <h5 className="font-semibold text-blue-300 mb-2">4. ETF 및 규제</h5>
                 <p className="text-sm leading-relaxed mb-2">
                   미국과 유럽의 현물 ETF 거래량이 계속해서 신기록을 쓰고 있음.
                 </p>
                 <p className="text-sm leading-relaxed mb-2">
                   반대로 일부 국가는 세제 강화와 규제 논의로 투자심리에 제동을 걸고 있어요.
                 </p>
                 <p className="text-sm leading-relaxed mb-2">
                   <span className="font-semibold text-green-300">👉 ETF 자금 유입이 계속될지, 규제가 시장을 누를지가 관건.</span>
                 </p>
               </div>

               <div>
                 <h5 className="font-semibold text-blue-300 mb-2">5. 시장 신뢰와 조작 논란</h5>
                 <p className="text-sm leading-relaxed mb-2">
                   최근 "가격 조작 의혹"이 제기되며 투자자 신뢰가 흔들리는 중.
                 </p>
                 <p className="text-sm leading-relaxed mb-2">
                   해킹, 거래소 리스크 같은 신뢰도 문제가 불거지면 단기 급락 요인으로 작용.
                 </p>
               </div>

               <div className="bg-gray-700 p-4 rounded-lg">
                 <h5 className="font-semibold text-yellow-300 mb-2">✅ 지금 중요한 3가지를 꼽자면:</h5>
                 <ul className="text-sm leading-relaxed space-y-1">
                   <li>• Fed 금리 인하 기대 vs 인플레이션 불안</li>
                   <li>• 기관 매수세(Metaplanet, ETF, MicroStrategy)</li>
                   <li>• 레버리지 청산 이후 변동성 안정화 여부</li>
                 </ul>
               </div>
             </div>
           </div>
         );
       case '앞으로 코인이 하락할까?':
         return (
           <div className="space-y-6">
             <div className="flex items-center gap-2 mb-4">
               <span className="text-lg font-semibold">좋은 질문이에요 👍</span>
             </div>
             <p className="text-sm leading-relaxed mb-4">
               "앞으로 코인이(특히 비트코인) 하락할까?"라는 건 100% 단정은 불가능하지만, 현재 시장의 하락 가능성 요인 vs 상승 가능성 요인을 균형 있게 보는 게 중요합니다.
             </p>
             
             <div className="space-y-4">
               <div>
                 <h4 className="font-semibold text-red-300 mb-2">📉 하락 가능성 요인</h4>
                 
                 <div className="space-y-3">
                   <div>
                     <h5 className="font-semibold text-orange-300 mb-2">레버리지 청산 리스크</h5>
                     <p className="text-sm leading-relaxed mb-2">
                       최근 수십억 달러 규모 포지션 청산이 있었는데, 아직 과열 포지션이 남아 있다면 추가 하락이 나올 수 있음.
                     </p>
                   </div>

                   <div>
                     <h5 className="font-semibold text-orange-300 mb-2">거시경제 불확실성</h5>
                     <p className="text-sm leading-relaxed mb-2">
                       만약 Fed가 금리 인하를 미루거나, 물가가 예상보다 강하게 나오면 위험자산 선호가 꺾일 수 있음.
                     </p>
                     <p className="text-sm leading-relaxed mb-2">
                       달러 강세 → BTC 약세 구조.
                     </p>
                   </div>

                   <div>
                     <h5 className="font-semibold text-orange-300 mb-2">규제 강화 리스크</h5>
                     <p className="text-sm leading-relaxed mb-2">
                       미국 SEC/의회, 유럽, 아시아의 세금·AML 규제 뉴스가 갑자기 나오면 단기 급락 가능.
                     </p>
                   </div>

                   <div>
                     <h5 className="font-semibold text-orange-300 mb-2">투자심리 악화</h5>
                     <p className="text-sm leading-relaxed mb-2">
                       "가격 조작" 논란, 해킹, 거래소 문제 → 투자자 불안 → 급락 유발.
                     </p>
                   </div>
                 </div>
               </div>

               <div>
                 <h4 className="font-semibold text-green-300 mb-2">📈 상승 가능성 요인</h4>
                 
                 <div className="space-y-3">
                   <div>
                     <h5 className="font-semibold text-blue-300 mb-2">기관 매수 확대</h5>
                     <p className="text-sm leading-relaxed mb-2">
                       Metaplanet, MicroStrategy 같은 기업이 대량 매수 중.
                     </p>
                     <p className="text-sm leading-relaxed mb-2">
                       현물 ETF로 자금이 계속 유입되면 강력한 상승 모멘텀.
                     </p>
                   </div>

                   <div>
                     <h5 className="font-semibold text-blue-300 mb-2">금리 인하 기대감</h5>
                     <p className="text-sm leading-relaxed mb-2">
                       Fed가 실제로 금리 인하 신호를 주면 BTC 같은 위험자산에 돈이 몰릴 가능성.
                     </p>
                   </div>

                   <div>
                     <h5 className="font-semibold text-blue-300 mb-2">신고점 이후의 조정 단계일 뿐이라는 해석</h5>
                     <p className="text-sm leading-relaxed mb-2">
                       현재는 $124K → $114K로 약 8% 조정된 상황인데, 장기 상승 추세 속 흔한 되돌림일 수 있음.
                     </p>
                   </div>
                 </div>
               </div>

               <div className="bg-gray-700 p-4 rounded-lg">
                 <h4 className="font-semibold text-purple-300 mb-2">🔮 정리 (앞으로의 시나리오)</h4>
                 
                 <div className="space-y-2">
                   <div>
                     <h5 className="font-semibold text-yellow-300 mb-1">단기 (1~4주):</h5>
                     <p className="text-sm leading-relaxed">
                       변동성 크고, Fed 이벤트/레버리지 청산에 따라 $110K선까지 하락 가능.
                     </p>
                   </div>

                   <div>
                     <h5 className="font-semibold text-yellow-300 mb-1">중기 (몇 달):</h5>
                     <p className="text-sm leading-relaxed">
                       기관 매수세와 ETF 자금 유입이 유지된다면 다시 $120K~130K 재도전 가능성 높음.
                     </p>
                   </div>

                   <div>
                     <h5 className="font-semibold text-yellow-300 mb-1">장기 (1년+):</h5>
                     <p className="text-sm leading-relaxed">
                       2024년 반감기 이후 사이클을 고려하면, 여전히 상승 사이클 중으로 보는 전문가가 다수.
                     </p>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         );
       case '코인 하락 확률은?':
         return (
           <div className="space-y-6">
             <div className="flex items-center gap-2 mb-4">
               <span className="text-lg font-semibold">좋은 질문이에요 👍</span>
             </div>
             <p className="text-sm leading-relaxed mb-4">
               "코인(특히 비트코인)이 앞으로 하락할 확률"은 정량적으로 딱 잘라 말하긴 어렵지만, 최근 시장 데이터와 주요 이벤트를 기반으로 확률적인 시나리오를 잡을 수 있습니다.
             </p>
             
             <div className="space-y-4">
               <div>
                 <h4 className="font-semibold text-purple-300 mb-2">📊 현재 비트코인 하락 확률 관점 (2025년 8월 기준)</h4>
                 
                 <div className="space-y-4">
                   <div>
                     <h5 className="font-semibold text-red-300 mb-2">1. 단기 (1~4주)</h5>
                     <div className="bg-red-900/20 p-3 rounded-lg">
                       <p className="text-sm font-semibold text-red-300 mb-2">
                         하락 확률: <span className="text-xl">약 60%</span>
                       </p>
                       <p className="text-sm leading-relaxed mb-2">이유:</p>
                       <ul className="text-sm leading-relaxed space-y-1">
                         <li>• 최근 레버리지 청산 여파가 끝나지 않음.</li>
                         <li>• Fed 금리 인하가 확정 전까지는 불확실성 큼.</li>
                         <li>• 투자심리 위축 시 $110K 부근까지 테스트 가능.</li>
                       </ul>
                     </div>
                   </div>

                   <div>
                     <h5 className="font-semibold text-orange-300 mb-2">2. 중기 (3~6개월)</h5>
                     <div className="bg-orange-900/20 p-3 rounded-lg">
                       <p className="text-sm font-semibold text-orange-300 mb-2">
                         하락 확률: <span className="text-xl">약 40%</span>
                       </p>
                       <p className="text-sm leading-relaxed mb-2">이유:</p>
                       <ul className="text-sm leading-relaxed space-y-1">
                         <li>• ETF와 기관 매수세(예: Metaplanet, MicroStrategy)가 강력한 지지 요인.</li>
                         <li>• 다만 글로벌 경기 둔화 + 규제 이슈가 터지면 중기 조정도 가능.</li>
                       </ul>
                     </div>
                   </div>

                   <div>
                     <h5 className="font-semibold text-green-300 mb-2">3. 장기 (1년 이상)</h5>
                     <div className="bg-green-900/20 p-3 rounded-lg">
                       <p className="text-sm font-semibold text-green-300 mb-2">
                         하락 확률: <span className="text-xl">약 25% 이하</span>
                       </p>
                       <p className="text-sm leading-relaxed mb-2">이유:</p>
                       <ul className="text-sm leading-relaxed space-y-1">
                         <li>• 2024년 반감기 이후 사이클 상 상승 구간에 여전히 있음.</li>
                         <li>• 기관 자금 유입 구조가 과거와 다르게 탄탄한 수요층 형성.</li>
                         <li>• 장기적으로는 인플레이션 헤지 및 디지털 금 역할 기대.</li>
                       </ul>
                     </div>
                   </div>
                 </div>
               </div>

               <div className="bg-gray-700 p-4 rounded-lg">
                 <h4 className="font-semibold text-yellow-300 mb-2">✅ 요약</h4>
                 <div className="space-y-2">
                   <div className="flex justify-between items-center">
                     <span className="text-sm">단기(1개월):</span>
                     <span className="text-sm font-semibold text-red-300">하락 가능성이 우세(약 60%)</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-sm">중기(3~6개월):</span>
                     <span className="text-sm font-semibold text-orange-300">상승/하락 혼조, 40% 수준</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-sm">장기(1년+):</span>
                     <span className="text-sm font-semibold text-green-300">상승 가능성이 압도적, 하락 확률 낮음(25% 이하)</span>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         );
       default:
         return answer || `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
    }
  };
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300); // 애니메이션 완료 후 숨김
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* 배경 오버레이 */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
             {/* 모달 컨테이너 */}
       <div 
         className={`relative bg-[#2D3240] h-full transition-all duration-300 ease-out ${
           isOpen ? 'w-[356px]' : 'w-0'
         } overflow-hidden`}
       >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 text-white hover:text-gray-300 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* 모달 내용 */}
        <div className="h-full flex flex-col">
                     {/* 스크롤 가능한 컨텐츠 영역 */}
           <div className="flex-1 overflow-y-auto p-6 pt-16">
             <div className="text-white">
               <div className="text-sm leading-relaxed">
                 {getAnswerContent(question)}
               </div>
             </div>
           </div>

                     {/* 하단 추천 질문 섹션 */}
           <div className="border-t border-gray-600 p-6">
             <h4 className="text-white text-sm font-medium mb-3">자주하는 질문 추천</h4>
                           <div className="space-y-2">
                <button 
                  onClick={() => onClose('앞으로 코인이 하락할까?', true)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm py-2 px-3 transition-colors">
                  앞으로 코인이 하락할까?
                </button>
                <button 
                  onClick={() => onClose('코인 하락 확률은?', true)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm py-2 px-3 transition-colors">
                  코인 하락 확률은?
                </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
