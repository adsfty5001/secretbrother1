// config.js (루트) - Firebase Web App Config 브릿지
// 반드시 본인의 Firebase 프로젝트 설정값으로 교체하세요.
window.SECRETCLASS_FIREBASE_CONFIG = window.SECRETCLASS_FIREBASE_CONFIG || {
  apiKey: "REPLACE_ME",
  authDomain: "REPLACE_ME",
  projectId: "REPLACE_ME",
  storageBucket: "REPLACE_ME",
  messagingSenderId: "REPLACE_ME",
  appId: "REPLACE_ME"
};

// 기존 코드 호환 브릿지 (유지)
window.FIREBASE_CONFIG = window.SECRETCLASS_FIREBASE_CONFIG;
