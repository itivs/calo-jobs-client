import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" reverseOrder={false} />
      <HomeScreen />
    </QueryClientProvider>
  );
}

export default App;
