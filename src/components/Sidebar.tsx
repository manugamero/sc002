'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  Palette, 
  Smartphone, 
  Megaphone, 
  Rocket,
  CheckCircle,
  Circle,
  X
} from 'lucide-react';
import { useEffect } from 'react';

interface SidebarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  progress: {
    strategy: number;
    brand: number;
    product: number;
    messages: number;
    launch: number;
  };
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ currentSection, onSectionChange, progress, isOpen, onClose }: SidebarProps) {
  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);
  const sections = [
    {
      key: 'strategy',
      label: 'Strategy',
      icon: Target,
      description: 'Entrevistas, benchmark, mercado y planificación',
    },
    {
      key: 'brand',
      label: 'Brand',
      icon: Palette,
      description: 'Valores, naming, logo y sistema visual',
    },
    {
      key: 'product',
      label: 'Product',
      icon: Smartphone,
      description: 'Features, prototipo y validación',
    },
    {
      key: 'messages',
      label: 'Messages',
      icon: Megaphone,
      description: 'Social, ads, merch y validación',
    },
    {
      key: 'launch',
      label: 'Launch',
      icon: Rocket,
      description: 'Go-to-market, post-launch y entregables',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={onClose}
          />
          
          {/* Menu Content */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              position: 'fixed',
              top: '0',
              left: '0',
              right: '0',
              zIndex: 50,
              backgroundColor: '#000000',
              borderBottom: '1px solid #333333'
            }}
          >
            <div style={{ padding: '24px' }}>
              {/* Close Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
                <motion.button
                  onClick={onClose}
                  style={{
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#666666',
                    transition: 'color 0.2s ease'
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                  onMouseLeave={(e) => e.target.style.color = '#666666'}
                >
                  <X style={{ width: '16px', height: '16px' }} />
                </motion.button>
              </div>

              {/* Navigation Items */}
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {sections.map((section, index) => {
                  const Icon = section.icon;
                  const sectionProgress = progress[section.key as keyof typeof progress];
                  const isActive = currentSection === section.key;
                  const isCompleted = sectionProgress === 100;

                  return (
                    <motion.button
                      key={section.key}
                      onClick={() => {
                        onSectionChange(section.key);
                        onClose();
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: index * 0.1,
                        ease: "easeOut" 
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '20px 0',
                        borderBottom: index < sections.length - 1 ? '1px solid #333333' : 'none',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        color: isActive ? '#ffffff' : '#cccccc'
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.target.style.color = '#ffffff';
                          e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.target.style.color = '#cccccc';
                          e.target.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ flexShrink: 0 }}>
                          {isCompleted ? (
                            <CheckCircle style={{ width: '20px', height: '20px', color: '#4a9eff' }} />
                          ) : (
                            <Icon style={{ width: '20px', height: '20px' }} />
                          )}
                        </div>
                        
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <h3 style={{ 
                              fontSize: '16px', 
                              fontWeight: isActive ? '600' : '500',
                              color: isActive ? '#ffffff' : '#cccccc',
                              margin: 0
                            }}>
                              {section.label}
                            </h3>
                            <span style={{ 
                              fontSize: '12px', 
                              fontWeight: '500',
                              color: '#666666',
                              padding: '2px 8px',
                              backgroundColor: 'rgba(255, 255, 255, 0.1)',
                              borderRadius: '12px'
                            }}>
                              {Math.round(sectionProgress)}%
                            </span>
                          </div>
                          
                          <p style={{ 
                            fontSize: '12px', 
                            color: '#666666', 
                            margin: '0 0 8px 0',
                            lineHeight: '1.4'
                          }}>
                            {section.description}
                          </p>
                          
                          <div style={{ 
                            width: '100%', 
                            backgroundColor: '#333333', 
                            borderRadius: '2px', 
                            height: '2px' 
                          }}>
                            <motion.div
                              style={{
                                height: '2px',
                                backgroundColor: isCompleted ? '#4a9eff' : '#ffffff',
                                borderRadius: '2px'
                              }}
                              initial={{ width: 0 }}
                              animate={{ width: `${sectionProgress}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
