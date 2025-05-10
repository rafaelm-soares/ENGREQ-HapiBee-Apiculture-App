/*
* JavaScript Cookies - https://www.w3schools.com/js/js_cookies.asp
* SameSite=None - https://developers.google.com/search/blog/2020/01/get-ready-for-new-samesitenone-secure
* SameSite=None; Secure - https://web.dev/samesite-cookies-explained/
*/

export function setCookie(cookieName: string, cookieValue: string, expirationDays?: number) {
  let expires: string = '';
  if (!!expirationDays) {
    const d: Date = new Date();
    d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    expires = "expires=" + d.toUTCString() + ';';
  }
  let cookieDomain = "";
  let cookieSecure = "";
  if (process.env.NODE_ENV === "production") {
    cookieDomain = "domain=.website.com;";
    cookieSecure = "secure;samesite=none;";
  } else {
    cookieDomain = "domain=localhost;";
    cookieSecure = "";
  }
  const cookieParameter = cookieName + "=" + cookieValue + ";";
  document.cookie = cookieParameter + expires + "path=/;" + cookieDomain + cookieSecure;
}

export function getCookie(cookieName: string) {
  const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(cookieName + '=')) {
            return cookie.substring(cookieName.length + 1);
        }
    }
    return null;
}