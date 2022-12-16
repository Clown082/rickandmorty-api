import { Suspense } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { NotificationProvider } from './context/notification.context'
import { store } from './redux/store'
import { AppRouter } from './Router'

function App() {
  return (
    <Provider store={store}>
      <NotificationProvider>
        <BrowserRouter>
          <Suspense fallback={'Loading...'}>
            <AppRouter />
          </Suspense>
        </BrowserRouter>
      </NotificationProvider>
    </Provider>
  )
}

export default App
