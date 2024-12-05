import React, { useState, useRef, useEffect } from 'react';
import styles from './DropdownMenu.module.css';

export function DropdownMenu({ trigger, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <div onClick={toggleDropdown} className={styles.dropdownTrigger}>
        {trigger}
      </div>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {children}
        </div>
      )}
    </div>
  );
}

export function DropdownItem({ children, onClick }) {
  return (
    <div className={styles.dropdownItem} onClick={onClick}>
      {children}
    </div>
  );
}