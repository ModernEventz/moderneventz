import { SidebarLink } from "@/types";

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/home",
    label: "Dashboard",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/vendors",
    label: "Vendors",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: "/Clist",
    label: "CheckList",
  },
  {
    imgURL: "/assets/icons/suitcase.svg",
    route: "/budget",
    label: "Budget",
  },
  {
    imgURL: "/assets/icons/tag.svg",
    route: "",
    label: "Shop",
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: "/user-profile",
    label: "Profile",
  },

];



export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};

export const gCities = [
  'Aburi', 'Accra', 'Aflao', 'Agogo', 'Akwatia', 'Anloga', 'Asamankese', 
  'Ashaiman', 'Atebubu', 'Axim', 'Bawku', 'Berekum', 'Bibiani', 
  'Bolgatanga', 'Cape Coast', 'Damongo', 'Denu', 'Dormaa Ahenkro', 
  'Dunkwa-on-Offin', 'Ejura', 'Elmina', 'Foso', 'Ho', 'Hohoe', 'Kade', 
  'Keta', 'Kintampo', 'Koforidua', 'Konongo', 'Kumasi', 'Madina', 
  'Mampong', 'Navrongo', 'Nkawkaw', 'Nkoranza', 'Nsawam', 'Obuasi', 
  'Paga', 'Prestea', 'Salaga', 'Saltpond', 'Sefwi Wiawso', 
  'Sekondi-Takoradi', 'Sogakope', 'Sunyani', 'Tamale', 'Tarkwa', 
  'Techiman', 'Tema', 'Tumu', 'Wa', 'Wenchi', 'Winneba', 'Yendi'
];