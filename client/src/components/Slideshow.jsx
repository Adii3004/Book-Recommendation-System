import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const SlideshowContainer = styled.div`
  width: 80%;
  height: 320px; /* Increased height */
  margin: 30px auto 0; /* Moved it slightly up */
  background-color: rgba(44, 27, 19, 0.8);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    width: 90%;
    height: 280px; /* Taller for tablets */
    margin-top: 20px;
  }

  @media (max-width: 480px) {
    width: 95%;
    height: 240px; /* Taller for mobile */
    margin-top: 15px;
  }
`;

const AuthorImage = styled(motion.img)`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
  border: 2px solid #c49a6c;
`;

const AuthorBio = styled(motion.div)`
  color: #f8e9d2;
  font-size: 1rem;
  text-align: center;
  font-family: "Playfair Display", serif;
  margin-top: 10px;
`;

const AuthorSlideshow = ({ showSlideshow }) => {
  const authors = [
    {
      name: "J.K. Rowling",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/5/5d/J._K._Rowling_2010.jpg",
      bio: "J.K. Rowling is the British author of the Harry Potter series, a global phenomenon that has captivated millions worldwide.",
    },
    {
      name: "George Orwell",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/George_Orwell_press_photo.jpg/960px-George_Orwell_press_photo.jpg",
      bio: "George Orwell was an English novelist and essayist known for '1984' and 'Animal Farm,' exploring totalitarianism and dystopian themes.",
    },
    {
      name: "Jane Austen",
      image:
        "https://cdn.britannica.com/12/172012-050-DAA7CE6B/Jane-Austen-Cassandra-engraving-portrait-1810.jpg",
      bio: "Jane Austen was an English novelist whose works, including 'Pride and Prejudice,' focus on romantic fiction and social commentary.",
    },
    {
      name: "Agatha Christie",
      image:
        "https://cdn.britannica.com/88/213788-050-061733DC/English-novelist-Agatha-Christie-circa-1925.jpg",
      bio: "Agatha Christie was the Queen of Mystery, writing 66 detective novels, including the beloved Hercule Poirot and Miss Marple series.",
    },
    {
      name: "Ernest Hemingway",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/ErnestHemingway.jpg/1200px-ErnestHemingway.jpg",
      bio: "Ernest Hemingway was an American novelist and short-story writer known for his terse prose and works such as 'The Old Man and the Sea.'",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % authors.length);
    }, 3000); // Change author every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {showSlideshow && (
        <SlideshowContainer
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30, transition: { duration: 0.5 } }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <AuthorImage src={authors[index].image} alt={authors[index].name} />
              <AuthorBio>
                <h3>{authors[index].name}</h3>
                <p>{authors[index].bio}</p>
              </AuthorBio>
            </motion.div>
          </AnimatePresence>
        </SlideshowContainer>
      )}
    </AnimatePresence>
  );
};

export default AuthorSlideshow;
