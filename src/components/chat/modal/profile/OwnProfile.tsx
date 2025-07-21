// components/OwnProfile.tsx
"use client";

import {useState, useEffect} from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs";
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {useTheme} from "next-themes";
import {
    User as UserIcon,
    Lock,
    Eye,
    Bell,
    Moon,
    Sun,
    Trash,
    LogOut,
    Database,
    Download,
    Upload,
    ShieldCheck,
    Smartphone,
    Globe,
    MessageCircle,
    ImageIcon,
    FileText,
    Palette,
    Key,
    Volume2,
    UserPlus,
    Shield,
    Folder,
    LockIcon,
    Calendar,
    Bot,
    Sticker,
    QrCode,
    History,
    CheckCircle,
    RefreshCw,
    Phone,
    Webhook,
    Bookmark,
    Wallet,
    ClipboardList,
    Link,
    Users,
    File,
    CircleDollarSign,
    BadgeCheck,
    Server,
    CreditCard,
    HardDrive,
    ChevronDown,
    ChevronUp,
    Plus,
    X,
    AlertTriangle,
    VolumeX,
    Wrench,
    GitBranch,
    Terminal,
    Cpu,
    MemoryStick,
    Network,
    FileSearch,
    FileKey,
    FileLock,
    FileBarChart,
    FileCode,
    FileSpreadsheet,
    FileX,
    FileDigit,
} from "lucide-react";
import {Slider} from "@/components/ui/slider";
import {Progress} from "@/components/ui/progress";
import {Badge} from "@/components/ui/badge";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Collapsible, CollapsibleTrigger, CollapsibleContent} from "@/components/ui/collapsible";
import {formatBytes} from "@/lib/utils";

