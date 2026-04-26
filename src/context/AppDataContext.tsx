"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type TeamId = "team-1" | "team-2" | "team-3";
type MemberRole = "Owner" | "Editor" | "Viewer";
type MemberStatus = "Active" | "Invited";
type UploadState = "idle" | "uploading" | "success" | "error";
type FileType = "all" | "video" | "image" | "archive";
type NotificationTone = "default" | "warning" | "success";

export type AppProject = {
  id: string;
  teamId: TeamId;
  name: string;
  team: string;
  status: string;
  progress: number;
  uploads: string;
  expiry: string;
  live: boolean;
  route: string;
};

export type AppFile = {
  id: string;
  teamId: TeamId;
  name: string;
  size: string;
  uploader: string;
  uploaderInitials: string;
  expiry: string;
  daysRemaining: number;
  type: FileType;
  thumbTone: string;
  format: string;
};

export type AppUpload = {
  id: string;
  teamId: TeamId;
  name: string;
  type: string;
  size: string;
  duration: string;
  resolution: string;
  status: UploadState;
  progress: number;
  speed: string;
  estimate: string;
};

export type AppMember = {
  id: string;
  teamId: TeamId;
  name: string;
  email: string;
  role: MemberRole;
  status: MemberStatus;
  initials: string;
  lastActive: string;
};

export type AppNotification = {
  id: string;
  teamId: TeamId;
  title: string;
  detail: string;
  time: string;
  tone: NotificationTone;
  read: boolean;
  href: string;
};

type AppDataSnapshot = {
  projects: AppProject[];
  files: AppFile[];
  uploads: AppUpload[];
  members: AppMember[];
  notifications: AppNotification[];
};

type AppDataContextType = AppDataSnapshot & {
  addUpload: (teamId: TeamId, name?: string) => void;
  updateMemberRole: (teamId: TeamId, memberId: string, role: MemberRole) => void;
  removeMember: (teamId: TeamId, memberId: string) => void;
  inviteMember: (teamId: TeamId, email: string, role: MemberRole) => void;
  toggleNotificationRead: (id: string) => void;
  markAllNotificationsRead: (teamId: TeamId) => void;
};

const STORAGE_KEY = "fastcollab-app-data-v1";

