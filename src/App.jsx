import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Topics from "./components/Topics";
import AddToHomeModal from "./components/AddToHome/AddToHome";
import TopicViewer from "./components/TopicViewer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddTopic from "./components/AddTopicModal";
import { Toaster } from "react-hot-toast";
import Review from "./components/Review";
import ReviewGuard from "./components/ReviewGuard";

function App() {
  const [installPrompt, setInstallPrompt] = useState(null);

  const handleInstallClick = () => {
    if (installPrompt instanceof Event) {
      const installEvent = installPrompt;
      installEvent.prompt();
      installEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
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
      if (!event.target.closest(".install-popup")) {
        setInstallPrompt(null);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    document.addEventListener("click", handleClickOutsidePopup);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      document.removeEventListener("click", handleClickOutsidePopup);
    };
  }, []);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "10px",
            background: "#fff",
            color: "#333",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          },
        }}
      />
      <BrowserRouter>
        <Header />
        <div className="app-content">
          {installPrompt && (
            <AddToHomeModal
              installPrompt={installPrompt}
              onInstallClick={handleInstallClick}
              onCloseClick={handleCloseClick}
            />
          )}
          <Routes>
            <Route path="/" element={<Topics />} />
            <Route path="/topic/:slug" element={<TopicViewer />} />
            <Route path="/Add" element={<AddTopic />} />
            <Route
              path="/review"
              element={
                <ReviewGuard>
                  <Review />
                </ReviewGuard>
              }
            />{" "}
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