export default function OwnProfile() {
    type TabKey =
        | "profile"
        | "account"
        | "privacy"
        | "notifications"
        | "appearance"
        | "chat"
        | "storage"
        | "security"
        | "advanced";

    const [tab, setTab] = useState<TabKey>("profile");
    const {theme, setTheme} = useTheme();
    const [fontSize, setFontSize] = useState(16);
    const [passcodeLock, setPasscodeLock] = useState(false);
    const [autoLockTimer, setAutoLockTimer] = useState("1m");
    const [language, setLanguage] = useState("en");
    const [notificationExceptions, setNotificationExceptions] = useState(false);
    const [savedMessages, setSavedMessages] = useState(false);
    const [autoDeleteTimer, setAutoDeleteTimer] = useState("off");
    const [syncSettings, setSyncSettings] = useState(false);
    const [qrCode, setQrCode] = useState("");
    const [isSessionExpanded, setIsSessionExpanded] = useState(false);
    const [isPremium, setIsPremium] = useState(true);
    const [activeDevices, setActiveDevices] = useState(3);
    const [contactSync, setContactSync] = useState(true);
    const [messageTranslation, setMessageTranslation] = useState(true);
    const [bubbleStyle, setBubbleStyle] = useState("rounded");
    const [enterKeyBehavior, setEnterKeyBehavior] = useState("send");
    const [typingPrivacy, setTypingPrivacy] = useState("everyone");
    const [streamingQuality, setStreamingQuality] = useState("hd");
    const [autoNightMode, setAutoNightMode] = useState(true);
    const [sensitiveContent, setSensitiveContent] = useState(false);
    const [voiceMessageQuality, setVoiceMessageQuality] = useState("normal");
    const [callPrivacy, setCallPrivacy] = useState("contacts");
    const [themeColor, setThemeColor] = useState("blue");
    const [themeAccent, setThemeAccent] = useState("default");
    const [animationIntensity, setAnimationIntensity] = useState(3);
    const [autoSaveMedia, setAutoSaveMedia] = useState(false);
    const [showRecentStickers, setShowRecentStickers] = useState(true);
    const [scheduledMessages, setScheduledMessages] = useState(false);
    const [messageScheduling, setMessageScheduling] = useState(false);
    const [chatFolders, setChatFolders] = useState(false);
    const [spellCheck, setSpellCheck] = useState(true);
    const [autoPlayGifs, setAutoPlayGifs] = useState(true);
    const [autoPlayVideos, setAutoPlayVideos] = useState(false);
    const [saveToGallery, setSaveToGallery] = useState(true);
    const [showMessageSeconds, setShowMessageSeconds] = useState(false);
    const [largeEmoji, setLargeEmoji] = useState(false);
    const [suggestStickers, setSuggestStickers] = useState(true);
    const [suggestEmoji, setSuggestEmoji] = useState(true);
    const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(true);
    const [autoDownload, setAutoDownload] = useState({
        photos: "all",
        videos: "wifi",
        files: "wifi",
        voice: "all",
    });
    const [autoDeleteSettings, setAutoDeleteSettings] = useState({
        account: "never",
        messages: "never",
        cache: "30d",
    });
    const [paymentMethods, setPaymentMethods] = useState([
        {id: "1", type: "visa", last4: "4242", expiry: "12/24"},
        {id: "2", type: "paypal", email: "john@example.com"},
    ]);
    const [subscriptionStatus, setSubscriptionStatus] = useState({
        plan: "Premium",
        expires: "2024-12-31",
        storage: "2 TB",
        features: ["No Ads", "Premium Badge", "Advanced Chat Features"],
    });
    const [apiKeys, setApiKeys] = useState([
        {id: "1", name: "Web App", key: "sk_*****dEf", created: "2023-01-15", lastUsed: "2023-10-20"},
        {id: "2", name: "Mobile API", key: "sk_*****AbC", created: "2023-03-22", lastUsed: "2023-10-18"},
    ]);
    const [integrationSettings, setIntegrationSettings] = useState([
        {id: "1", name: "Google Drive", connected: true, lastSynced: "2 hours ago"},
        {id: "2", name: "Dropbox", connected: false, lastSynced: "Never"},
        {id: "3", name: "Slack", connected: true, lastSynced: "5 minutes ago"},
    ]);
    const [advancedSettings, setAdvancedSettings] = useState({
        hardwareAcceleration: true,
        lowBandwidthMode: false,
        disableAnimations: false,
        experimentalFeatures: false,
        developerMode: false,
        logLevel: "info",
    });
    const [networkUsage, setNetworkUsage] = useState({
        sent: 245,
        received: 1872,
        calls: 342,
        lastReset: "2023-10-01",
    });

    // fake active sessions
    const [sessions, setSessions] = useState<
        {
            id: string;
            device: string;
            location: string;
            lastActive: string;
            current: boolean;
            ip: string;
            platform: string
        }[]
    >([]);

    // Storage stats
    const [storageStats, setStorageStats] = useState({
        total: 2048,
        used: 724,
        media: 512,
        documents: 128,
        cache: 84,
    });

    // Notification sounds
    const [notificationSound, setNotificationSound] = useState("default");
    const [messageSound, setMessageSound] = useState("chime");
    const [callSound, setCallSound] = useState("ringtone");
    const [vibrate, setVibrate] = useState(true);
    const [volume, setVolume] = useState(80);

    // Backup settings
    const [backupFrequency, setBackupFrequency] = useState("weekly");
    const [backupLocation, setBackupLocation] = useState("cloud");
    const [lastBackup, setLastBackup] = useState("2023-10-20 14:30:45");
    const [encryptBackups, setEncryptBackups] = useState(true);

    // Security settings
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [loginAlerts, setLoginAlerts] = useState(true);
    const [passwordChangeReminder, setPasswordChangeReminder] = useState("3m");
    const [sessionTimeout, setSessionTimeout] = useState("30m");

    // Privacy settings
    const [phonePrivacy, setPhonePrivacy] = useState("contacts");
    const [emailPrivacy, setEmailPrivacy] = useState("contacts");
    const [presencePrivacy, setPresencePrivacy] = useState("everyone");
    const [groupPrivacy, setGroupPrivacy] = useState("contacts");
    const [forwardPrivacy, setForwardPrivacy] = useState("contacts");

    // Appearance settings
    const [themeMode, setThemeMode] = useState(theme);
    const [chatDensity, setChatDensity] = useState("normal");
    const [messageBubble, setMessageBubble] = useState("rounded");
    const [backgroundImage, setBackgroundImage] = useState("default");
    const [emojiSet, setEmojiSet] = useState("apple");

    // Chat settings
    const [chatHistory, setChatHistory] = useState("keep");
    const [draftTimeout, setDraftTimeout] = useState("15m");
    const [linkPreview, setLinkPreview] = useState(true);
    const [spoileredMedia, setSpoileredMedia] = useState(false);

    useEffect(() => {
        setSessions([
            {
                id: "1",
                device: "Chrome on Windows",
                location: "Tashkent, UZ",
                lastActive: "5 minutes ago",
                current: true,
                ip: "192.168.1.5",
                platform: "Windows 11"
            },
            {
                id: "2",
                device: "iPhone 14",
                location: "New York, US",
                lastActive: "2 hours ago",
                current: false,
                ip: "172.56.23.198",
                platform: "iOS 16"
            },
            {
                id: "3",
                device: "Android Tablet",
                location: "London, UK",
                lastActive: "3 days ago",
                current: false,
                ip: "89.207.132.76",
                platform: "Android 13"
            },
        ]);

        // Generate fake QR code data URL
        setQrCode("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f0f0f0'/%3E%3Cpath d='M40 40h20v20H40zM80 40h20v20H80zM120 40h20v20h-20zM40 80h20v20H40zM120 80h20v20h-20zM40 120h20v20H40zM80 120h20v20H80zM120 120h20v20h-20z' fill='%23000'/%3E%3C/svg%3E");
    }, []);

    const handleClearCache = () => {
        // Simulate clearing cache
        setStorageStats({
            ...storageStats,
            cache: 0,
            used: storageStats.used - storageStats.cache
        });
    };

    const terminateAllSessions = () => {
        setSessions(sessions.filter(session => session.current));
    };

    const revokeApiKey = (id: string) => {
        setApiKeys(apiKeys.filter(key => key.id !== id));
    };

    const toggleIntegration = (id: string) => {
        setIntegrationSettings(integrationSettings.map(int =>
            int.id === id ? {...int, connected: !int.connected} : int
        ));
    };

    const addPaymentMethod = () => {
        setPaymentMethods([
            ...paymentMethods,
            {id: `${paymentMethods.length + 1}`, type: "mastercard", last4: "5678", expiry: "06/25"}
        ]);
    };

    const removePaymentMethod = (id: string) => {
        setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    };

    const handleVolumeChange = (value: number[]) => {
        setVolume(value[0]);
    };

    const handleAutoDownloadChange = (type: string, value: string) => {
        setAutoDownload({
            ...autoDownload,
            [type]: value
        });
    };

    const handleAutoDeleteChange = (type: string, value: string) => {
        setAutoDeleteSettings({
            ...autoDeleteSettings,
            [type]: value
        });
    };

    const toggleAdvancedSetting = (setting: string) => {
        setAdvancedSettings({
            ...advancedSettings,
            [setting]: !(advancedSettings as any)[setting]
        });
    };

    return (
        <Dialog open>
            <DialogContent className="w-[800px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Account Settings</DialogTitle>
                    <DialogDescription>
                        Manage your profile, privacy, security, and preferences
                    </DialogDescription>
                </DialogHeader>

                <Tabs
                    value={tab}
                    onValueChange={setTab}
                    className="mt-4 overflow-x-auto"
                >
                    <TabsList className="grid grid-cols-9 min-w-max">
                        <TabsTrigger value="profile">
                            <UserIcon className="mr-1 inline-block size-4"/>
                            Profile
                        </TabsTrigger>
                        <TabsTrigger value="account">
                            <Lock className="mr-1 inline-block size-4"/>
                            Account
                        </TabsTrigger>
                        <TabsTrigger value="privacy">
                            <Eye className="mr-1 inline-block size-4"/>
                            Privacy
                        </TabsTrigger>
                        <TabsTrigger value="notifications">
                            <Bell className="mr-1 inline-block size-4"/>
                            Notifications
                        </TabsTrigger>
                        <TabsTrigger value="appearance">
                            <Palette className="mr-1 inline-block size-4"/>
                            Appearance
                        </TabsTrigger>
                        <TabsTrigger value="chat">
                            <MessageCircle className="mr-1 inline-block size-4"/>
                            Chat
                        </TabsTrigger>
                        <TabsTrigger value="storage">
                            <Database className="mr-1 inline-block size-4"/>
                            Storage
                        </TabsTrigger>
                        <TabsTrigger value="security">
                            <ShieldCheck className="mr-1 inline-block size-4"/>
                            Security
                        </TabsTrigger>
                        <TabsTrigger value="advanced">
                            <Wrench className="mr-1 inline-block size-4"/>
                            Advanced
                        </TabsTrigger>
                    </TabsList>

                    {/* PROFILE */}
                    <TabsContent value="profile" className="space-y-6 p-4">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Avatar className="size-24 border-2 border-primary">
                                    <AvatarImage src="/avatar.png" alt="avatar"/>
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                {isPremium && (
                                    <div
                                        className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full p-1">
                                        <BadgeCheck className="size-5 text-white"/>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <Button>Change Avatar</Button>
                                    <Button variant="outline">
                                        <ImageIcon className="mr-2 size-4"/>
                                        Edit Profile Photo
                                    </Button>
                                </div>
                                <Button variant="outline">
                                    <QrCode className="mr-2 size-4"/>
                                    Share Profile QR
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" defaultValue="John"/>
                            </div>
                            <div>
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" defaultValue="Doe"/>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="username">Username</Label>
                            <div className="flex gap-2">
                                <Input id="username" defaultValue="john_doe" className="flex-1"/>
                                <Button variant="outline" size="sm">
                                    <RefreshCw className="mr-1 size-4"/>
                                    Check Availability
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Your profile link: chat-app.com/john_doe
                            </p>
                        </div>

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <div className="flex gap-2">
                                <Input id="email" type="email" defaultValue="john@example.com" className="flex-1"/>
                                <Button variant="outline" size="sm">
                                    <RefreshCw className="mr-1 size-4"/>
                                    Verify
                                </Button>
                            </div>
                            <div className="flex items-center mt-1 text-xs text-green-500">
                                <CheckCircle className="mr-1 size-4"/>
                                <span>Verified</span>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" type="tel" defaultValue="+998 90 123 4567"/>
                            <p className="text-xs text-muted-foreground mt-1">
                                This phone number is connected to your account
                            </p>
                        </div>

                        <div>
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                                id="bio"
                                defaultValue="Just another chat enthusiast."
                                maxLength={140}
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                                Max 140 characters
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Profile Badges</Label>
                                <div className="flex gap-2 mt-2">
                                    <Badge variant="premium" className="flex items-center gap-1">
                                        <BadgeCheck className="size-4"/> Premium
                                    </Badge>
                                    <Badge variant="secondary" className="flex items-center gap-1">
                                        <Calendar className="size-4"/> Member since 2021
                                    </Badge>
                                </div>
                            </div>
                            <div>
                                <Label>Profile Theme</Label>
                                <div className="flex gap-2 mt-2">
                                    <Button variant="outline" size="sm">
                                        <Palette className="mr-2 size-4"/>
                                        Customize
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <Button variant="outline">
                                <History className="mr-2 size-4"/>
                                View Edit History
                            </Button>
                            <Button variant="primary">Save Profile</Button>
                        </div>
                    </TabsContent>

                    {/* ACCOUNT */}
                    <TabsContent value="account" className="space-y-6 p-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CircleDollarSign className="size-5"/>
                                    Premium Subscription
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">{subscriptionStatus.plan}</p>
                                        <p className="text-sm text-muted-foreground">
                                            Renews
                                            on {subscriptionStatus.expires} • {subscriptionStatus.storage} Storage
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline">Manage</Button>
                                        <Button variant="destructive">Cancel</Button>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <h4 className="font-medium mb-2">Premium Features</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {subscriptionStatus.features.map((feature, index) => (
                                            <div key={index} className="flex items-center">
                                                <CheckCircle className="size-4 text-green-500 mr-2"/>
                                                <span className="text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="border rounded-lg p-4">
                            <h3 className="font-medium flex items-center gap-2">
                                <CreditCard className="size-5"/>
                                Payment Methods
                            </h3>
                            <div className="mt-4 space-y-3">
                                {paymentMethods.map(method => (
                                    <div key={method.id}
                                         className="flex items-center justify-between border rounded p-3">
                                        <div className="flex items-center gap-3">
                                            {method.type === "visa" && (
                                                <div className="bg-blue-500 text-white p-1 rounded">
                                                    <CreditCard className="size-5"/>
                                                </div>
                                            )}
                                            {method.type === "paypal" && (
                                                <div className="bg-blue-700 text-white p-1 rounded">
                                                    <Wallet className="size-5"/>
                                                </div>
                                            )}
                                            {method.type === "mastercard" && (
                                                <div className="bg-red-500 text-white p-1 rounded">
                                                    <CreditCard className="size-5"/>
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-medium capitalize">{method.type}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {method.last4 ? `•••• ${method.last4}` : method.email}
                                                </p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removePaymentMethod(method.id)}
                                        >
                                            <X className="size-4"/>
                                        </Button>
                                    </div>
                                ))}
                                <Button variant="outline" className="w-full mt-2" onClick={addPaymentMethod}>
                                    <Plus className="mr-2 size-4"/>
                                    Add Payment Method
                                </Button>
                            </div>
                        </div>

                        <div className="border rounded-lg p-4">
                            <h3 className="font-medium flex items-center gap-2">
                                <Key className="mr-1 size-5"/>
                                Login & Security
                            </h3>
                            <div className="mt-4 space-y-4">
                                <div>
                                    <Label htmlFor="currentPassword">Current Password</Label>
                                    <Input
                                        id="currentPassword"
                                        type="password"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="newPassword">New Password</Label>
                                    <Input id="newPassword" type="password" placeholder="••••••••"/>
                                </div>
                                <div>
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <Button>Change Password</Button>
                            </div>
                        </div>

                        <div className="border rounded-lg p-4">
                            <h3 className="font-medium flex items-center gap-2">
                                <Globe className="mr-1 size-5"/>
                                Account Actions
                            </h3>
                            <div className="mt-4 space-y-3">
                                <Button variant="outline" className="w-full">
                                    <QrCode className="mr-2 size-4"/>
                                    Set Up Login QR Code
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <UserPlus className="mr-2 size-4"/>
                                    Add Account
                                </Button>
                                <Button variant="destructive" className="w-full">
                                    <Trash className="mr-2 size-4"/>
                                    Delete Account
                                </Button>
                                <div className="text-xs text-muted-foreground mt-2">
                                    Account deletion will be reversible for 30 days. After that, all data will be
                                    permanently removed.
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* PRIVACY */}
                    <TabsContent value="privacy" className="space-y-6 p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border rounded-lg p-4">
                                <h3 className="font-medium mb-4">Privacy Settings</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Show online status</p>
                                            <p className="text-xs text-muted-foreground">
                                                Let others see when you’re online
                                            </p>
                                        </div>
                                        <Switch defaultChecked/>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Read receipts</p>
                                            <p className="text-xs text-muted-foreground">
                                                Allow read receipts in chats
                                            </p>
                                        </div>
                                        <Switch defaultChecked/>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Sync contacts</p>
                                            <p className="text-xs text-muted-foreground">
                                                Automatically sync your device contacts
                                            </p>
                                        </div>
                                        <Switch checked={contactSync} onCheckedChange={setContactSync}/>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Message translation</p>
                                            <p className="text-xs text-muted-foreground">
                                                Automatically translate messages
                                            </p>
                                        </div>
                                        <Switch checked={messageTranslation} onCheckedChange={setMessageTranslation}/>
                                    </div>
                                </div>
                            </div>

                            <div className="border rounded-lg p-4">
                                <h3 className="font-medium mb-4">Visibility Settings</h3>
                                <div className="space-y-4">
                                    <div>
                                        <Label>Who can see my phone number</Label>
                                        <Select value={phonePrivacy} onValueChange={setPhonePrivacy}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="everyone">Everyone</SelectItem>
                                                <SelectItem value="contacts">My Contacts</SelectItem>
                                                <SelectItem value="nobody">Nobody</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label>Who can see my email</Label>
                                        <Select value={emailPrivacy} onValueChange={setEmailPrivacy}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="everyone">Everyone</SelectItem>
                                                <SelectItem value="contacts">My Contacts</SelectItem>
                                                <SelectItem value="nobody">Nobody</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label>Who can see my last seen</Label>
                                        <Select value={presencePrivacy} onValueChange={setPresencePrivacy}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="everyone">Everyone</SelectItem>
                                                <SelectItem value="contacts">My Contacts</SelectItem>
                                                <SelectItem value="nobody">Nobody</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border rounded-lg p-4">
                            <h3 className="font-medium mb-4">Advanced Privacy</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label>Who can add me to groups</Label>
                                    <Select value={groupPrivacy} onValueChange={setGroupPrivacy}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="everyone">Everyone</SelectItem>
                                            <SelectItem value="contacts">My Contacts</SelectItem>
                                            <SelectItem value="nobody">Nobody</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label>Forwarded message privacy</Label>
                                    <Select value={forwardPrivacy} onValueChange={setForwardPrivacy}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="everyone">Everyone</SelectItem>
                                            <SelectItem value="contacts">My Contacts</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label>Who can call me</Label>
                                    <Select value={callPrivacy} onValueChange={setCallPrivacy}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="everyone">Everyone</SelectItem>
                                            <SelectItem value="contacts">My Contacts</SelectItem>
                                            <SelectItem value="nobody">Nobody</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label>Typing indicators</Label>
                                    <Select value={typingPrivacy} onValueChange={setTypingPrivacy}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="everyone">Show to everyone</SelectItem>
                                            <SelectItem value="contacts">Show to contacts only</SelectItem>
                                            <SelectItem value="nobody">Hide completely</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between border rounded-lg p-4">
                            <div>
                                <p className="font-medium">Sensitive content filter</p>
                                <p className="text-xs text-muted-foreground">
                                    Block potentially sensitive content
                                </p>
                            </div>
                            <Switch
                                checked={sensitiveContent}
                                onCheckedChange={setSensitiveContent}
                            />
                        </div>

                        <div className="flex justify-between">
                            <Button variant="outline">
                                <Users className="mr-2 size-4"/>
                                Manage Blocked Users
                            </Button>
                            <Button variant="destructive">
                                <Trash className="mr-2 size-4"/>
                                Clear All Chat History
                            </Button>
                        </div>
                    </TabsContent>

                    {/* NOTIFICATIONS */}
                    <TabsContent value="notifications" className="space-y-6 p-4">
                        <div className="border rounded-lg p-4">
                            <h3 className="font-medium mb-4">Notification Preferences</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Message notifications</p>
                                        <p className="text-xs text-muted-foreground">
                                            Alert me about new messages
                                        </p>
                                    </div>
                                    <Switch defaultChecked/>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Group notifications</p>
                                        <p className="text-xs text-muted-foreground">
                                            Notify me about group activity
                                        </p>
                                    </div>
                                    <Switch defaultChecked/>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Call notifications</p>
                                        <p className="text-xs text-muted-foreground">
                                            Alert me about incoming calls
                                        </p>
                                    </div>
                                    <Switch defaultChecked/>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Notification preview</p>
                                        <p className="text-xs text-muted-foreground">
                                            Show message content in notifications
                                        </p>
                                    </div>
                                    <Switch defaultChecked/>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Notification exceptions</p>
                                        <p className="text-xs text-muted-foreground">
                                            Customize notifications for specific chats
                                        </p>
                                    </div>
                                    <Switch
                                        checked={notificationExceptions}
                                        onCheckedChange={setNotificationExceptions}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border rounded-lg p-4">
                                <h3 className="font-medium mb-4">Sounds & Vibration</h3>
                                <div className="space-y-4">
                                    <div>
                                        <Label>Notification sound</Label>
                                        <Select value={notificationSound} onValueChange={setNotificationSound}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select sound"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="default">Default</SelectItem>
                                                <SelectItem value="chime">Chime</SelectItem>
                                                <SelectItem value="ding">Ding</SelectItem>
                                                <SelectItem value="pop">Pop</SelectItem>
                                                <SelectItem value="trill">Trill</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label>Message sound</Label>
                                        <Select value={messageSound} onValueChange={setMessageSound}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select sound"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="default">Default</SelectItem>
                                                <SelectItem value="chime">Chime</SelectItem>
                                                <SelectItem value="ding">Ding</SelectItem>
                                                <SelectItem value="pop">Pop</SelectItem>
                                                <SelectItem value="trill">Trill</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label>Call ringtone</Label>
                                        <Select value={callSound} onValueChange={setCallSound}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select ringtone"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="ringtone">Default Ringtone</SelectItem>
                                                <SelectItem value="digital">Digital</SelectItem>
                                                <SelectItem value="classic">Classic Bell</SelectItem>
                                                <SelectItem value="melody">Melody</SelectItem>
                                                <SelectItem value="vibrate">Vibrate Only</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Vibrate</p>
                                            <p className="text-xs text-muted-foreground">
                                                Vibrate for notifications
                                            </p>
                                        </div>
                                        <Switch
                                            checked={vibrate}
                                            onCheckedChange={setVibrate}
                                        />
                                    </div>

                                    <div>
                                        <Label>Volume</Label>
                                        <div className="flex items-center gap-3 mt-2">
                                            <VolumeX className="size-4 text-muted-foreground"/>
                                            <Slider
                                                defaultValue={[volume]}
                                                min={0}
                                                max={100}
                                                step={1}
                                                onValueChange={handleVolumeChange}
                                                className="flex-1"
                                            />
                                            <Volume2 className="size-4 text-muted-foreground"/>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Current volume: {volume}%
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="border rounded-lg p-4">
                                <h3 className="font-medium mb-4">Notification Channels</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Desktop notifications</p>
                                            <p className="text-xs text-muted-foreground">
                                                Notify me outside the app
                                            </p>
                                        </div>
                                        <Switch defaultChecked/>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Email notifications</p>
                                            <p className="text-xs text-muted-foreground">
                                                Send daily summary emails
                                            </p>
                                        </div>
                                        <Switch defaultChecked/>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Mobile notifications</p>
                                            <p className="text-xs text-muted-foreground">
                                                Push notifications to your phone
                                            </p>
                                        </div>
                                        <Switch defaultChecked/>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Badge counter</p>
                                            <p className="text-xs text-muted-foreground">
                                                Show unread count on app icon
                                            </p>
                                        </div>
                                        <Select defaultValue="all">
                                            <SelectTrigger className="w-32">
                                                <SelectValue placeholder="All"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All</SelectItem>
                                                <SelectItem value="unread">Unread Only</SelectItem>
                                                <SelectItem value="muted">Muted</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Do Not Disturb</p>
                                            <p className="text-xs text-muted-foreground">
                                                Silence notifications during specific hours
                                            </p>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            Configure
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {notificationExceptions && (
                            <div className="border rounded-lg p-4">
                                <h4 className="font-medium mb-2">Manage Notification Exceptions</h4>
                                <Button variant="outline" className="w-full">
                                    Configure Chat Notifications
                                </Button>
                            </div>
                        )}
                    </TabsContent>

                    {/* APPEARANCE */}
                    <TabsContent value="appearance" className="space-y-6 p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Theme</p>
                                        <p className="text-xs text-muted-foreground">
                                            Light / Dark mode
                                        </p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            const newTheme = theme === "light" ? "dark" : "light";
                                            setTheme(newTheme);
                                            setThemeMode(newTheme);
                                        }}
                                    >
                                        {theme === "light" ? (
                                            <Moon className="mr-1 size-4"/>
                                        ) : (
                                            <Sun className="mr-1 size-4"/>
                                        )}
                                        {theme === "light" ? "Dark" : "Light"}
                                    </Button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Auto-night theme</p>
                                        <p className="text-xs text-muted-foreground">
                                            Switch to dark theme at sunset
                                        </p>
                                    </div>
                                    <Switch
                                        checked={autoNightMode}
                                        onCheckedChange={setAutoNightMode}
                                    />
                                </div>

                                <div>
                                    <Label>Theme Color</Label>
                                    <div className="flex gap-2 mt-2">
                                        {["blue", "purple", "green", "red", "amber", "teal"].map(color => (
                                            <button
                                                key={color}
                                                className={`w-8 h-8 rounded-full bg-${color}-500 border-2 ${themeColor === color ? 'border-foreground' : 'border-transparent'}`}
                                                onClick={() => setThemeColor(color)}
                                                aria-label={`Select ${color} theme`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <Label>Accent Color</Label>
                                    <Select value={themeAccent} onValueChange={setThemeAccent}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Default"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="default">Default</SelectItem>
                                            <SelectItem value="vibrant">Vibrant</SelectItem>
                                            <SelectItem value="pastel">Pastel</SelectItem>
                                            <SelectItem value="monochrome">Monochrome</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label>Font Size</Label>
                                    <div className="flex items-center gap-4 mt-2">
                                        <span className="text-xs">A</span>
                                        <Slider
                                            defaultValue={[fontSize]}
                                            min={12}
                                            max={24}
                                            step={1}
                                            onValueChange={(vals) => setFontSize(vals[0])}
                                            className="flex-1"
                                        />
                                        <span className="text-lg">A</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Current size: {fontSize}px
                                    </p>
                                </div>

                                <div>
                                    <Label>Chat Density</Label>
                                    <Select value={chatDensity} onValueChange={setChatDensity}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Normal"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="compact">Compact</SelectItem>
                                            <SelectItem value="normal">Normal</SelectItem>
                                            <SelectItem value="spacious">Spacious</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Chat background</p>
                                        <p className="text-xs text-muted-foreground">
                                            Customize your chat background
                                        </p>
                                    </div>
                                    <Button variant="outline">
                                        <ImageIcon className="mr-2 size-4"/>
                                        Change
                                    </Button>
                                </div>

                                <div>
                                    <Label>Background Image</Label>
                                    <Select value={backgroundImage} onValueChange={setBackgroundImage}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Default"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="default">Default</SelectItem>
                                            <SelectItem value="gradient">Gradient</SelectItem>
                                            <SelectItem value="abstract">Abstract</SelectItem>
                                            <SelectItem value="nature">Nature</SelectItem>
                                            <SelectItem value="custom">Custom Upload</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label>Message Bubble Style</Label>
                                    <Select value={messageBubble} onValueChange={setMessageBubble}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Rounded"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="rounded">Rounded</SelectItem>
                                            <SelectItem value="square">Square</SelectItem>
                                            <SelectItem value="modern">Modern</SelectItem>
                                            <SelectItem value="classic">Classic</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label>Emoji Set</Label>
                                    <Select value={emojiSet} onValueChange={setEmojiSet}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Apple"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="apple">Apple</SelectItem>
                                            <SelectItem value="google">Google</SelectItem>
                                            <SelectItem value="twitter">Twitter</SelectItem>
                                            <SelectItem value="facebook">Facebook</SelectItem>
                                            <SelectItem value="custom">Custom</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label>Animation Intensity</Label>
                                    <Select value={animationIntensity.toString()}
                                            onValueChange={(val) => setAnimationIntensity(parseInt(val))}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Medium"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0">None</SelectItem>
                                            <SelectItem value="1">Low</SelectItem>
                                            <SelectItem value="2">Medium</SelectItem>
                                            <SelectItem value="3">High</SelectItem>
                                            <SelectItem value="4">Extreme</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Developer mode</p>
                                        <p className="text-xs text-muted-foreground">
                                            Enable advanced logs & API tools
                                        </p>
                                    </div>
                                    <Switch
                                        checked={advancedSettings.developerMode}
                                        onCheckedChange={() => toggleAdvancedSetting("developerMode")}
                                    />
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* CHAT */}
                    <TabsContent value="chat" className="space-y-6 p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Typing indicators</p>
                                        <p className="text-xs text-muted-foreground">
                                            Show “user is typing” status
                                        </p>
                                    </div>
                                    <Switch defaultChecked/>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Show timestamps</p>
                                        <p className="text-xs text-muted-foreground">
                                            Display time on each message
                                        </p>
                                    </div>
                                    <Switch defaultChecked/>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Show message seconds</p>
                                        <p className="text-xs text-muted-foreground">
                                            Include seconds in timestamps
                                        </p>
                                    </div>
                                    <Switch
                                        checked={showMessageSeconds}
                                        onCheckedChange={setShowMessageSeconds}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Link previews</p>
                                        <p className="text-xs text-muted-foreground">
                                            Show website previews inline
                                        </p>
                                    </div>
                                    <Switch
                                        checked={linkPreview}
                                        onCheckedChange={setLinkPreview}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Spoilered media</p>
                                        <p className="text-xs text-muted-foreground">
                                            Blur sensitive images by default
                                        </p>
                                    </div>
                                    <Switch
                                        checked={spoileredMedia}
                                        onCheckedChange={setSpoileredMedia}
                                    />
                                </div>

                                <div>
                                    <Label>Enter Key Behavior</Label>
                                    <Select value={enterKeyBehavior} onValueChange={setEnterKeyBehavior}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Send"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="send">Send Message</SelectItem>
                                            <SelectItem value="newline">Insert New Line</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label>Draft Timeout</Label>
                                    <Select value={draftTimeout} onValueChange={setDraftTimeout}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="15 minutes"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1m">1 Minute</SelectItem>
                                            <SelectItem value="5m">5 Minutes</SelectItem>
                                            <SelectItem value="15m">15 Minutes</SelectItem>
                                            <SelectItem value="1h">1 Hour</SelectItem>
                                            <SelectItem value="never">Never</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Auto-save media</p>
                                        <p className="text-xs text-muted-foreground">
                                            Automatically save received media
                                        </p>
                                    </div>
                                    <Switch
                                        checked={autoSaveMedia}
                                        onCheckedChange={setAutoSaveMedia}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Save to camera roll</p>
                                        <p className="text-xs text-muted-foreground">
                                            Save received images to gallery
                                        </p>
                                    </div>
                                    <Switch
                                        checked={saveToGallery}
                                        onCheckedChange={setSaveToGallery}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">GIF autoplay</p>
                                        <p className="text-xs text-muted-foreground">
                                            Play GIFs automatically
                                        </p>
                                    </div>
                                    <Switch
                                        checked={autoPlayGifs}
                                        onCheckedChange={setAutoPlayGifs}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Video autoplay</p>
                                        <p className="text-xs text-muted-foreground">
                                            Play videos automatically
                                        </p>
                                    </div>
                                    <Switch
                                        checked={autoPlayVideos}
                                        onCheckedChange={setAutoPlayVideos}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Large emoji</p>
                                        <p className="text-xs text-muted-foreground">
                                            Display emoji at larger size
                                        </p>
                                    </div>
                                    <Switch
                                        checked={largeEmoji}
                                        onCheckedChange={setLargeEmoji}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Suggest stickers</p>
                                        <p className="text-xs text-muted-foreground">
                                            Suggest stickers as you type
                                        </p>
                                    </div>
                                    <Switch
                                        checked={suggestStickers}
                                        onCheckedChange={setSuggestStickers}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Suggest emoji</p>
                                        <p className="text-xs text-muted-foreground">
                                            Suggest emojis as you type
                                        </p>
                                    </div>
                                    <Switch
                                        checked={suggestEmoji}
                                        onCheckedChange={setSuggestEmoji}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Show keyboard shortcuts</p>
                                        <p className="text-xs text-muted-foreground">
                                            Display shortcut hints
                                        </p>
                                    </div>
                                    <Switch
                                        checked={showKeyboardShortcuts}
                                        onCheckedChange={setShowKeyboardShortcuts}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border rounded-lg p-4">
                            <h3 className="font-medium mb-4">Media Auto-Download</h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <Label className="mb-2">Photos</Label>
                                    <Select
                                        value={autoDownload.photos}
                                        onValueChange={(val) => handleAutoDownloadChange("photos", val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="All"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All</SelectItem>
                                            <SelectItem value="wifi">WiFi Only</SelectItem>
                                            <SelectItem value="never">Never</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label className="mb-2">Videos</Label>
                                    <Select
                                        value={autoDownload.videos}
                                        onValueChange={(val) => handleAutoDownloadChange("videos", val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="WiFi Only"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All</SelectItem>
                                            <SelectItem value="wifi">WiFi Only</SelectItem>
                                            <SelectItem value="never">Never</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label className="mb-2">Files</Label>
                                    <Select
                                        value={autoDownload.files}
                                        onValueChange={(val) => handleAutoDownloadChange("files", val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="WiFi Only"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All</SelectItem>
                                            <SelectItem value="wifi">WiFi Only</SelectItem>
                                            <SelectItem value="never">Never</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label className="mb-2">Voice Messages</Label>
                                    <Select
                                        value={autoDownload.voice}
                                        onValueChange={(val) => handleAutoDownloadChange("voice", val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="All"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All</SelectItem>
                                            <SelectItem value="wifi">WiFi Only</SelectItem>
                                            <SelectItem value="never">Never</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div className="border rounded-lg p-4">
                            <h3 className="font-medium mb-4">Additional Features</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Button variant="outline">
                                    <Sticker className="mr-2 size-4"/>
                                    Manage Stickers
                                </Button>
                                <Button variant="outline">
                                    <Bot className="mr-2 size-4"/>
                                    Bot Settings
                                </Button>
                                <Button variant="outline">
                                    <Bookmark className="mr-2 size-4"/>
                                    Saved Messages
                                </Button>
                                <Button variant="outline">
                                    <Calendar className="mr-2 size-4"/>
                                    Scheduled Messages
                                </Button>
                                <Button variant="outline">
                                    <Folder className="mr-2 size-4"/>
                                    Chat Folders
                                </Button>
                                <Button variant="outline">
                                    <ClipboardList className="mr-2 size-4"/>
                                    Chat Themes
                                </Button>
                            </div>
                        </div>
                    </TabsContent>

                    {/* STORAGE */}
                    <TabsContent value="storage" className="space-y-6 p-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <HardDrive className="size-5"/>
                                    Storage Overview
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-4">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Total storage used</span>
                                        <span>{formatBytes(storageStats.used * 1024 * 1024)} of {formatBytes(storageStats.total * 1024 * 1024)}</span>
                                    </div>
                                    <Progress
                                        value={(storageStats.used / storageStats.total) * 100}
                                        className="h-3"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="border rounded p-3">
                                        <div className="flex items-center">
                                            <ImageIcon className="mr-2 size-4 text-blue-500"/>
                                            <span className="font-medium">Media</span>
                                        </div>
                                        <p className="text-sm mt-1">{formatBytes(storageStats.media * 1024 * 1024)}</p>
                                        <Button variant="ghost" size="sm" className="mt-2">
                                            Manage
                                        </Button>
                                    </div>

                                    <div className="border rounded p-3">
                                        <div className="flex items-center">
                                            <FileText className="mr-2 size-4 text-green-500"/>
                                            <span className="font-medium">Documents</span>
                                        </div>
                                        <p className="text-sm mt-1">{formatBytes(storageStats.documents * 1024 * 1024)}</p>
                                        <Button variant="ghost" size="sm" className="mt-2">
                                            Manage
                                        </Button>
                                    </div>

                                    <div className="border rounded p-3">
                                        <div className="flex items-center">
                                            <Database className="mr-2 size-4 text-yellow-500"/>
                                            <span className="font-medium">Cache</span>
                                        </div>
                                        <p className="text-sm mt-1">{formatBytes(storageStats.cache * 1024 * 1024)}</p>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="mt-2"
                                            onClick={handleClearCache}
                                        >
                                            Clear
                                        </Button>
                                    </div>

                                    <div className="border rounded p-3">
                                        <div className="flex items-center">
                                            <File className="mr-2 size-4 text-purple-500"/>
                                            <span className="font-medium">Other</span>
                                        </div>
                                        <p className="text-sm mt-1">{formatBytes((storageStats.used - storageStats.media - storageStats.documents - storageStats.cache) * 1024 * 1024)}</p>
                                        <Button variant="ghost" size="sm" className="mt-2">
                                            Review
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border rounded-lg p-4">
                                <h3 className="font-medium mb-4">Auto-Clean Settings</h3>
                                <div className="space-y-4">
                                    <div>
                                        <Label>Auto-Delete Cache</Label>
                                        <Select
                                            value={autoDeleteSettings.cache}
                                            onValueChange={(val) => handleAutoDeleteChange("cache", val)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="30 days"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1d">After 1 day</SelectItem>
                                                <SelectItem value="7d">After 7 days</SelectItem>
                                                <SelectItem value="30d">After 30 days</SelectItem>
                                                <SelectItem value="never">Never</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label>Auto-Delete Old Messages</Label>
                                        <Select
                                            value={autoDeleteSettings.messages}
                                            onValueChange={(val) => handleAutoDeleteChange("messages", val)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Never"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1d">After 1 day</SelectItem>
                                                <SelectItem value="7d">After 7 days</SelectItem>
                                                <SelectItem value="30d">After 30 days</SelectItem>
                                                <SelectItem value="1y">After 1 year</SelectItem>
                                                <SelectItem value="never">Never</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label>Account Auto-Delete</Label>
                                        <Select
                                            value={autoDeleteSettings.account}
                                            onValueChange={(val) => handleAutoDeleteChange("account", val)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Never"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1m">After 1 month</SelectItem>
                                                <SelectItem value="3m">After 3 months</SelectItem>
                                                <SelectItem value="6m">After 6 months</SelectItem>
                                                <SelectItem value="1y">After 1 year</SelectItem>
                                                <SelectItem value="never">Never</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <div className="border rounded-lg p-4">
                                <h3 className="font-medium mb-4">Backup & Export</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Backup frequency</p>
                                            <p className="text-xs text-muted-foreground">
                                                How often to backup your data
                                            </p>
                                        </div>
                                        <Select
                                            value={backupFrequency}
                                            onValueChange={setBackupFrequency}
                                        >
                                            <SelectTrigger className="w-32">
                                                <SelectValue placeholder="Weekly"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="daily">Daily</SelectItem>
                                                <SelectItem value="weekly">Weekly</SelectItem>
                                                <SelectItem value="monthly">Monthly</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Backup location</p>
                                            <p className="text-xs text-muted-foreground">
                                                Where to store your backups
                                            </p>
                                        </div>
                                        <Select
                                            value={backupLocation}
                                            onValueChange={setBackupLocation}
                                        >
                                            <SelectTrigger className="w-32">
                                                <SelectValue placeholder="Cloud"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="cloud">Cloud</SelectItem>
                                                <SelectItem value="local">Local Device</SelectItem>
                                                <SelectItem value="external">External Drive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Encrypt backups</p>
                                            <p className="text-xs text-muted-foreground">
                                                Add password protection to backups
                                            </p>
                                        </div>
                                        <Switch
                                            checked={encryptBackups}
                                            onCheckedChange={setEncryptBackups}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm">Last backup</p>
                                            <p className="text-xs text-muted-foreground">
                                                {lastBackup}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">
                                                <Download className="mr-1 size-4"/>
                                                Export
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Upload className="mr-1 size-4"/>
                                                Backup Now
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border rounded-lg p-4">
                            <h3 className="font-medium mb-4">Network Usage</h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="border rounded p-3">
                                    <div className="flex items-center">
                                        <Upload className="mr-2 size-4 text-blue-500"/>
                                        <span className="font-medium">Sent</span>
                                    </div>
                                    <p className="text-sm mt-1">{formatBytes(networkUsage.sent * 1024 * 1024)}</p>
                                </div>

                                <div className="border rounded p-3">
                                    <div className="flex items-center">
                                        <Download className="mr-2 size-4 text-green-500"/>
                                        <span className="font-medium">Received</span>
                                    </div>
                                    <p className="text-sm mt-1">{formatBytes(networkUsage.received * 1024 * 1024)}</p>
                                </div>

                                <div className="border rounded p-3">
                                    <div className="flex items-center">
                                        <Phone className="mr-2 size-4 text-purple-500"/>
                                        <span className="font-medium">Calls</span>
                                    </div>
                                    <p className="text-sm mt-1">{formatBytes(networkUsage.calls * 1024 * 1024)}</p>
                                </div>

                                <div className="border rounded p-3">
                                    <div className="flex items-center">
                                        <Calendar className="mr-2 size-4 text-amber-500"/>
                                        <span className="font-medium">Last reset</span>
                                    </div>
                                    <p className="text-sm mt-1">{networkUsage.lastReset}</p>
                                </div>
                            </div>
                            <Button variant="outline" className="mt-4">
                                <RefreshCw className="mr-2 size-4"/>
                                Reset Statistics
                            </Button>
                        </div>
                    </TabsContent>

                    {/* SECURITY */}
                    <TabsContent value="security" className="space-y-6 p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <div className="border rounded-lg p-4">
                                    <h3 className="font-medium flex items-center gap-2 mb-4">
                                        <LockIcon className="size-5"/>
                                        Two-Step Verification
                                    </h3>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Status</p>
                                            <p className="text-sm text-muted-foreground">
                                                {twoFactorEnabled ? "Enabled" : "Disabled"}
                                            </p>
                                        </div>
                                        <Button
                                            variant={twoFactorEnabled ? "outline" : "default"}
                                            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                                        >
                                            {twoFactorEnabled ? "Disable" : "Enable"}
                                        </Button>
                                    </div>

                                    {twoFactorEnabled && (
                                        <div className="mt-4 space-y-3">
                                            <div>
                                                <Label>Recovery Email</Label>
                                                <Input
                                                    type="email"
                                                    defaultValue="john@example.com"
                                                    className="mt-1"
                                                />
                                            </div>
                                            <div>
                                                <Label>Recovery Questions</Label>
                                                <Button variant="outline" className="w-full mt-1">
                                                    Set Security Questions
                                                </Button>
                                            </div>
                                            <div>
                                                <Label>Backup Codes</Label>
                                                <Button variant="outline" className="w-full mt-1">
                                                    Generate New Codes
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="border rounded-lg p-4">
                                    <h3 className="font-medium flex items-center gap-2 mb-4">
                                        <Shield className="size-5"/>
                                        Session Security
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Login alerts</p>
                                                <p className="text-xs text-muted-foreground">
                                                    Notify me of new logins
                                                </p>
                                            </div>
                                            <Switch
                                                checked={loginAlerts}
                                                onCheckedChange={setLoginAlerts}
                                            />
                                        </div>

                                        <div>
                                            <Label>Password change reminder</Label>
                                            <Select
                                                value={passwordChangeReminder}
                                                onValueChange={setPasswordChangeReminder}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="3 months"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1m">1 Month</SelectItem>
                                                    <SelectItem value="3m">3 Months</SelectItem>
                                                    <SelectItem value="6m">6 Months</SelectItem>
                                                    <SelectItem value="never">Never</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label>Session timeout</Label>
                                            <Select
                                                value={sessionTimeout}
                                                onValueChange={setSessionTimeout}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="30 minutes"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="5m">5 Minutes</SelectItem>
                                                    <SelectItem value="15m">15 Minutes</SelectItem>
                                                    <SelectItem value="30m">30 Minutes</SelectItem>
                                                    <SelectItem value="1h">1 Hour</SelectItem>
                                                    <SelectItem value="never">Never</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="border rounded-lg p-4">
                                    <h3 className="font-medium flex items-center gap-2 mb-4">
                                        <Smartphone className="size-5"/>
                                        App Lock
                                    </h3>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Passcode lock</p>
                                            <p className="text-xs text-muted-foreground">
                                                Require passcode to open the app
                                            </p>
                                        </div>
                                        <Switch
                                            checked={passcodeLock}
                                            onCheckedChange={setPasscodeLock}
                                        />
                                    </div>

                                    {passcodeLock && (
                                        <div className="mt-4 space-y-3">
                                            <Button variant="outline" className="w-full">
                                                Set Passcode
                                            </Button>
                                            <div>
                                                <Label>Auto-lock timer</Label>
                                                <Select
                                                    value={autoLockTimer}
                                                    onValueChange={setAutoLockTimer}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select timer"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="immediately">Immediately</SelectItem>
                                                        <SelectItem value="1m">After 1 minute</SelectItem>
                                                        <SelectItem value="5m">After 5 minutes</SelectItem>
                                                        <SelectItem value="1h">After 1 hour</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium">Biometric lock</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Use fingerprint or face ID
                                                    </p>
                                                </div>
                                                <Switch defaultChecked/>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="border rounded-lg p-4">
                                    <h3 className="font-medium flex items-center gap-2 mb-4">
                                        <ShieldCheck className="size-5"/>
                                        Active Sessions
                                    </h3>
                                    <div className="space-y-2">
                                        {sessions.map((s) => (
                                            <div
                                                key={s.id}
                                                className={`flex flex-col rounded border p-3 ${s.current ? 'border-blue-200 bg-blue-50' : ''}`}
                                            >
                                                <div className="flex justify-between">
                                                    <div>
                                                        <div className="font-medium">{s.device}</div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {s.location} • {s.lastActive}
                                                            {s.current &&
                                                                <span className="text-green-500 ml-1">• Current</span>}
                                                        </div>
                                                    </div>
                                                    {!s.current && (
                                                        <Button variant="outline" size="sm">
                                                            Sign out
                                                        </Button>
                                                    )}
                                                </div>

                                                <Collapsible>
                                                    <CollapsibleTrigger
                                                        className="text-xs text-muted-foreground flex items-center mt-2">
                                                        {isSessionExpanded ? (
                                                            <ChevronUp className="size-3 mr-1"/>
                                                        ) : (
                                                            <ChevronDown className="size-3 mr-1"/>
                                                        )}
                                                        Details
                                                    </CollapsibleTrigger>
                                                    <CollapsibleContent className="text-xs text-muted-foreground mt-1">
                                                        <div>IP: {s.ip}</div>
                                                        <div>Platform: {s.platform}</div>
                                                        <div>Last active: {s.lastActive}</div>
                                                    </CollapsibleContent>
                                                </Collapsible>
                                            </div>
                                        ))}
                                    </div>
                                    <Button
                                        variant="outline"
                                        className="w-full mt-4"
                                        onClick={terminateAllSessions}
                                    >
                                        Terminate all other sessions
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="border rounded-lg p-4">
                            <h3 className="font-medium flex items-center gap-2 mb-4">
                                <Server className="size-5"/>
                                Privacy & Security Tools
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <Button variant="outline">
                                    <FileLock className="mr-2 size-4"/>
                                    Encrypted Chats
                                </Button>
                                <Button variant="outline">
                                    <FileKey className="mr-2 size-4"/>
                                    View Security Log
                                </Button>
                                <Button variant="outline">
                                    <FileBarChart className="mr-2 size-4"/>
                                    Privacy Report
                                </Button>
                                <Button variant="outline">
                                    <Link className="mr-2 size-4"/>
                                    Manage Connected Websites
                                </Button>
                                <Button variant="outline">
                                    <FileDigit className="mr-2 size-4"/>
                                    Data Permissions
                                </Button>
                                <Button variant="outline">
                                    <Shield className="mr-2 size-4"/>
                                    Privacy Settings Review
                                </Button>
                            </div>
                        </div>
                    </TabsContent>

                    {/* ADVANCED */}
                    <TabsContent value="advanced" className="space-y-6 p-4">
                        <div className="border rounded-lg p-4">
                            <h3 className="font-medium flex items-center gap-2 mb-4">
                                <Terminal className="size-5"/>
                                Developer Settings
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Developer mode</p>
                                        <p className="text-xs text-muted-foreground">
                                            Enable advanced tools
                                        </p>
                                    </div>
                                    <Switch
                                        checked={advancedSettings.developerMode}
                                        onCheckedChange={() => toggleAdvancedSetting("developerMode")}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Experimental features</p>
                                        <p className="text-xs text-muted-foreground">
                                            Access beta functionality
                                        </p>
                                    </div>
                                    <Switch
                                        checked={advancedSettings.experimentalFeatures}
                                        onCheckedChange={() => toggleAdvancedSetting("experimentalFeatures")}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Hardware acceleration</p>
                                        <p className="text-xs text-muted-foreground">
                                            Use GPU for rendering
                                        </p>
                                    </div>
                                    <Switch
                                        checked={advancedSettings.hardwareAcceleration}
                                        onCheckedChange={() => toggleAdvancedSetting("hardwareAcceleration")}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Disable animations</p>
                                        <p className="text-xs text-muted-foreground">
                                            Reduce motion effects
                                        </p>
                                    </div>
                                    <Switch
                                        checked={advancedSettings.disableAnimations}
                                        onCheckedChange={() => toggleAdvancedSetting("disableAnimations")}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Low bandwidth mode</p>
                                        <p className="text-xs text-muted-foreground">
                                            Reduce data usage
                                        </p>
                                    </div>
                                    <Switch
                                        checked={advancedSettings.lowBandwidthMode}
                                        onCheckedChange={() => toggleAdvancedSetting("lowBandwidthMode")}
                                    />
                                </div>

                                <div>
                                    <Label>Log level</Label>
                                    <Select
                                        value={advancedSettings.logLevel}
                                        onValueChange={(val) => setAdvancedSettings({
                                            ...advancedSettings,
                                            logLevel: val
                                        })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Info"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="error">Error</SelectItem>
                                            <SelectItem value="warn">Warning</SelectItem>
                                            <SelectItem value="info">Info</SelectItem>
                                            <SelectItem value="debug">Debug</SelectItem>
                                            <SelectItem value="trace">Trace</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div className="border rounded-lg p-4">
                            <h3 className="font-medium flex items-center gap-2 mb-4">
                                <Webhook className="size-5"/>
                                API & Integrations
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <Label>API Keys</Label>
                                    <div className="mt-2 space-y-2">
                                        {apiKeys.map(key => (
                                            <div key={key.id}
                                                 className="flex items-center justify-between border rounded p-3">
                                                <div>
                                                    <p className="font-medium">{key.name}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {key.key} • Last used: {key.lastUsed}
                                                    </p>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => revokeApiKey(key.id)}
                                                >
                                                    <X className="size-4"/>
                                                </Button>
                                            </div>
                                        ))}
                                        <Button variant="outline" className="w-full mt-2">
                                            <Plus className="mr-2 size-4"/>
                                            Create New API Key
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <Label>Connected Services</Label>
                                    <div className="mt-2 space-y-2">
                                        {integrationSettings.map(int => (
                                            <div key={int.id}
                                                 className="flex items-center justify-between border rounded p-3">
                                                <div>
                                                    <p className="font-medium">{int.name}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {int.connected ? `Last synced: ${int.lastSynced}` : "Not connected"}
                                                    </p>
                                                </div>
                                                <Switch
                                                    checked={int.connected}
                                                    onCheckedChange={() => toggleIntegration(int.id)}
                                                />
                                            </div>
                                        ))}
                                        <Button variant="outline" className="w-full mt-2">
                                            <Plus className="mr-2 size-4"/>
                                            Connect New Service
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border rounded-lg p-4">
                            <h3 className="font-medium flex items-center gap-2 mb-4">
                                <GitBranch className="size-5"/>
                                Version & Updates
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span>App Version</span>
                                    <span className="font-medium">v2.8.4 (Build 2840)</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Last Update</span>
                                    <span className="font-medium">2023-10-15</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Update Channel</span>
                                    <span className="font-medium">Stable</span>
                                </div>
                                <Button className="w-full mt-4">
                                    <RefreshCw className="mr-2 size-4"/>
                                    Check for Updates
                                </Button>
                            </div>
                        </div>

                        <div className="border rounded-lg p-4">
                            <h3 className="font-medium flex items-center gap-2 mb-4">
                                <Wrench className="size-5"/>
                                Advanced Tools
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <Button variant="outline">
                                    <FileCode className="mr-2 size-4"/>
                                    Debug Console
                                </Button>
                                <Button variant="outline">
                                    <FileSearch className="mr-2 size-4"/>
                                    Media Inspector
                                </Button>
                                <Button variant="outline">
                                    <FileSpreadsheet className="mr-2 size-4"/>
                                    Database Explorer
                                </Button>
                                <Button variant="outline">
                                    <Network className="mr-2 size-4"/>
                                    Network Monitor
                                </Button>
                                <Button variant="outline">
                                    <Cpu className="mr-2 size-4"/>
                                    Performance Profiler
                                </Button>
                                <Button variant="outline">
                                    <MemoryStick className="mr-2 size-4"/>
                                    Memory Analyzer
                                </Button>
                            </div>
                        </div>

                        <div className="border border-destructive rounded-lg p-4">
                            <h3 className="font-medium flex items-center gap-2 text-destructive mb-4">
                                <AlertTriangle className="size-5"/>
                                Danger Zone
                            </h3>
                            <div className="space-y-4">
                                <Button variant="destructive" className="w-full">
                                    <Trash className="mr-2 size-4"/>
                                    Delete All Chat History
                                </Button>
                                <Button variant="destructive" className="w-full">
                                    <FileX className="mr-2 size-4"/>
                                    Clear All Data
                                </Button>
                                <Button variant="destructive" className="w-full">
                                    <LogOut className="mr-2 size-4"/>
                                    Log Out of All Devices
                                </Button>
                                <Button variant="destructive" className="w-full">
                                    <Trash className="mr-2 size-4"/>
                                    Delete Account Permanently
                                </Button>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}