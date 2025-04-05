import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import BookCard from "./BookCard";

// Loading messages for dynamic rotation
const loadingMessages = [
  "Brewing some content...",
  "Finding your perfect read...",
  "Exploring hidden gems...",
  "Curating cozy vibes...",
  "Bringing stories to life...",
];

const BookListContainer = styled(motion.div)`
  margin-top: 30px;
`;

const BookListTitle = styled(motion.h2)`
  color: #c49a6c; /* Updated to warm shade */
  text-align: center;
  margin-bottom: 30px;
  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 2px;
    background-color: #7a5c46;
  }
`;

const BookGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 10px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 2 cards on tablets */
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* 1 card on mobile */
  }
`;

// Centered Loading Container
const LoadingContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 300px;
`;

// Dynamic Loading Message
const Message = styled(motion.p)`
  text-align: center;
  color: #f8e9d2;
  font-size: 1.2rem;
  margin-top: 20px;
  font-family: "Playfair Display", serif;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
`;

// ☕ New Coffee Mug Animation
const CoffeeMug = styled(motion.div)`
  width: 80px;
  height: 100px;
  background: linear-gradient(to bottom, #7a5c46, #6d4c3d);
  border-radius: 12px 12px 5px 5px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &::before {
    content: "";
    position: absolute;
    width: 25px;
    height: 40px;
    border: 5px solid #7a5c46;
    border-radius: 50%;
    right: -20px;
    top: 20px;
  }
`;

// ☁️ Steam Animation for the Coffee Mug
const Steam = styled.div`
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  width: 40px;

  div {
    width: 8px;
    height: 25px;
    background-color: rgba(245, 245, 245, 0.8);
    border-radius: 50%;
    animation: steamUp 2s infinite ease-in-out;

    &:nth-child(1) {
      animation-delay: 0s;
    }
    &:nth-child(2) {
      animation-delay: 0.3s;
    }
    &:nth-child(3) {
      animation-delay: 0.6s;
    }
  }

  @keyframes steamUp {
    0% {
      transform: translateY(0) scale(0.9);
      opacity: 0.8;
    }
    50% {
      transform: translateY(-15px) scale(1.2);
      opacity: 0.5;
    }
    100% {
      transform: translateY(-30px) scale(1.5);
      opacity: 0;
    }
  }
`;

// 🔄 Dynamic Loading Animation with Phrase Rotation
function LoadingAnimation() {
  const [currentMessage, setCurrentMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prevMessage) => {
        const nextIndex =
          (loadingMessages.indexOf(prevMessage) + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <LoadingContainer>
      <CoffeeMug>
        <Steam>
          <motion.div
            animate={{ y: [-10, -30], opacity: [0.8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            animate={{ y: [-10, -30], opacity: [0.8, 0] }}
            transition={{ duration: 1.5, delay: 0.3, repeat: Infinity }}
          />
          <motion.div
            animate={{ y: [-10, -30], opacity: [0.8, 0] }}
            transition={{ duration: 1.5, delay: 0.6, repeat: Infinity }}
          />
        </Steam>
      </CoffeeMug>
      <Message>{currentMessage}</Message>
    </LoadingContainer>
  );
}

// Main BookList Component
function BookList({ books, loading, error }) {
  if (loading) {
    return <LoadingAnimation />;
  }

  if (error) {
    return (
      <Message
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {error}
      </Message>
    );
  }
  return (
    <BookListContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Only show the title when books are available */}
      {books.length > 0 && (
        <BookListTitle
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Your Recommended Books
        </BookListTitle>
      )}
      <BookGrid
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {books.map((book, index) => (
          <BookCard key={index} book={book} index={index} />
        ))}
      </BookGrid>
    </BookListContainer>
  );  
}

export default BookList;
