import React from 'react';
import Header from './components/Header';
import MainDashboard from './components/MainDashboard';
import NewsSection from './components/NewsSection';
import PredictionHistory from './components/PredictionHistory';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-dark-bg text-white font-korean">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <MainDashboard />
        <NewsSection />
        <PredictionHistory />
      </main>
      <Footer />
    </div>
  );
}

export default App;

