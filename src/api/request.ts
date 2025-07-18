import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import Cookies from "js-cookie";
import BASE_URL from "@/constants/url";

const $api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {"Content-Type": "application/json"},
    timeout: 10000,
});

let isRefreshing = false;
let pendingRequests: Array<(token: string) => void> = [];

$api.interceptors.request.use((config) => {
    const token = Cookies.get("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

$api.interceptors.response.use(
    (res: AxiosResponse) => res,
    async (error: AxiosError) => {
        const originalReq = error.config as AxiosRequestConfig & {
            _retry?: boolean;
        };
        if (error.response?.status === 401 && !originalReq._retry) {
            originalReq._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const {data} = await axios.post(
                        `${BASE_URL}/api/v1/auth/refresh`,
                        {},
                        {withCredentials: true},
                    );

                    const newToken = data.data.token;

                    Cookies.set("token", newToken, {secure: true, sameSite: "lax"});

                    pendingRequests.forEach((cb) => cb(newToken));
                    pendingRequests = [];
                } catch (refreshError) {
                    Cookies.remove("token");
                    Cookies.remove("user");
                    window.location.href = "/login";
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }

            return new Promise((resolve) => {
                pendingRequests.push((token: string) => {
                    if (!originalReq.headers) originalReq.headers = {};
                    originalReq.headers.Authorization = `Bearer ${token}`;
                    resolve(axios(originalReq));
                });
            });
        }

        if (error.response?.status === 403) window.location.href = "/forbidden";

        return Promise.reject(error);
    },
);

export default $api;