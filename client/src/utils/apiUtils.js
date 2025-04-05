// apiUtils.js - Create this file to handle API response parsing
/**
 * Advanced parser to extract structured book data from AI response
 * @param {string} aiResponse - Raw text response from the AI
 * @returns {Array} Array of book objects with title and description
 */
export const parseBookRecommendations = (aiResponse) => {
    // Handle null or undefined response
    if (!aiResponse) return [];
    
    // If response is already an array of objects with title/description, return it
    if (Array.isArray(aiResponse) && aiResponse.length > 0 && typeof aiResponse[0] === 'object') {
      return aiResponse;
    }
    
    // Convert to string if it's not already
    const textResponse = typeof aiResponse === 'string' ? aiResponse : aiResponse.toString();
    
    try {
      // Try different patterns to extract books
      
      // Pattern 1: Numbered list with book titles and descriptions (1. Book Title - Description)
      const numberedPattern = /(\d+\.\s+)([^:.\n]+)(?:\s*[-:]\s*|\n\s*)([^]*?)(?=(?:\d+\.\s+)|$)/g;
      let match;
      const numberedBooks = [];
      let matchFound = false;
      
      // Reset regex state
      numberedPattern.lastIndex = 0;
      
      while ((match = numberedPattern.exec(textResponse)) !== null) {
        matchFound = true;
        const title = match[2].trim();
        const description = match[3].trim();
        
        numberedBooks.push({
          title,
          description: description || "A recommended book for your reading pleasure."
        });
      }
      
      if (matchFound && numberedBooks.length > 0) {
        return numberedBooks;
      }
      
      // Pattern 2: Books with titles in quotes or emphasized
      const quotedTitlePattern = /["""']([^"""']+)["""'](?:[^]*?)(?=["""']|$)/g;
      const quotedBooks = [];
      matchFound = false;
      
      // Reset regex state
      quotedTitlePattern.lastIndex = 0;
      
      while ((match = quotedTitlePattern.exec(textResponse)) !== null) {
        matchFound = true;
        const fullText = textResponse.substring(match.index);
        let endOfDescription = fullText.indexOf('"', match[0].length);
        
        if (endOfDescription === -1) {
          endOfDescription = fullText.indexOf('\n\n', match[0].length);
        }
        
        if (endOfDescription === -1) {
          endOfDescription = fullText.length;
        }
        
        const title = match[1].trim();
        const descriptionText = fullText.substring(match[0].length, endOfDescription).trim();
        
        quotedBooks.push({
          title,
          description: descriptionText || "A recommended book for your reading pleasure."
        });
      }
      
      if (matchFound && quotedBooks.length > 0) {
        return quotedBooks;
      }
      
      // Pattern 3: Simple bullet points or lines
      const lines = textResponse.split(/\n/).filter(line => line.trim());
      const bulletBooks = [];
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Skip empty lines or lines that seem to be introductory text
        if (!line || line.length < 10 || line.endsWith(':')) continue;
        
        // Remove bullet points or numbering
        const cleanLine = line.replace(/^[\s•\-*#\d.)\]]+/, '').trim();
        
        // Check if this might be a book title (not too long, no common ending punctuation)
        if (cleanLine.length < 100 && !cleanLine.endsWith('.')) {
          const title = cleanLine;
          let description = "";
          
          // If there's a next line that's not a bullet or number, it might be the description
          if (i + 1 < lines.length && !lines[i + 1].match(/^[\s•\-*#\d.)\]]+/)) {
            description = lines[i + 1].trim();
            i++; // Skip the next line since we've used it as description
          }
          
          bulletBooks.push({
            title,
            description: description || "A recommended book for your reading pleasure."
          });
        }
      }
      
      if (bulletBooks.length > 0) {
        return bulletBooks;
      }
      
      // Pattern 4: Detect titles by formatting (e.g., bold, italic)
      const formattedTitlePattern = /(?:\*\*|\*|_)([^*_]+)(?:\*\*|\*|_)/g;
      const formattedBooks = [];
      matchFound = false;
      
      while ((match = formattedTitlePattern.exec(textResponse)) !== null) {
        matchFound = true;
        const title = match[1].trim();
        
        // Get text after the title until next formatted text or paragraph break
        const afterTitle = textResponse.substring(match.index + match[0].length);
        const nextFormatted = afterTitle.search(/(?:\*\*|\*|_)([^*_]+)(?:\*\*|\*|_)/);
        const nextParagraph = afterTitle.search(/\n\s*\n/);
        
        let endPos;
        if (nextFormatted !== -1 && (nextParagraph === -1 || nextFormatted < nextParagraph)) {
          endPos = nextFormatted;
        } else if (nextParagraph !== -1) {
          endPos = nextParagraph;
        } else {
          endPos = afterTitle.length;
        }
        
        const description = afterTitle.substring(0, endPos).trim();
        
        formattedBooks.push({
          title,
          description: description || "A recommended book for your reading pleasure."
        });
      }
      
      if (matchFound && formattedBooks.length > 0) {
        return formattedBooks;
      }
      
      // Fallback: Split text into paragraphs and try to extract book information
      const paragraphs = textResponse.split(/\n\s*\n/).filter(p => p.trim());
      const fallbackBooks = [];
      
      for (const paragraph of paragraphs) {
        // Look for patterns like "Title by Author" or "Title (Year)"
        const titleMatch = paragraph.match(/^([^.!?]+)(?:\s+by\s+|\s+\(\d{4}\))/);
        
        if (titleMatch) {
          const title = titleMatch[1].trim();
          const description = paragraph.substring(titleMatch[0].length).trim();
          
          fallbackBooks.push({
            title,
            description: description || "A recommended book for your reading pleasure."
          });
        }
      }
      
      if (fallbackBooks.length > 0) {
        return fallbackBooks;
      }
      
      // If all else fails, return an empty array or a message indicating failure
      return [];
      
    } catch (error) {
      console.error("Error parsing book recommendations:", error);
      return [];
    }
  };
  
  /**
   * Helper function to clean and format book data
   * @param {Array} books - Array of book objects
   * @returns {Array} - Cleaned and formatted book objects
   */
  export const formatBookData = (books) => {
    return books.map((book, index) => {
      // Ensure title and description exist
      const title = book.title || `Book ${index + 1}`;
      const description = book.description || "No description available.";
      
      // Optional: Add additional properties like placeholder images
      return {
        id: index + 1,
        title: title,
        description: description,
        image: book.image || `https://via.placeholder.com/150?text=${encodeURIComponent(title.substring(0, 10))}`,
      };
    });
  };
  
  /**
   * Example usage function to demonstrate how to use the parser
   * @param {string} aiResponse - Raw text response from the AI
   * @returns {Array} - Ready-to-use book data for BookCard components
   */
  export const getBookRecommendationsForCards = (aiResponse) => {
    const parsedBooks = parseBookRecommendations(aiResponse);
    return formatBookData(parsedBooks);
  };