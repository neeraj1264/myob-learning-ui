import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Topics from './components/Topics'
import AddToHomeModal from './components/AddToHome/AddToHome'
import TopicViewer from './components/TopicViewer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  const [installPrompt, setInstallPrompt] = useState(null);

    const handleInstallClick = () => {
    if (installPrompt instanceof Event) {
      const installEvent = installPrompt;
      installEvent.prompt();
      installEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        setInstallPrompt(null);
      });
    }
  };

  const handleCloseClick = () => {
    setInstallPrompt(null);
  };
  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };

    const handleClickOutsidePopup = (event) => {
      // Check if the clicked element is not inside the install popup
      if (!event.target.closest('.install-popup')) {
        setInstallPrompt(null);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    document.addEventListener('click', handleClickOutsidePopup);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      document.removeEventListener('click', handleClickOutsidePopup);
    };
  }, []);

  return (
    <>
    <Header/>
          {installPrompt && (
        <AddToHomeModal
        installPrompt={installPrompt}
        onInstallClick={handleInstallClick}
        onCloseClick={handleCloseClick}
        />
      )}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Topics />} />
        <Route path="/topic/:slug" element={<TopicViewer />} />
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
