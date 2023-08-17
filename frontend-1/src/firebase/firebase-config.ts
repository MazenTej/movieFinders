const config = {
    apiKey: "AIzaSyDcoiVJBjYMSw68NLsYxiKFvI3M2eWD5CA",
    authDomain: "moviefinder-375.firebaseapp.com",
    projectId: "moviefinder-375",
    storageBucket: "moviefinder-375.appspot.com",
    messagingSenderId: "723705563365",
    appId: "1:723705563365:web:8a083f7025f8b00cfd2c0c",
    measurementId: "G-BVNJTWLZNE"
  };


  export function getFirebaseConfig() {
    if (!config || !config.apiKey) {
      throw new Error('No Firebase configuration object provided.' + '\n' +
      'Add your web app\'s configuration object to firebase-config.ts');
    } else {
      return config;
    }
  } 