const initialData: AppDataSnapshot = {
  projects: [
    {
      id: "project-1",
      teamId: "team-1",
      name: "Spring Campaign Launch",
      team: "Marketing Studio",
      status: "Live",
      progress: 78,
      uploads: "14 files",
      expiry: "3 assets expire in 2 days",
      live: true,
      route: "/files",
    },
    {
      id: "project-2",
      teamId: "team-2",
      name: "Investor Demo Edit",
      team: "Product Ops",
      status: "Reviewing",
      progress: 54,
      uploads: "7 files",
      expiry: "1 asset expires in 18 hours",
      live: false,
      route: "/upload",
    },
    {
      id: "project-3",
      teamId: "team-3",
      name: "Client Review Package",
      team: "External Share",
      status: "Shared",
      progress: 91,
      uploads: "22 files",
      expiry: "5 assets expire in 5 days",
      live: true,
      route: "/team",
    },
  ],
  files: [
    {
      id: "campaign-master",
      teamId: "team-1",
      name: "Campaign_Master_v12.mp4",
      size: "4.8 GB",
      uploader: "Maya Chen",
      uploaderInitials: "MC",
      expiry: "Expires in 5 days",
      daysRemaining: 5,
      type: "video",
      thumbTone: "from-primary-subtle to-accent-subtle",
      format: "4K Video",
    },
    {
      id: "launch-selects",
      teamId: "team-2",
      name: "Launch_Selects_Press.zip",
      size: "1.3 GB",
      uploader: "Jordan Rivera",
      uploaderInitials: "JR",
      expiry: "Expires in 2 days",
      daysRemaining: 2,
      type: "archive",
      thumbTone: "from-warning-subtle to-surface",
      format: "Archive",
    },
    {
      id: "hero-stills",
      teamId: "team-1",
      name: "Hero_Stills_Final_Selects.png",
      size: "248 MB",
      uploader: "Amina Yusuf",
      uploaderInitials: "AY",
      expiry: "Expires in 6 days",
      daysRemaining: 6,
      type: "image",
      thumbTone: "from-accent-subtle to-primary-subtle",
      format: "Image Pack",
    },
    {
      id: "storyboard-review",
      teamId: "team-1",
      name: "Storyboard_Review_03.pdf",
      size: "42 MB",
      uploader: "Maya Chen",
      uploaderInitials: "MC",
      expiry: "Expires in 14 hours",
      daysRemaining: 0,
      type: "image",
      thumbTone: "from-error-subtle to-surface",
      format: "Review Doc",
    },
    {
      id: "demo-cut",
      teamId: "team-2",
      name: "Investor_Demo_Cutdown.mov",
      size: "2.1 GB",
      uploader: "Jordan Rivera",
      uploaderInitials: "JR",
      expiry: "Expires in 3 days",
      daysRemaining: 3,
      type: "video",
      thumbTone: "from-primary-subtle to-surface",
      format: "Video Draft",
    },
    {
      id: "raw-sync",
      teamId: "team-3",
      name: "Raw_Footage_Selects_AudioSync.mp4",
      size: "8.2 GB",
      uploader: "Noah Ellis",
      uploaderInitials: "NE",
      expiry: "Expires in 7 days",
      daysRemaining: 7,
      type: "video",
      thumbTone: "from-secondary-subtle to-accent-subtle",
      format: "Raw Video",
    },
  ],
  uploads: [
    {
      id: "campaign-reel",
      teamId: "team-1",
      name: "Campaign_Reel_Master_v12.mp4",
      type: "Video / MP4",
      size: "4.8 GB",
      duration: "03:42",
      resolution: "3840 x 2160",
      status: "uploading",
      progress: 76,
      speed: "12.4 MB/s",
      estimate: "2m 18s remaining",
    },
    {
      id: "launch-cut",
      teamId: "team-2",
      name: "Launch_Cutdown_ClientReview.mov",
      type: "Video / MOV",
      size: "2.1 GB",
      duration: "01:28",
      resolution: "1920 x 1080",
      status: "success",
      progress: 100,
      speed: "Completed",
      estimate: "Ready to share",
    },
    {
      id: "raw-footage",
      teamId: "team-3",
      name: "Raw_Footage_Selects_AudioSync.mp4",
      type: "Video / MP4",
      size: "8.2 GB",
      duration: "12:13",
      resolution: "4096 x 2160",
      status: "error",
      progress: 34,
      speed: "Connection interrupted",
      estimate: "Retry upload",
    },
  ],
  members: [
    {
      id: "maya-chen",
      teamId: "team-1",
      name: "Maya Chen",
      email: "maya@fastcollab.com",
      role: "Owner",
      status: "Active",
      initials: "MC",
      lastActive: "Online now",
    },
    {
      id: "amina-yusuf",
      teamId: "team-1",
      name: "Amina Yusuf",
      email: "amina@fastcollab.com",
      role: "Editor",
      status: "Active",
      initials: "AY",
      lastActive: "23 mins ago",
    },
    {
      id: "jordan-rivera",
      teamId: "team-2",
      name: "Jordan Rivera",
      email: "jordan@fastcollab.com",
      role: "Editor",
      status: "Active",
      initials: "JR",
      lastActive: "8 mins ago",
    },
    {
      id: "noah-ellis",
      teamId: "team-3",
      name: "Noah Ellis",
      email: "noah@clientco.com",
      role: "Viewer",
      status: "Invited",
      initials: "NE",
      lastActive: "Invite pending",
    },
  ],
  notifications: [
    {
      id: "notif-upload-1",
      teamId: "team-1",
      title: "Amina uploaded Product_Reel.mp4",
      detail: "Upload completed and ready to share with the client team.",
      time: "2 mins ago",
      tone: "success",
      read: false,
      href: "/files",
    },
    {
      id: "notif-expiry-1",
      teamId: "team-2",
      title: "Launch_Selects_Press.zip expires in 2 days",
      detail: "Consider extending expiry if external stakeholders still need access.",
      time: "17 mins ago",
      tone: "warning",
      read: false,
      href: "/files",
    },
    {
      id: "notif-invite-1",
      teamId: "team-1",
      title: "Jordan invited Noah Ellis to Studio Team",
      detail: "Pending invite sent to noah@clientco.com.",
      time: "1 hour ago",
      tone: "default",
      read: true,
      href: "/team",
    },
  ],
};

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

