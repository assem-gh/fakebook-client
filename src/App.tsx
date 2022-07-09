import { Route, Routes } from 'react-router-dom';

import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { useToggle } from '@mantine/hooks';

import LoginPage from './pages/LoginPage';

function App() {
  const [colorScheme, toggleColorScheme] = useToggle<'dark' | 'light'>('dark', [
    'light',
    'dark',
  ]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme: colorScheme,
          colors: {},
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Routes>
          <Route path='login' element={<LoginPage />} />
        </Routes>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
