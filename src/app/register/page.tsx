"use client";

import {useRef, useState} from "react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {ThemeToggle} from "@/components/ThemeToggle";
import {cn} from "@/lib/utils";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {lastStep, sendVerificationCode, verifyCode} from "@/api/auth/email.api";
import useMyNotice from "@/hooks/useMyNotice";
import NoticeEnum from "@/enums/NoticeEnum";
import {Spinner} from "@/helper/tsx/Spinner";
import {AxiosError} from "axios";
import useUser from "@/store/useUser";
import {useRouter} from "next/navigation";

const steps = [
    {title: "Account", description: "Create your account"},
    {title: "Verify", description: "Verify your email"},
    {title: "Profile", description: "Complete your profile"},
];

const accountSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

const profileSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
});

const verificationSchema = z.object({
    code: z.string().length(6, "Verification code must be 6 digits").regex(/^\d+$/, "Only numbers are allowed"),
});

export default function RegisterPage() {
    const [step, setStep] = useState(0);
    const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
    const [verificationError, setVerificationError] = useState("");
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const {showMessage} = useMyNotice();
    const [loadings, setLoadings] = useState({
        sendVerificationCodeLoading: false,
        verifyCodeLoading: false,
        lastStepLoading: false,
    });
    const setUser = useUser(state => state.setUser);
    const router = useRouter();

    const accountForm = useForm({
        resolver: zodResolver(accountSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const profileForm = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
        },
    });

    const handleVerificationCodeChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        if (value.length > 1) return;

        const newCode = [...verificationCode];
        newCode[index] = value;
        setVerificationCode(newCode);
        setVerificationError("");

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').trim();

        if (!/^\d+$/.test(pastedData)) {
            setVerificationError("Only numbers are allowed");
            return;
        }

        const digits = pastedData.slice(0, 6).split('');

        const newCode = [...verificationCode];
        digits.forEach((digit, index) => {
            if (index < 6) {
                newCode[index] = digit;
            }
        });

        setVerificationCode(newCode);
        setVerificationError("");

        const nextEmptyIndex = newCode.findIndex(digit => !digit);
        const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
        inputRefs.current[focusIndex]?.focus();
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const validateVerificationCode = () => {
        const code = verificationCode.join('');
        try {
            verificationSchema.parse({code});
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                setVerificationError(error.errors[0].message);
            }
            return false;
        }
    };

    const next = async () => {
        if (step === 0) {
            const isValid = await accountForm.trigger();
            if (!isValid) return;

            setLoadings({...loadings, sendVerificationCodeLoading: true});
            const toastRef = {};

            try {
                showMessage("Sending verification code...", NoticeEnum.LOADING, undefined, toastRef);
                const response = await sendVerificationCode(accountForm.getValues().email, accountForm.getValues().password);
                showMessage(response.data, NoticeEnum.SUCCESS, undefined, toastRef);
            } catch (e) {
                if (e instanceof AxiosError) {
                    if (e.response?.status === 409)
                        showMessage("You used all the verification codes", NoticeEnum.ERROR, undefined, toastRef);
                    return;
                }
                showMessage("Something went wrong. Try again!", NoticeEnum.ERROR, undefined, toastRef)
                return;
            } finally {
                setLoadings({...loadings, sendVerificationCodeLoading: false});
            }
        } else if (step === 1) {
            const isValid = validateVerificationCode();
            if (!isValid) return;

            setLoadings({...loadings, verifyCodeLoading: true});
            const toastRef = {};

            try {
                showMessage("Verifying code...", NoticeEnum.LOADING, undefined, toastRef);
                const response = await verifyCode(accountForm.getValues().email, verificationCode.join(''), accountForm.getValues().password);
                showMessage(response.data, NoticeEnum.SUCCESS, undefined, toastRef);
            } catch (e) {
                if (e instanceof AxiosError) {
                    if (e.response?.status === 409)
                        showMessage(e.response.data.message, NoticeEnum.ERROR, undefined, toastRef);
                    else if (e.response?.status === 404)
                        showMessage("There is no this verification code for this email.", NoticeEnum.ERROR, undefined, toastRef);
                    return;
                }
                showMessage("Something went wrong. Try again!", NoticeEnum.ERROR, undefined, toastRef)
                return;
            } finally {
                setLoadings({...loadings, verifyCodeLoading: false});
            }
        } else if (step === 2) {
            const isValid = await profileForm.trigger();
            if (!isValid) return;

            setLoadings({...loadings, lastStepLoading: true});
            const toastRef = {};

            try {
                showMessage("Creating account...", NoticeEnum.LOADING, undefined, toastRef);
                const response = await lastStep(accountForm.getValues().email, verificationCode.join(''), accountForm.getValues().password, profileForm.getValues().firstName, profileForm.getValues().lastName);
                setUser(response.data);
                showMessage(response.message, NoticeEnum.SUCCESS, undefined, toastRef);
                router.push("/chat");
            } catch (e) {
                if (e instanceof AxiosError) {
                    if (e.response?.status === 409)
                        showMessage(e.response.data.message, NoticeEnum.ERROR, undefined, toastRef);
                    else if (e.response?.status === 400)
                        showMessage("There is no verification code.", NoticeEnum.ERROR, undefined, toastRef);
                    return;
                }
                showMessage("Something went wrong. Try again!", NoticeEnum.ERROR, undefined, toastRef)
                return;
            } finally {
                setLoadings({...loadings, lastStepLoading: false});
            }
        }
        setStep((s) => Math.min(s + 1, 2));
    };

    const prev = () => setStep((s) => {
        if (s === 1) {
            setVerificationCode(["", "", "", "", "", ""]);
            setVerificationError("");
        } else if (s === 2) {
            profileForm.reset();
            setVerificationCode(["", "", "", "", "", ""]);
            setVerificationError("");
        }

        return Math.max(s - 1, 0);
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-4">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
                        <ThemeToggle/>
                    </div>
                    {/* Step Indicator */}
                    <div className="flex justify-between items-center relative">
                        {steps.map((s, i) => (
                            <div key={i} className="flex flex-col items-center relative z-10">
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                                    i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                )}>
                                    {i + 1}
                                </div>
                                <span className="text-xs mt-1 font-medium">{s.title}</span>
                            </div>
                        ))}
                        <div className="absolute top-4 left-0 right-0 h-0.5 bg-muted">
                            <div
                                className="h-full bg-primary transition-all duration-300"
                                style={{width: `${(step / (steps.length - 1)) * 100}%`}}
                            />
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6 pt-6">
                    {step === 0 && (
                        <form onSubmit={accountForm.handleSubmit(next)} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    className="h-10"
                                    {...accountForm.register("email")}
                                />
                                {accountForm.formState.errors.email && (
                                    <p className="text-sm text-red-500">{accountForm.formState.errors.email.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="h-10"
                                    {...accountForm.register("password")}
                                />
                                {accountForm.formState.errors.password && (
                                    <p className="text-sm text-red-500">{accountForm.formState.errors.password.message}</p>
                                )}
                            </div>
                        </form>
                    )}

                    {step === 1 && (
                        <div className="space-y-4">
                            <Label className="text-sm font-medium">Verification Code</Label>
                            <div className="flex gap-2 justify-center">
                                {verificationCode.map((digit, index) => (
                                    <Input
                                        key={index}
                                        ref={(el) => {
                                            inputRefs.current[index] = el;
                                        }}
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleVerificationCodeChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        onPaste={handlePaste}
                                        className="w-12 h-12 text-center text-lg"
                                    />
                                ))}
                            </div>
                            {verificationError && (
                                <p className="text-sm text-red-500 text-center">{verificationError}</p>
                            )}
                            <p className="text-sm text-muted-foreground text-center">
                                Enter the 6-digit code sent to your email
                            </p>
                        </div>
                    )}

                    {step === 2 && (
                        <form onSubmit={profileForm.handleSubmit(next)} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                                <Input
                                    id="firstName"
                                    type="text"
                                    placeholder="John"
                                    className="h-10"
                                    {...profileForm.register("firstName")}
                                />
                                {profileForm.formState.errors.firstName && (
                                    <p className="text-sm text-red-500">{profileForm.formState.errors.firstName.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                                <Input
                                    id="lastName"
                                    type="text"
                                    placeholder="Doe"
                                    className="h-10"
                                    {...profileForm.register("lastName")}
                                />
                                {profileForm.formState.errors.lastName && (
                                    <p className="text-sm text-red-500">{profileForm.formState.errors.lastName.message}</p>
                                )}
                            </div>
                        </form>
                    )}
                </CardContent>

                <CardFooter className="flex justify-between pt-6">
                    {step != 0 && <Button
                        variant="ghost"
                        onClick={prev}
                        disabled={step === 0 || loadings.sendVerificationCodeLoading || loadings.verifyCodeLoading || loadings.lastStepLoading}
                        className="h-10"
                    >
                        Back
                    </Button>}
                    <Button
                        disabled={loadings.sendVerificationCodeLoading || loadings.verifyCodeLoading || loadings.lastStepLoading}
                        onClick={next}
                        className="h-10"
                    >
                        {step < 2 ? "Next" : "Complete"}
                        {loadings.sendVerificationCodeLoading || loadings.verifyCodeLoading || loadings.lastStepLoading ? (<>
                            <Spinner/>
                        </>) : null}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}