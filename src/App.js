import './App.css';

import NaverPage from "./components/naver/NaverPage";
import KakaoPage from "./components/kakao/KakaoPage";
import GooglePage from "./components/google/GooglePage";

function App() {
  return (
    <div className="App">
      {/* <NaverPage /> */}
      <KakaoPage />
      {/* <GooglePage /> */}
    </div>
  );
}

export default App;