function makeId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

function initialsFromName(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "TM";
}

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppDataSnapshot>(initialData);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as AppDataSnapshot;
      setData(parsed);
    } catch {
      setData(initialData);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const value = useMemo<AppDataContextType>(() => ({
    ...data,
    addUpload: (teamId, name) => {
      const uploadName = name?.trim() || `Upload_${Date.now()}.mp4`;
      const uploadId = makeId("upload");
      setData((current) => ({
        ...current,
        uploads: [
          {
            id: uploadId,
            teamId,
            name: uploadName,
            type: "Video / MP4",
            size: "2.4 GB",
            duration: "02:11",
            resolution: "1920 x 1080",
            status: "uploading",
            progress: 18,
            speed: "11.2 MB/s",
            estimate: "4m 11s remaining",
          },
          ...current.uploads,
        ],
        files: [
          {
            id: makeId("file"),
            teamId,
            name: uploadName,
            size: "2.4 GB",
            uploader: "You",
            uploaderInitials: "YO",
            expiry: "Expires in 7 days",
            daysRemaining: 7,
            type: "video",
            thumbTone: "from-primary-subtle to-accent-subtle",
            format: "HD Video",
          },
          ...current.files,
        ],
        notifications: [
          {
            id: makeId("notif"),
            teamId,
            title: `New upload started: ${uploadName}`,
            detail: "Upload has been added to queue and is now processing.",
            time: "Just now",
            tone: "success",
            read: false,
            href: "/upload",
          },
          ...current.notifications,
        ],
      }));
    },
    updateMemberRole: (teamId, memberId, role) => {
      setData((current) => ({
        ...current,
        members: current.members.map((member) =>
          member.teamId === teamId && member.id === memberId
            ? { ...member, role }
            : member,
        ),
      }));
    },
    removeMember: (teamId, memberId) => {
      setData((current) => ({
        ...current,
        members: current.members.filter(
          (member) => !(member.teamId === teamId && member.id === memberId),
        ),
      }));
    },
    inviteMember: (teamId, email, role) => {
      const base = email.trim().split("@")[0].replace(/[._-]+/g, " ");
      const fullName = base.replace(/\b\w/g, (char) => char.toUpperCase());
      setData((current) => ({
        ...current,
        members: [
          {
            id: email.toLowerCase(),
            teamId,
            name: fullName,
            email: email.trim(),
            role,
            status: "Invited",
            initials: initialsFromName(fullName),
            lastActive: "Invite sent now",
          },
          ...current.members,
        ],
        notifications: [
          {
            id: makeId("notif"),
            teamId,
            title: `Invite sent to ${email.trim()}`,
            detail: `Access role assigned: ${role}.`,
            time: "Just now",
            tone: "default",
            read: false,
            href: "/team",
          },
          ...current.notifications,
        ],
      }));
    },
    toggleNotificationRead: (id) => {
      setData((current) => ({
        ...current,
        notifications: current.notifications.map((item) =>
          item.id === id ? { ...item, read: !item.read } : item,
        ),
      }));
    },
    markAllNotificationsRead: (teamId) => {
      setData((current) => ({
        ...current,
        notifications: current.notifications.map((item) =>
          item.teamId === teamId ? { ...item, read: true } : item,
        ),
      }));
    },
  }), [data]);

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppData must be used within an AppDataProvider");
  }
  return context;
}

