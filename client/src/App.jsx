import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import BookList from "./components/BookList";
import Footer from "./components/Footer";
import "./global.css";
import styled from "styled-components";
import { getBookRecommendations } from "./api";
import { parseBookRecommendations } from "./utils/apiUtils";
import { motion, AnimatePresence } from "framer-motion";
import Slideshow from "./components/Slideshow";

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("https://images.pexels.com/photos/585752/pexels-photo-585752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")
    no-repeat center center/cover;
  animation: fadeIn 2s ease-in-out;
  filter: brightness(0.7);
  z-index: -2;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 80vh;
  margin-top: 40px; /* Move content slightly down */
`;

const Title = styled(motion.h1)`
  color: #fff;
  text-align: center;
  font-family: "Playfair Display", serif;
  font-size: 2.5rem;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
`;

const HeaderContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    margin-top: 15px;
  }

  @media (max-width: 480px) {
    margin-top: 10px;
  }
`;

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSlideshow, setShowSlideshow] = useState(true); // ✅ Added new state

  const fetchRecommendations = async (searchQuery) => {
    if (!searchQuery) {
      setError("Please enter a book genre or title.");
      return;
    }

    setLoading(true);
    setError(null);
    setBooks([]);
    setShowSlideshow(false); // Hide slideshow after search ✅

    try {
      console.log("Fetching recommendations for:", searchQuery);
      const recommendations = await getBookRecommendations(searchQuery);

      if (recommendations && recommendations.length > 0) {
        const bookList = parseBookRecommendations(recommendations);
        console.log("Parsed Books:", bookList);

        setTimeout(() => {
          setBooks(bookList);
        }, 1000); // Simulate delay for loading animation ✅
      } else {
        setTimeout(() => {
          setBooks([]);
          setError("No recommendations found. Try a different genre.");
        }, 1000);
      }
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setTimeout(() => {
        setError("Something went wrong. Please try again.");
      }, 1000);
      setBooks([]);
    } finally {
      setTimeout(() => setLoading(false), 1000); // Finish loading after delay ✅
    }
  };

  useEffect(() => {
    if (books.length > 0 || error) {
      document.body.style.overflow = "auto"; // Enable scrolling when results load
    } else {
      document.body.style.overflow = "hidden"; // Disable scrolling on the front page
    }
  }, [books, error]);

  return (
    <>
      <Background />
      <Title
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Cozy Book Nook
      </Title>
      <HeaderContainer>
        <Header onSearch={fetchRecommendations} />
      </HeaderContainer>

      {/* ✅ Conditionally show Slideshow if no books or loading */}
      <AnimatePresence mode="wait">
      {!loading && !books.length && showSlideshow && (
  <motion.div
    key="slideshow"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.8 }}
  >
    <Slideshow showSlideshow={showSlideshow} /> {/* ✅ Pass prop here */}
  </motion.div>
)}

      </AnimatePresence>

      <MainContent>
        <AnimatePresence mode="wait">
          {/* ✅ Show BookList or Error Messages */}
          <BookList books={books} loading={loading} error={error} />
        </AnimatePresence>
      </MainContent>

      <Footer />
    </>
  );
}

export default App;
