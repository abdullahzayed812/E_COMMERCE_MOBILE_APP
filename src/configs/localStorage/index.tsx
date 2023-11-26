import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveToken(accessToken: string) {
  try {
    await AsyncStorage.setItem("accessToken", accessToken);
  } catch (error) {
    console.log(error);
  }
}

export async function loadToken() {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    return accessToken !== null ? accessToken : null;
  } catch (error) {
    console.log(error);
  }
}

export async function removeToken() {
  try {
    await AsyncStorage.removeItem("accessToken");
  } catch (error) {
    console.log(error);
  }
}

export async function saveUser(user: any) {
  try {
    await AsyncStorage.setItem("customer", JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
}

export async function loadUser() {
  try {
    const userData = await AsyncStorage.getItem("customer");
    return userData !== null ? JSON.parse(userData) : null;
  } catch (error) {
    console.log(error);
  }
}

export async function removeUser() {
  try {
    await AsyncStorage.removeItem("customer");
  } catch (error) {
    console.log(error);
  }
}

export async function saveLanguageApp(language: string) {
  try {
    await AsyncStorage.setItem("appLanguage", language);
  } catch (error) {
    console.log(error);
  }
}

export async function loadLanguageApp() {
  try {
    const appLanguage = await AsyncStorage.getItem("appLanguage");
    return appLanguage !== null ? appLanguage : null;
  } catch (error) {
    console.log(error);
  }
}
