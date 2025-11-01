import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import FloatingChat from './components/FloatingChat';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <MainContent />
      <Footer />
      {/* Floating Chat Component */}
      <FloatingChat />
    </div>
  );
}

export default App;
