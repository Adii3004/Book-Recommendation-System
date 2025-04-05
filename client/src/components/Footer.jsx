// import React from 'react';
// import styled from 'styled-components';
// import { motion } from 'framer-motion';

// const FooterContainer = styled.footer`
//   text-align: center;
//   padding: 30px 0 20px;
//   color: #7a5c46;
//   margin-top: 50px;
//   border-top: 1px solid #decca6;
//   position: relative;
// `;

// const FooterContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const FooterText = styled.p`
//   font-size: 1rem;
//   margin-bottom: 15px;
//   line-height: 1.6;
// `;

// const FooterDecoration = styled.div`
//   display: flex;
//   gap: 20px;
//   margin: 10px 0 20px;
// `;

// const CoffeeIcon = styled(motion.span)`
//   font-size: 1.8rem;
//   margin: 0 5px;
// `;

// const BookIcon = styled(motion.div)`
//   width: 30px;
//   height: 40px;
//   background-color: #7a5c46;
//   border-radius: 3px 0 0 3px;
//   position: relative;
  
//   &::after {
//     content: '';
//     position: absolute;
//     top: 0;
//     right: 0;
//     width: 3px;
//     height: 100%;
//     background-color: #f8f3e9;
//   }
// `;

// const FooterLink = styled(motion.a)`
//   color: #c49a6c;
//   text-decoration: none;
//   position: relative;
//   font-weight: 500;
  
//   &::after {
//     content: '';
//     position: absolute;
//     width: 100%;
//     height: 2px;
//     bottom: -2px;
//     left: 0;
//     background-color: #c49a6c;
//     transform: scaleX(0);
//     transform-origin: bottom right;
//     transition: transform 0.3s;
//   }
  
//   &:hover::after {
//     transform: scaleX(1);
//     transform-origin: bottom left;
//   }
// `;

// const FooterBackground = styled.div`
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   width: 100%;
//   height: 50%;
//   background: linear-gradient(to top, rgba(222, 204, 166, 0.2), rgba(248, 243, 233, 0));
//   z-index: -1;
// `;

// const Footer = () => {
//   return (
//     <FooterContainer>
//       <FooterBackground />
//       <FooterContent>
//         <FooterDecoration>
//           <BookIcon 
//             as={motion.div}
//             animate={{ rotate: [0, -5, 0, 5, 0] }}
//             transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
//           />
//           <CoffeeIcon
//             animate={{ 
//               y: [0, -5, 0],
//               rotate: [0, 5, 0, -5, 0]
//             }}
//             transition={{ 
//               repeat: Infinity, 
//               duration: 3,
//               ease: "easeInOut"
//             }}
//           >
//             ☕
//           </CoffeeIcon>
//           <BookIcon 
//             as={motion.div}
//             animate={{ rotate: [0, 5, 0, -5, 0] }}
//             transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
//           />
//         </FooterDecoration>
        
//         <FooterText>
//           Enjoy your cozy reading time with a warm cup of coffee and a good book!
//         </FooterText>
        
//         <FooterText>
//           <motion.span
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5, duration: 1 }}
//           >
//             "Books are a uniquely portable magic." — Stephen King
//           </motion.span>
//         </FooterText>
        
//         <FooterText>
//           © {new Date().getFullYear()} Cozy Book Nook | Made with <motion.span
//             animate={{ scale: [1, 1.2, 1] }}
//             transition={{ repeat: Infinity, repeatDelay: 2, duration: 0.5 }}
//           >❤️</motion.span> for book lovers
//         </FooterText>
//       </FooterContent>
//     </FooterContainer>
//   );
// };

// export default Footer;
import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  text-align: center;
  padding: 20px;
  color: #fff;
  background: rgba(44, 27, 19, 0.8);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  font-size: 1rem;

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 8px;
    font-size: 0.8rem;
  }
`;


const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <p><em>"Books are a uniquely portable magic."</em> - Stephen King</p>
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;