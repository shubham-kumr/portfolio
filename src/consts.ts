import type { Site, Page, Links, Socials } from "@types"

// Global
export const SITE: Site = {
  TITLE: "Shubham Kumar",
  DESCRIPTION: "develoepr",
  AUTHOR: "Shubham",
}

// Work Page
export const WORK: Page = {
  TITLE: "Work",
  DESCRIPTION: "Places I have worked.",
}

// Blog Page
export const BLOG: Page = {
  TITLE: "Blog",
  DESCRIPTION: "Writing on topics I am passionate about.",
}

// Projects Page 
export const PROJECTS: Page = {
  TITLE: "Projects",
  DESCRIPTION: "Recent projects I have worked on.",
}

// Search Page
export const SEARCH: Page = {
  TITLE: "Search",
  DESCRIPTION: "Search all posts and projects by keyword.",
}

// Links
export const LINKS: Links = [
  { 
    TEXT: "Home", 
    HREF: "/", 
  },
  // { 
  //   TEXT: "Work", 
  //   HREF: "/work", 
  // },
  { 
    TEXT: "Blog", 
    HREF: "/blog", 
  },
  { 
    TEXT: "Projects", 
    HREF: "/projects", 
  },
]

// Socials
export const SOCIALS: Socials = [
  { 
    NAME: "Email",
    ICON: "email", 
    TEXT: "forshubhamkumar@gmail.com",
    HREF: "mailto:forshubhamkumar@gmail.com",
  },
  { 
    NAME: "Github",
    ICON: "github",
    TEXT: "shubham-kumr",
    HREF: "https://github.com/shubham-kumr"
  },
  { 
    NAME: "LinkedIn",
    ICON: "linkedin",
    TEXT: "shubham-kumr",
    HREF: "https://www.linkedin.com/in/shubham-kumr/",
  },
  { 
    NAME: "Twitter",
    ICON: "twitter-x",
    TEXT: "shubhamkumr_",
    HREF: "https://twitter.com/shubhamkumr_",
  },
  {
    NAME: "ENS",
    ICON: "icon-ethereum",
    TEXT: "shubhamkumar.base.eth",
    HREF: "https://app.ens.domains/shubhamkumar.base.eth",
  },
  {
    NAME: "Resume",
    ICON: "icon-resume",
    TEXT: "Resume",
    HREF: "https://drive.google.com/file/d/134iCB3Sub08e1JGJnJvEoTF0mpIUClPX/view?usp=sharing",
  }
  ,
  {
    NAME: "LeetCode",
    ICON: "icon-leetcode",
    TEXT: "shubham-kumr",
    HREF: "https://leetcode.com/u/shubham-kumr/"
  },
  {
    NAME: "Try Hack Me",
    ICON: "icon-tryhackme",
    TEXT: "shubhamkumr",
    HREF: "https://tryhackme.com/p/shubhamkumr"
  },
  {
    NAME: "Hackviser",
    ICON: "icon-hackviser",
    TEXT: "shubhamkumar",
    HREF: "https://app.hackviser.com/profile/shubhamkumar"
  }
]

