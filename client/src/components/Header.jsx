// import React, { useState } from "react";
// import styled from 'styled-components';
// import { motion } from 'framer-motion';

// const HeaderContainer = styled(motion.header)`
//   padding: 30px 20px;
//   background: linear-gradient(to right, #7a5c46, #8d6e57, #7a5c46);
//   border-radius: 15px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
//   position: relative;
//   overflow: hidden;
  
//   &::before {
//     content: "";
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     height: 3px;
//     background: linear-gradient(to right, #c49a6c, #e3d5b6, #c49a6c);
//   }
// `;

// const BackdropDecoration = styled.div`
//   position: absolute;
//   width: 300px;
//   height: 300px;
//   border-radius: 50%;
//   background: radial-gradient(circle, rgba(196, 154, 108, 0.2) 0%, rgba(165, 137, 103, 0) 70%);
//   z-index: 0;
// `;

// const SearchForm = styled(motion.form)`
//   display: flex;
//   gap: 15px;
//   max-width: 700px;
//   margin: 0 auto;
//   position: relative;
//   z-index: 1;
// `;

// const SearchInput = styled(motion.input)`
//   flex: 1;
//   padding: 15px 20px;
//   border: 2px solid #decca6;
//   border-radius: 30px;
//   font-size: 16px;
//   background-color: rgba(248, 243, 233, 0.9);
//   color: #5c4033;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   transition: all 0.3s ease;
  
//   &:focus {
//     outline: none;
//     border-color: #c49a6c;
//     box-shadow: 0 0 0 4px rgba(196, 154, 108, 0.3), 0 4px 12px rgba(0, 0, 0, 0.1);
//     transform: translateY(-2px);
//   }
  
//   &::placeholder {
//     color: #a89078;
//   }
// `;

// const IconWrapper = styled.div`
//   position: absolute;
//   left: 20px;
//   top: 50%;
//   transform: translateY(-50%);
//   color: #7a5c46;
// `;

// const SearchButton = styled(motion.button)`
//   padding: 12px 30px;
//   background: linear-gradient(to right, #c49a6c, #b38a5c);
//   color: #fff;
//   border: none;
//   border-radius: 30px;
//   font-size: 16px;
//   font-weight: 600;
//   cursor: pointer;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   transition: all 0.3s ease;
//   position: relative;
//   overflow: hidden;
  
//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: -100%;
//     width: 100%;
//     height: 100%;
//     background: linear-gradient(
//       to right,
//       rgba(255, 255, 255, 0) 0%,
//       rgba(255, 255, 255, 0.3) 50%,
//       rgba(255, 255, 255, 0) 100%
//     );
//     transition: all 0.5s ease;
//   }
  
//   &:hover::before {
//     left: 100%;
//   }
// `;

// const SearchIcon = () => (
//   <svg 
//     xmlns="http://www.w3.org/2000/svg" 
//     width="18" 
//     height="18" 
//     viewBox="0 0 24 24" 
//     fill="none" 
//     stroke="currentColor" 
//     strokeWidth="2" 
//     strokeLinecap="round" 
//     strokeLinejoin="round"
//   >
//     <circle cx="11" cy="11" r="8"></circle>
//     <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
//   </svg>
// );

// function Header({ onSearch }) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isFocused, setIsFocused] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       onSearch(searchQuery);
//     }
//   };

//   return (
//     <HeaderContainer
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <BackdropDecoration style={{ top: -150, left: -50 }} />
//       <BackdropDecoration style={{ bottom: -150, right: -50 }} />
      
//       <SearchForm 
//         onSubmit={handleSubmit}
//         initial={{ scale: 0.9 }}
//         animate={{ scale: 1 }}
//         transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
//       >
//         <SearchInput
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => setIsFocused(false)}
//           placeholder="Fantasy, mystery, romance, historical fiction..."
//           animate={{ 
//             boxShadow: isFocused 
//               ? '0 0 0 4px rgba(196, 154, 108, 0.3), 0 4px 12px rgba(0, 0, 0, 0.1)' 
//               : '0 4px 8px rgba(0, 0, 0, 0.1)'
//           }}
//         />
//         <SearchButton
//           type="submit"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           <motion.div
//             initial={{ x: 10 }}
//             animate={{ x: 0 }}
//             transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
//             style={{ display: "flex", alignItems: "center", gap: "8px" }}
//           >
//             Find Books
//             <SearchIcon />
//           </motion.div>
//         </SearchButton>
//       </SearchForm>
//     </HeaderContainer>
//   );
// }

// export default Header;

import React, { useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  padding: 12px;
  background: rgba(109, 90, 75, 0.85); /* Updated to translucent */
  border-radius: 50px;
  width: 40%;
  min-width: 300px;
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px; /* Push the search bar slightly down */
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px;
  font-size: 1rem;
  border: none;
  border-radius: 50px;
  background: rgba(30, 18, 12, 0.8); /* Darker translucent brown */
  color: #fff;
  outline: none;
  text-align: center;

  &::placeholder {
    color: #bbb;
  }
`;


const SearchButton = styled.button`
  padding: 10px 15px;
  margin-left: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 50px;
  background: #a87c5f; /* Warm brown */
  color: white;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #8f674c; /* Slightly darker on hover */
  }
`;

const Header = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search for a book..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <SearchButton onClick={handleSearch}>Find</SearchButton>
    </SearchContainer>
  );
};

export default Header;
