import { createHashRouter } from "react-router";
import { PortalPage } from "./pages/portal-page";
import { LandingPage } from "./pages/landing-page";
import { ChatbotInterface } from "./pages/chatbot-interface";
import { SearchResults } from "./pages/search-results";
import { AnalyticsDashboard } from "./pages/analytics-dashboard";
import { NotFound } from "./pages/not-found";

export const router = createHashRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/portal",
    Component: PortalPage,
  },
  {
    path: "/chat",
    Component: ChatbotInterface,
  },
  {
    path: "/search",
    Component: SearchResults,
  },
  {
    path: "/admin",
    Component: AnalyticsDashboard,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
