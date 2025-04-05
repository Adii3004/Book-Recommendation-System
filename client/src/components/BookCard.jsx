import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Card = styled(motion.div)`
  background: rgba(109, 90, 75, 0.85);
  color: #fff;
  border: 1px solid #6d5a4b;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  position: relative;
  min-height: 350px; /* Fixed minimum height */
  max-height: 450px; /* Allow card to expand but not change layout */
  overflow: hidden;

  &:hover {
    box-shadow: 0 0 12px 3px #c49a6c;
    transform: translateY(-5px);
  }
`;


const Title = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const Author = styled.p`
  font-size: 1rem;
  color: #f1e9dd; /* Lighter white for contrast */
`;

const Description = styled.p`
  font-size: 0.9rem;
  margin-top: 10px;
  line-height: 1.5;
  text-align: justify;
`;

const ReadMoreButton = styled.button`
  margin-top: 10px;
  background: #c49a6c;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #a67c52;
  }
`;

const CardWrapper = styled(motion.div)`
  background: rgba(122, 92, 70, 0.8); /* Translucent brown */
  color: #fff;
  border: 1px solid #c49a6c;
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  height: auto; /* Dynamically adjust height */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`;


function BookCard({ book }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title>{book.title}</Title>
      <Author>by {book.author}</Author>
      <Description>
        {showFullDescription ? book.description : `${book.description.substring(0, 100)}...`}
      </Description>
      <ReadMoreButton onClick={toggleDescription}>
        {showFullDescription ? 'Read Less' : 'Read More'}
      </ReadMoreButton>
    </Card>
  );
}

export default BookCard;
