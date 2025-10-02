import { QueryClient, QueryClientProvider } from 'react-query'
import { Dashboard } from './components/Dashboard'
import { logEnvConfig } from './utils/env'

// Initialize environment logging
logEnvConfig();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Dashboard />
      </div>
    </QueryClientProvider>
  )
}

export default App
