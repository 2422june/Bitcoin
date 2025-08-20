import React from 'react';
import Header from './components/Header';
import MainDashboard from './components/MainDashboard';
import NewsSection from './components/NewsSection';
import PredictionHistory from './components/PredictionHistory';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black text-[#F0F0F0] font-korean">
      <Header />
      <main className="max-w-[1420px] mx-auto px-4 py-6 overflow-hidden pt-[63px]">
        <MainDashboard />
        <NewsSection />
        <PredictionHistory />
      </main>
      <Footer />
    </div>
  );
}

export default App;

