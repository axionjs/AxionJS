"use client";
import { useId, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { useThemeStore } from "../../lib/stores/theme-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Button } from "@/registry/new-york/ui/button";
import { Input } from "@/registry/new-york/ui/input";
import { Label } from "@/registry/new-york/ui/label";
import { Switch } from "@/registry/new-york/ui/switch";
import { Badge } from "@/registry/new-york/ui/badge";
import { Progress } from "@/registry/new-york/ui/progress";
import { Separator } from "@/registry/new-york/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select";
import { Textarea } from "@/registry/new-york/ui/textarea";
import { Checkbox } from "@/registry/new-york/ui/checkbox";
import { Marquee } from "@/registry/new-york/ui/marquee";
import { RadioGroup, RadioGroupItem } from "@/registry/new-york/ui/radio-group";
import { Calendar } from "@/registry/new-york/ui/calendar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/new-york/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/new-york/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/new-york/ui/accordion";
import { Slider } from "@/registry/new-york/ui/slider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/new-york/ui/alert-dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/new-york/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/new-york/ui/popover";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/registry/new-york/ui/chart";
import {
  Users,
  TrendingUp,
  Settings,
  Share,
  Star,
  Heart,
  MessageCircle,
  Bell,
  Search,
  Brush,
  Eraser,
  Scissors,
  SwatchBook,
  ChevronDown,
  MoreHorizontal,
  Plus,
  Download,
  Upload,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Zap,
  Sparkles,
  Palette,
  Code,
  Layers,
  Check,
  ChevronsUpDown,
  Calendar as CalendarIcon,
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Twitter,
  Linkedin,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  BookOpen,
  BarChart3,
} from "lucide-react";

// Chart data and config
const chartData = [
  { month: "Jan", value: 186 },
  { month: "Feb", value: 305 },
  { month: "Mar", value: 237 },
  { month: "Apr", value: 173 },
  { month: "May", value: 209 },
  { month: "Jun", value: 214 },
];

const radialData = [
  { name: "Desktop", value: 75, fill: "hsl(var(--primary))" },
  { name: "Mobile", value: 60, fill: "hsl(var(--primary) / 0.7)" },
  { name: "Tablet", value: 45, fill: "hsl(var(--primary) / 0.4)" },
];

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

// User data for the table
const users = [
  {
    id: "1",
    name: "Alex Thompson",
    username: "@alexthompson",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    email: "alex.t@company.com",
    location: "San Francisco, US",
    status: "Active",
    balance: "$1,250.00",
    role: "Developer",
  },
  {
    id: "2",
    name: "Sarah Chen",
    username: "@sarahchen",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    email: "sarah.c@company.com",
    location: "Singapore",
    status: "Active",
    balance: "$600.00",
    role: "Designer",
  },
  {
    id: "3",
    name: "Maria Garcia",
    username: "@mariagarcia",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    email: "m.garcia@company.com",
    location: "Madrid, Spain",
    status: "Inactive",
    balance: "$0.00",
    role: "Manager",
  },
  {
    id: "4",
    name: "David Kim",
    username: "@davidkim",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    email: "d.kim@company.com",
    location: "Seoul, Korea",
    status: "Active",
    balance: "$890.00",
    role: "Developer",
  },
];

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

export default function ThemePreview() {
  const { activeThemeData } = useThemeStore();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [sliderValue, setSliderValue] = useState([50]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [showPassword, setShowPassword] = useState(false);
  const radioId = useId();

  const radioItems = [
    { value: "1", label: "Palette", Icon: SwatchBook },
    { value: "2", label: "Brush", Icon: Brush },
    { value: "3", label: "Eraser", Icon: Eraser },
    { value: "4", label: "Cut", Icon: Scissors },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const rotateVariants = {
    animate: {
      rotate: [0, 360],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Enhanced Hero Section */}
      <motion.div
        className="relative overflow-hidden rounded-lg border border-border bg-gradient-to-br from-background via-background to-muted/20"
        variants={itemVariants}
      >
        <div className="absolute inset-0 bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2]" />

        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 rounded-full bg-primary/10 blur-xl"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 rounded-full bg-accent/10 blur-xl"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "1s" }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-16 h-16 rounded-full bg-primary/20 blur-lg"
          variants={pulseVariants}
          animate="animate"
        />

        {/* Rotating Gradient Ring */}
        <motion.div
          className="absolute top-1/2 right-10 w-40 h-40 rounded-full border-4 border-transparent bg-gradient-to-r from-primary via-accent to-primary bg-clip-border opacity-20"
          variants={rotateVariants}
          animate="animate"
          style={{
            background: `conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))`,
            WebkitMask: "radial-gradient(circle, transparent 60px, black 62px)",
            mask: "radial-gradient(circle, transparent 60px, black 62px)",
          }}
        />

        <div className="relative py-16 px-8 space-y-6">
          <motion.div
            className="flex items-center gap-2 mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="h-2 w-2 rounded-full bg-primary"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <Badge variant="secondary" className="text-xs">
              Live Preview
            </Badge>
          </motion.div>

          <motion.h1
            className="text-6xl font-black tracking-tight bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent"
            style={{
              fontFamily: `"${activeThemeData?.fonts?.displayFont || "Inter"}", sans-serif`,
              fontWeight: activeThemeData?.fonts?.displayWeight || 900,
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Craft Beautiful
            <br />
            <motion.span
              className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Themes
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-lg text-muted-foreground max-w-2xl leading-relaxed"
            style={{
              fontFamily: `"${activeThemeData?.fonts?.textFont || "Inter"}", sans-serif`,
              fontWeight: activeThemeData?.fonts?.textWeight || 400,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Design stunning, accessible themes with AI-powered customization.
            Perfect typography, harmonious colors, and smooth animations—all
            tailored to your vision.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/docs">
                <Button size="lg" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Documentation
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/charts">
                <Button variant="outline" size="lg" className="gap-2">
                  <BarChart3 className="h-4 w-4" />
                  View Charts
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex items-center gap-6 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
                ].map((src, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Avatar className="h-8 w-8 border-2 border-background">
                      <AvatarImage src={src} />
                      <AvatarFallback>{i + 1}</AvatarFallback>
                    </Avatar>
                  </motion.div>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                Trusted by 10k+ developers
              </span>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <Star className="h-4 w-4 fill-primary text-primary" />
                </motion.div>
              ))}
              <span className="text-sm text-muted-foreground ml-1">
                4.9/5 rating
              </span>
            </div>
          </motion.div>

          {/* Animated Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full opacity-60"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Enhanced Masonry Grid Layout */}
      <motion.div
        className="columns-1 md:columns-1 lg:columns-3 gap-6 space-y-6"
        variants={containerVariants}
      >
        {/* Enhanced Analytics Chart - First Position */}
        <motion.div variants={itemVariants}>
          <Card className="break-inside-avoid bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle
                    className="text-card-foreground"
                    style={{
                      fontFamily: `"${activeThemeData?.fonts?.displayFont || "Inter"}", sans-serif`,
                      fontWeight: activeThemeData?.fonts?.displayWeight || 600,
                    }}
                  >
                    Analytics Overview
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Performance metrics over time
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share className="mr-2 h-4 w-4" />
                      Share
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                    top: 12,
                    bottom: 12,
                  }}
                >
                  <CartesianGrid
                    vertical={false}
                    stroke="hsl(var(--border))"
                    strokeDasharray="3 3"
                  />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Line
                    dataKey="value"
                    type="monotone"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                    activeDot={{
                      r: 6,
                      stroke: "hsl(var(--primary))",
                      strokeWidth: 2,
                    }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
        {/* { Event Calendar} */}
        <motion.div variants={itemVariants}>
          <Card className="break-inside-avoid bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle
                    className="text-card-foreground"
                    style={{
                      fontFamily: `"${activeThemeData?.fonts?.displayFont || "Inter"}", sans-serif`,
                      fontWeight: activeThemeData?.fonts?.displayWeight || 600,
                    }}
                  >
                    Event Calendar
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Schedule your upcoming events
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-full flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border border-border w-fit"
                  classNames={{
                    month_caption: "text-card-foreground font-medium",
                    nav: "space-x-1",
                    cell: "text-card-foreground",
                    day: "text-card-foreground hover:bg-accent hover:text-accent-foreground rounded-md",
                    day_selected:
                      "bg-primary text-primary-foreground hover:bg-primary/90",
                    day_today: "bg-accent text-accent-foreground",
                  }}
                />
              </div>
              <Separator className="my-4 w-full" />
              <div className="space-y-2 w-full">
                <p className="text-sm font-medium text-card-foreground">
                  Upcoming Events
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-card-foreground">Team Meeting</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-accent" />
                    <span className="text-card-foreground">Design Review</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Stats Card */}
        <motion.div variants={itemVariants}>
          <Card className="break-inside-avoid transition-all duration-300 hover:scale-[1.02] bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                Active Users
              </CardTitle>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div
                className="text-3xl font-bold text-card-foreground mb-1"
                style={{
                  fontFamily: `"${activeThemeData?.fonts?.displayFont || "Inter"}", sans-serif`,
                  fontWeight: activeThemeData?.fonts?.displayWeight || 700,
                }}
              >
                +2,350
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                +180.1% from last month
              </p>
              <Progress value={72} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>Target: 3,000</span>
                <span>72%</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Tabs Component */}
        <motion.div variants={itemVariants}>
          <Card className="break-inside-avoid bg-card border-border">
            <CardHeader>
              <CardTitle
                className="text-card-foreground"
                style={{
                  fontFamily: `"${activeThemeData?.fonts?.displayFont || "Inter"}", sans-serif`,
                  fontWeight: activeThemeData?.fonts?.displayWeight || 600,
                }}
              >
                Project Dashboard
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Manage your projects and settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-card-foreground">
                        Total Projects
                      </p>
                      <p className="text-2xl font-bold text-primary">24</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-card-foreground">
                        Active
                      </p>
                      <p className="text-2xl font-bold text-green-500">18</p>
                    </div>
                  </div>
                  <Progress value={75} className="h-2" />
                </TabsContent>
                <TabsContent value="analytics" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-card-foreground">
                        Performance
                      </span>
                      <span className="text-sm text-muted-foreground">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-card-foreground">
                        Uptime
                      </span>
                      <span className="text-sm text-muted-foreground">
                        99.9%
                      </span>
                    </div>
                    <Progress value={99.9} className="h-2" />
                  </div>
                </TabsContent>
                <TabsContent value="settings" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notifications" className="text-sm">
                        Push Notifications
                      </Label>
                      <Switch id="notifications" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="analytics" className="text-sm">
                        Analytics Tracking
                      </Label>
                      <Switch id="analytics" defaultChecked />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Command Palette */}
        <motion.div variants={itemVariants}>
          <Card className="break-inside-avoid bg-card border-border">
            <CardHeader>
              <CardTitle
                className="text-card-foreground"
                style={{
                  fontFamily: `"${activeThemeData?.fonts?.displayFont || "Inter"}", sans-serif`,
                  fontWeight: activeThemeData?.fonts?.displayWeight || 600,
                }}
              >
                Framework Selector
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Choose your preferred framework
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {value
                      ? frameworks.find(
                          (framework) => framework.value === value
                        )?.label
                      : "Select framework..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {frameworks.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setValue(
                                currentValue === value ? "" : currentValue
                              );
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={`mr-2 h-4 w-4 ${
                                value === framework.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                            />
                            {framework.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Radio Group Component */}
        <motion.div variants={itemVariants}>
          <Card className="break-inside-avoid bg-card border-border">
            <CardHeader>
              <CardTitle
                className="text-card-foreground"
                style={{
                  fontFamily: `"${activeThemeData?.fonts?.displayFont || "Inter"}", sans-serif`,
                  fontWeight: activeThemeData?.fonts?.displayWeight || 600,
                }}
              >
                Design Tools
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Select your preferred design tool
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup className="grid-cols-2 gap-4" defaultValue="1">
                {radioItems.map((item) => (
                  <div
                    key={`${radioId}-${item.value}`}
                    className="relative flex flex-col gap-3 rounded-lg border border-border p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <RadioGroupItem
                        id={`${radioId}-${item.value}`}
                        value={item.value}
                        className="after:absolute after:inset-0"
                      />
                      <div className="p-2 bg-primary/10 rounded-md">
                        <item.Icon
                          className="text-primary"
                          size={16}
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                    <Label
                      htmlFor={`${radioId}-${item.value}`}
                      className="text-card-foreground font-medium cursor-pointer"
                    >
                      {item.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </motion.div>

        {/* Envent Calendar Component */}

        <motion.div variants={itemVariants}>
          <Card className="break-inside-avoid bg-card border-border">
            <CardHeader>
              <CardTitle
                className="text-card-foreground"
                style={{
                  fontFamily: `"${activeThemeData?.fonts?.displayFont || "Inter"}", sans-serif`,
                  fontWeight: activeThemeData?.fonts?.displayWeight || 600,
                }}
              >
                Device Usage
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Distribution across platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="30%"
                    outerRadius="90%"
                    data={radialData}
                  >
                    <RadialBar
                      dataKey="value"
                      cornerRadius={10}
                      fill="hsl(var(--primary))"
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {radialData.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="text-sm font-medium text-card-foreground">
                      {item.value}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Form Components */}
        <motion.div variants={itemVariants}>
          <Card className="break-inside-avoid bg-card border-border">
            <CardHeader>
              <CardTitle
                className="text-card-foreground"
                style={{
                  fontFamily: `"${activeThemeData?.fonts?.displayFont || "Inter"}", sans-serif`,
                  fontWeight: activeThemeData?.fonts?.displayWeight || 600,
                }}
              >
                Contact Information
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Update your profile details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-card-foreground">
                    First Name
                  </Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-card-foreground">
                    Last Name
                  </Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-card-foreground">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-card-foreground">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-card-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="text-card-foreground">
                  Role
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="developer">
                      <div className="flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        Developer
                      </div>
                    </SelectItem>
                    <SelectItem value="designer">
                      <div className="flex items-center gap-2">
                        <Palette className="h-4 w-4" />
                        Designer
                      </div>
                    </SelectItem>
                    <SelectItem value="manager">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Manager
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-card-foreground">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  className="min-h-[80px]"
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-card-foreground">
                    I agree to the{" "}
                    <span className="text-primary hover:underline cursor-pointer">
                      terms and conditions
                    </span>
                  </Label>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch id="notifications" />
                    <Label
                      htmlFor="notifications"
                      className="text-card-foreground"
                    >
                      Email notifications
                    </Label>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">Save Changes</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Button Showcase */}
        <motion.div variants={itemVariants}>
          <Card className="break-inside-avoid bg-card border-border">
            <CardHeader>
              <CardTitle
                className="text-card-foreground"
                style={{
                  fontFamily: `"${activeThemeData?.fonts?.displayFont || "Inter"}", sans-serif`,
                  fontWeight: activeThemeData?.fonts?.displayWeight || 600,
                }}
              >
                Interactive Elements
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Buttons, badges, and interactive components
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <p className="text-sm font-medium text-card-foreground">
                  Button Variants
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm">Primary</Button>
                  <Button variant="secondary" size="sm">
                    Secondary
                  </Button>
                  <Button variant="outline" size="sm">
                    Outline
                  </Button>
                  <Button variant="ghost" size="sm">
                    Ghost
                  </Button>
                  <Button variant="destructive" size="sm">
                    Destructive
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <p className="text-sm font-medium text-card-foreground">
                  Status Badges
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge>Active</Badge>
                  <Badge variant="secondary">Pending</Badge>
                  <Badge variant="outline">Draft</Badge>
                  <Badge variant="destructive">Inactive</Badge>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <p className="text-sm font-medium text-card-foreground">
                  Icon Actions
                </p>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Bell className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Share className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <p className="text-sm font-medium text-card-foreground">
                  Media Controls
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    <div className="flex-1">
                      <Slider
                        value={sliderValue}
                        onValueChange={setSliderValue}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-8">
                      {sliderValue[0]}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost">
                      {volume[0] > 0 ? (
                        <Volume2 className="h-4 w-4" />
                      ) : (
                        <VolumeX className="h-4 w-4" />
                      )}
                    </Button>
                    <div className="flex-1">
                      <Slider
                        value={volume}
                        onValueChange={setVolume}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-8">
                      {volume[0]}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Table Component */}
        <motion.div variants={itemVariants}>
          <Card className="break-inside-avoid bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle
                    className="text-card-foreground"
                    style={{
                      fontFamily: `"${activeThemeData?.fonts?.displayFont || "Inter"}", sans-serif`,
                      fontWeight: activeThemeData?.fonts?.displayWeight || 600,
                    }}
                  >
                    Team Directory
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Manage team members and their roles
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Import
                  </Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Member
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-card-foreground">
                        Member
                      </TableHead>
                      <TableHead className="text-card-foreground">
                        Role
                      </TableHead>
                      <TableHead className="text-card-foreground">
                        Status
                      </TableHead>
                      <TableHead className="text-right text-card-foreground">
                        Balance
                      </TableHead>
                      <TableHead className="text-card-foreground">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow
                        key={user.id}
                        className="group hover:bg-accent/50"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Avatar className="h-9 w-9">
                                <AvatarImage src={user.image} alt={user.name} />
                                <AvatarFallback className="bg-muted text-muted-foreground">
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                            </motion.div>
                            <div>
                              <div className="font-medium group-hover:text-primary transition-colors text-sm text-card-foreground">
                                {user.name}
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Mail className="h-3 w-3" />
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-2 w-2 rounded-full ${
                                user.status === "Active"
                                  ? "bg-green-500"
                                  : "bg-gray-400"
                              }`}
                            />
                            <Badge
                              variant={
                                user.status === "Active"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {user.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell
                          className={`text-right font-medium text-sm ${
                            user.balance.startsWith("-")
                              ? "text-red-500"
                              : user.balance !== "$0.00"
                                ? "text-green-500"
                                : "text-card-foreground"
                          }`}
                        >
                          {user.balance}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                Remove
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Accordion Component */}
        <motion.div variants={itemVariants}>
          <Card className="break-inside-avoid bg-card border-border">
            <CardHeader>
              <CardTitle
                className="text-card-foreground"
                style={{
                  fontFamily: `"${activeThemeData?.fonts?.displayFont || "Inter"}", sans-serif`,
                  fontWeight: activeThemeData?.fonts?.displayWeight || 600,
                }}
              >
                Frequently Asked Questions
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Common questions about our theme system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-card-foreground">
                    How do I customize themes?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    You can customize themes by adjusting colors, fonts,
                    spacing, and animation settings in the theme editor. All
                    changes are applied in real-time.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-card-foreground">
                    Are themes responsive?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes, all themes are fully responsive and work seamlessly
                    across desktop, tablet, and mobile devices with optimized
                    layouts for each screen size.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-card-foreground">
                    Can I export my themes?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Absolutely! You can export your themes as CSS variables,
                    JSON configuration files, or directly integrate them into
                    your projects using our SDK.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Marquee Animation */}
        <motion.div variants={itemVariants}>
          <Card className="break-inside-avoid bg-card border-border">
            <CardHeader>
              <CardTitle
                className="text-card-foreground"
                style={{
                  fontFamily: `"${activeThemeData?.fonts?.displayFont || "Inter"}", sans-serif`,
                  fontWeight: activeThemeData?.fonts?.displayWeight || 600,
                }}
              >
                Feature Highlights
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Discover what makes our themes special
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Marquee
                pauseOnHover
                className="[--duration:25s]"
                style={{
                  "--duration": `${activeThemeData?.styles?.marqueeSpeed || 25}s`,
                }}
              >
                <div className="flex items-center gap-2 mx-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium text-card-foreground">
                    AI-Powered Design
                  </span>
                </div>
                <div className="flex items-center gap-2 mx-6">
                  <div className="p-2 bg-destructive/10 rounded-lg">
                    <Heart className="h-5 w-5 text-destructive" />
                  </div>
                  <span className="font-medium text-card-foreground">
                    Beautiful Aesthetics
                  </span>
                </div>
                <div className="flex items-center gap-2 mx-6">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>
                  <span className="font-medium text-card-foreground">
                    Performance Optimized
                  </span>
                </div>
                <div className="flex items-center gap-2 mx-6">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Layers className="h-5 w-5 text-blue-500" />
                  </div>
                  <span className="font-medium text-card-foreground">
                    Component Library
                  </span>
                </div>
                <div className="flex items-center gap-2 mx-6">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Zap className="h-5 w-5 text-purple-500" />
                  </div>
                  <span className="font-medium text-card-foreground">
                    Lightning Fast
                  </span>
                </div>
                <div className="flex items-center gap-2 mx-6">
                  <div className="p-2 bg-orange-500/10 rounded-lg">
                    <Settings className="h-5 w-5 text-orange-500" />
                  </div>
                  <span className="font-medium text-card-foreground">
                    Highly Customizable
                  </span>
                </div>
              </Marquee>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Animation Demo */}
        <motion.div variants={itemVariants}>
          <Card className="break-inside-avoid bg-card border-border">
            <CardHeader>
              <CardTitle
                className="text-card-foreground"
                style={{
                  fontFamily: `"${activeThemeData?.fonts?.displayFont || "Inter"}", sans-serif`,
                  fontWeight: activeThemeData?.fonts?.displayWeight || 600,
                }}
              >
                Animation Showcase
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Smooth animations with customizable timing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-border rounded-lg hover:bg-primary/5 transition-colors bg-card">
                  <div
                    className="w-10 h-10 bg-gradient-to-r from-primary to-primary/70 rounded-full mx-auto mb-3"
                    style={{
                      animation: `fadeInOut ${activeThemeData?.styles?.fadeSpeed || 500}ms ${activeThemeData?.styles?.animationCurve || "ease"} infinite alternate`,
                    }}
                  ></div>
                  <p className="text-sm text-center text-card-foreground font-medium">
                    Fade Animation
                  </p>
                  <p className="text-xs text-center text-muted-foreground">
                    {activeThemeData?.styles?.fadeSpeed || 500}ms
                  </p>
                </div>
                <div className="p-4 border border-border rounded-lg hover:bg-secondary/5 transition-colors bg-card">
                  <div
                    className="w-10 h-10 bg-gradient-to-r from-secondary to-secondary/70 rounded-full mx-auto mb-3"
                    style={{
                      animation: `scaleUpDown ${activeThemeData?.styles?.scaleSpeed || 300}ms ${activeThemeData?.styles?.animationCurve || "ease"} infinite alternate`,
                    }}
                  ></div>
                  <p className="text-sm text-center text-card-foreground font-medium">
                    Scale Animation
                  </p>
                  <p className="text-xs text-center text-muted-foreground">
                    {activeThemeData?.styles?.scaleSpeed || 300}ms
                  </p>
                </div>
                <div className="p-4 border border-border rounded-lg hover:bg-accent/5 transition-colors bg-card">
                  <div
                    className="w-10 h-10 bg-gradient-to-r from-accent to-accent/70 rounded-full mx-auto mb-3"
                    style={{
                      animation: `slideLeftRight ${activeThemeData?.styles?.slideSpeed || 500}ms ${activeThemeData?.styles?.animationCurve || "ease"} infinite alternate`,
                    }}
                  ></div>
                  <p className="text-sm text-center text-card-foreground font-medium">
                    Slide Animation
                  </p>
                  <p className="text-xs text-center text-muted-foreground">
                    {activeThemeData?.styles?.slideSpeed || 500}ms
                  </p>
                </div>
                <div className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors bg-card">
                  <div
                    className="w-10 h-10 rounded-full mx-auto mb-3 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%]"
                    style={{
                      animation: `shine ${activeThemeData?.styles?.shineSpeed || 8}s linear infinite`,
                    }}
                  ></div>
                  <p className="text-sm text-center text-card-foreground font-medium">
                    Shine Effect
                  </p>
                  <p className="text-xs text-center text-muted-foreground">
                    {activeThemeData?.styles?.shineSpeed || 8}s
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Social Links Card */}
        <motion.div variants={itemVariants}>
          <Card className="break-inside-avoid bg-card border-border">
            <CardHeader>
              <CardTitle
                className="text-card-foreground"
                style={{
                  fontFamily: `"${activeThemeData?.fonts?.displayFont || "Inter"}", sans-serif`,
                  fontWeight: activeThemeData?.fonts?.displayWeight || 600,
                }}
              >
                Connect With Us
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Follow us on social media for updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="justify-start gap-2">
                  <Github className="h-4 w-4" />
                  GitHub
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <Twitter className="h-4 w-4" />
                  Twitter
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <Globe className="h-4 w-4" />
                  Website
                </Button>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  San Francisco, CA
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  hello@company.com
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Alert Dialog Demo */}
        <motion.div variants={itemVariants}>
          <Card className="break-inside-avoid bg-card border-border">
            <CardHeader>
              <CardTitle
                className="text-card-foreground"
                style={{
                  fontFamily: `"${activeThemeData?.fonts?.displayFont || "Inter"}", sans-serif`,
                  fontWeight: activeThemeData?.fonts?.displayWeight || 600,
                }}
              >
                Dialog Components
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Interactive modals and confirmations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button variant="outline" className="w-full">
                Show Info Dialog
              </Button>
              <Button variant="secondary" className="w-full">
                Open Settings
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        /* Enhanced scrollbar styling */
        *::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        *::-webkit-scrollbar-thumb {
          background: linear-gradient(
            to bottom,
            hsl(var(--primary)),
            hsl(var(--primary) / 0.8)
          );
          border-radius: 3px;
        }
        *::-webkit-scrollbar-track {
          background-color: hsl(var(--muted));
          border-radius: 3px;
        }
        *::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--primary) / 0.9);
        }

        /* Grid background pattern */
        .bg-grid-small-black\\/\\[0\\.2\\] {
          background-image: radial-gradient(
            circle,
            rgba(0, 0, 0, 0.2) 1px,
            transparent 1px
          );
          background-size: 20px 20px;
        }
        .dark .bg-grid-small-white\\/\\[0\\.2\\] {
          background-image: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.2) 1px,
            transparent 1px
          );
          background-size: 20px 20px;
        }

        /* Enhanced animation keyframes */
        @keyframes fadeInOut {
          0% {
            opacity: 0.4;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes scaleUpDown {
          0% {
            transform: scale(0.85);
          }
          100% {
            transform: scale(1.15);
          }
        }
        @keyframes slideLeftRight {
          0% {
            transform: translateX(-20px);
          }
          100% {
            transform: translateX(20px);
          }
        }
        @keyframes shine {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        /* Smooth transitions for theme changes */
        * {
          transition-property:
            color, background-color, border-color, text-decoration-color, fill,
            stroke;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 150ms;
        }
      `}</style>
    </motion.div>
  );
}
