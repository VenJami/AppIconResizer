import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import type { IconSize, CustomSize, Platform, ProcessedIcon, ZipPackage } from './types';

// Components
import { HomePage } from './components/HomePage';

// Pages
import { IconSizesPage } from './pages/IconSizesPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { FileFormatsPage } from './pages/FileFormatsPage';
import { FAQPage } from './pages/FAQPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/icon-sizes" element={<IconSizesPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/file-formats" element={<FileFormatsPage />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
    </Router>
  );
}

export default App;