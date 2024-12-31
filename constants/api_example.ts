import Constants from "expo-constants";

interface EnvConfig {
  API_URL: string;
  API_URL_IOS?: string;
  API_URL_ANDROID?: string;
}

interface Env {
  development: EnvConfig;
  production: EnvConfig;
}

const ENV: Env = {
  development: {
    API_URL: "http://192.X.X.X:3000/api",
    API_URL_IOS: "http://localhost:3000/api",
    API_URL_ANDROID: "http://192.X.X.X:3000/api",
  },
  production: {
    API_URL: "https://mi-backend-produccion.com",
  },
};

const getEnvVars = (env: keyof Env = "development") => {
  const environment = ENV[env];

  if (Constants.platform?.ios) {
    return {
      API_URL: environment.API_URL_IOS,
    };
  } else if (Constants.platform?.android) {
    return {
      API_URL: environment.API_URL_ANDROID,
    };
  }
  return {
    API_URL: environment.API_URL,
  };
};

export default getEnvVars;
