import React, { useEffect, useState } from 'react';

const QuestionModal = ({ isOpen, onClose, question, answer }) => {
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
          isOpen ? 'w-[306px]' : 'w-0'
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
              <h3 className="text-lg font-semibold mb-4">{question}</h3>
              <div className="text-sm leading-relaxed">
                {answer || `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}
              </div>
            </div>
          </div>

          {/* 하단 추천 질문 섹션 */}
          <div className="border-t border-gray-600 p-6">
            <h4 className="text-white text-sm font-medium mb-3">자주하는 질문 추천</h4>
            <div className="space-y-2">
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm py-2 px-3 transition-colors">
                앞으로 코인이 하락할까?
              </button>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm py-2 px-3 transition-colors">
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
