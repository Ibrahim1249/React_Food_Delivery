import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';



const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div className="search-container">
      <motion.div
        initial={false}
        animate={{ width: isOpen ? 300 : 40 }}
        className="search-bar"
      >
        <SearchIcon 
          className="search-icon" 
          onClick={() => setIsOpen(!isOpen)} 
        />
        <AnimatePresence>
          {isOpen && (
            <motion.input
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="search-input"
              placeholder="Search..."
              autoFocus
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SearchBar;