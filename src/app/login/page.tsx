"use client";

import {useState} from "react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {ThemeToggle} from "@/components/ThemeToggle";
import {Checkbox} from "@/components/ui/checkbox";
import Link from "next/link";
import {validateEmail} from "@/helper/ts/EmailChecker";
import {AxiosError} from "axios";
import useMyNotice from "@/hooks/useMyNotice";
import NoticeEnum from "@/enums/NoticeEnum";
import {login} from "@/api/auth/auth.api";
import useUser from "@/store/useUser";
import {useRouter} from "next/navigation";
import {Spinner} from "@/helper/tsx/Spinner";

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false
    });
    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState<boolean>(false);
    const {showMessage} = useMyNotice();
    const setUser = useUser(state => state.setUser);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = {
            email: !formData.email ? "Email is required" : (!validateEmail(formData.email) ? "Email is not valid" : ""),
            password: !formData.password ? "Password is required" : ""
        };
        setErrors(newErrors);

        if (!newErrors.email && !newErrors.password) {
            const toastRef = {};

            showMessage("Logging in...", NoticeEnum.LOADING, undefined, toastRef);
            setLoading(true);

            try {
                const response = await login(formData.email, formData.password);
                showMessage(response.message, NoticeEnum.SUCCESS, undefined, toastRef);
                setUser(response.data);
                if (formData.rememberMe) {
                    localStorage.setItem("rememberedEmail", formData.email);
                } else {
                    localStorage.removeItem("rememberedEmail");
                }
                setFormData({
                    email: "",
                    password: "",
                    rememberMe: false
                });
                router.push("/chat");
            } catch (e) {
                if (e instanceof AxiosError)
                    showMessage("Something went wrong, please try again later.", NoticeEnum.ERROR, undefined, toastRef);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, type, checked} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-2">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-3xl font-bold">Welcome back</CardTitle>
                        <ThemeToggle/>
                    </div>
                    <p className="text-muted-foreground">Enter your credentials to access your account</p>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="text"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className={`mt-2 ${errors.email ? "border-red-500" : ""}`}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">{errors.email}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                className={errors.password ? "border-red-500" : ""}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500">{errors.password}</p>
                            )}
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="rememberMe"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onCheckedChange={(checked) =>
                                        setFormData(prev => ({...prev, rememberMe: checked as boolean}))
                                    }
                                />
                                <Label htmlFor="rememberMe" className="text-sm">Remember me</Label>
                            </div>
                            <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button disabled={loading} type="submit" className="w-full" size="lg">
                            Login {loading ? <Spinner/> : null}
                        </Button>
                        <p className="text-sm text-center text-muted-foreground">
                            Don't have an account?{" "}
                            <Link href="/register" className="text-primary hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}