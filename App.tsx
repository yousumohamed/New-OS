
import React from 'react';
import { DesktopProvider } from './context/DesktopContext';
import Desktop from './components/Desktop';

const App: React.FC = () => {
  return (
    <DesktopProvider>
      <Desktop />
    </DesktopProvider>
  );
};

export default App;
