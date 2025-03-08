// export const serverConfig = {
//     categories: [
//       { 
//         name: "📜 Rules & Info", 
//         textChannels: ["welcome", "faq", "roles"] 
//       },
//       { 
//         name: "📢 Announcements", 
//         textChannels: ["server-news", "community-events", "content-updates"] 
//       },
//       { 
//         name: "💬 Community Hub", 
//         textChannels: ["general-chat", "off-topic", "memes", "introductions", "international-chat"],
//         voiceChannels: ["🎤 Community"]
//       },
//       { 
//         name: "🎮 Gaming Zone", 
//         textChannels: ["game-discussions", "looking-for-group", "clips-and-highlights"],
//         voiceChannels: ["🎮 Gaming", "🕹️ Game Room 1", "🕹️ Game Room 2", "🕹️ Game Room 3"]
//       },
//       { 
//         name: "💻 Code & Tech Zone", 
//         textChannels: ["coding-discussions", "frontend-dev", "backend-dev", "ai-ml", "help-and-debugging"] 
//       },
//       { 
//         name: "📸 Content Creation & Media", 
//         textChannels: ["content-showcase", "photo-videography", "design-art"] 
//       },
//       { 
//         name: "🤝 Networking & Collaborations", 
//         textChannels: ["project-collabs", "job-opportunities", "learning-resources"] 
//       },
//       { 
//         name: "🚀 Share Your Work", 
//         textChannels: ["web-projects", "game-development", "discord-bots", "github-showcase"] 
//       },
//       { 
//         name: "🎙️ Live Events & Interactions", 
//         textChannels: ["live-streams", "live-chat", "community-votes"],
//         voiceChannels: ["📢 PPS Live"]
//       },
//       { 
//         name: "🛠️ Help & Support", 
//         textChannels: ["ask-for-help", "bug-reports"] 
//       },
//       { 
//         name: "💎 VIP Zone", 
//         textChannels: ["vip-lounge", "exclusive-announcements"] 
//       }
//     ],
  
//     voiceChannels: [
//         "🎤 Community",
//         "🎮 Gaming",
//         "📢 PPS Live",
//         "🕹️ Game Room 1",
//         "🕹️ Game Room 2",
//         "🕹️ Game Room 3",
//         "🎥 Stream Hangout",
//       ],
      
//     standaloneVoiceChannels: [ // Voice channels not under any category
//       "🎥 Stream Hangout"
//     ],
  
//     roles: [
//         // Core Roles
//         { name: "🎮 Gamer", color: "#ff5733" }, // Gaming channels access
//         { name: "💻 Coder", color: "#4287f5" }, // Tech/Coding access
//         { name: "🎥 Creator", color: "#f5a742" }, // Content/Media discussions
//         { name: "🌐 Connector Pro", color: "#6a1b9a" }, // Networking & collabs
//         { name: "👑 Admin", color: "#ff0000" }, // Full server management
//         { name: "🔧 Moderator", color: "#0000ff" }, // Server moderation
      
//         // Community Roles (Level-Based)
//         { name: "🆕 Newbie", color: "#808080" }, // Default for new members
//         { name: "🌟 Active", color: "#ffd700" }, // Earned for participation
//         { name: "🏆 Veteran", color: "#8b4513" }, // Long-time active users
//         { name: "🎖️ Legend", color: "#b8860b" }, // Recognized top contributors
      
//         // Combo Roles for Multi-Talented Members
//         { name: "📀 Dev & Creator", color: "#800080" }, // Coder + Creator
//         { name: "🎮 GameDev", color: "#ff4500" }, // Gamer + Coder
//         { name: "📸 Media Techie", color: "#2e8b57" }, // Photographer + Tech Enthusiast
//         { name: "🔥 Community Pillar", color: "#dc143c" }, // Highly engaged member
//       ],
      
  
//     deleteRoles: ["OldRole1", "OldRole2"],
//     keepRoles: ["Admin", "Moderator", "Member", "VIP"],
//     deleteChannels: ["old-channel-1", "old-channel-2"],
//     deleteCategories: ["old-category"],
//     keepChannels: ["welcome", "general-chat"]
//   };

  export const serverConfig = {
    categories: [
      {
        name: "💬 Community Hub",
        textChannels: ["general-chat", "off-topic"],
        voiceChannels: ["🎤 General Voice", "🔊 Chill Zone"],
      },
      {
        name: "🎮 Gaming Zone",
        textChannels: ["game-discussions", "clips-and-highlights"],
        voiceChannels: ["🎮 Gaming VC 1", "🎮 Gaming VC 2"],
      },
    ],
    voiceChannels: [ // Standalone voice channels (not inside any category)
      "🎥 Stream Hangout",
      "🛠 Dev Talk",
      "🎶 Music Lounge",
    ],

    roles: [
      { name: "Admin", color: "#ff0000" },
      { name: "Moderator", color: "#0000ff" },
      { name: "Member", color: "#00ff00" },
      { name: "VIP", color: "#ffcc00" },
    ],
    
    deleteChannels: ["old-channel-1", "old-channel-2"],
    deleteCategories: ["old-category"],
    keepChannels: ["welcome", "general-chat"],
  };
  
  

/*export const serverConfig = {
    categories: [
      { name: "📜 Rules & Info", channels: ["welcome", "faq", "roles"] },
      { name: "📢 Announcements", channels: ["server-news", "community-events", "content-updates"] },
      { name: "💬 Community Hub", channels: ["general-chat", "off-topic", "memes", "introductions", "international-chat"] },
      { name: "🎮 Gaming Zone", channels: ["game-discussions", "looking-for-group", "clips-and-highlights"] },
      { name: "💻 Code & Tech Zone", channels: ["coding-discussions", "frontend-dev", "backend-dev", "ai-ml", "help-and-debugging"] },
      { name: "📸 Content Creation & Media", channels: ["content-showcase", "photo-videography", "design-art"] },
      { name: "🤝 Networking & Collaborations", channels: ["project-collabs", "job-opportunities", "learning-resources"] },
      { name: "🚀 Share Your Work", channels: ["web-projects", "game-development", "discord-bots", "github-showcase"] },
      { name: "🎙️ Live Events & Interactions", channels: ["live-streams", "live-chat", "community-votes"] },
      { name: "🛠️ Help & Support", channels: ["ask-for-help", "bug-reports"] },
      { name: "💎 VIP Zone", channels: ["vip-lounge", "exclusive-announcements"] },
    ],
  
    voiceChannels: [
      "🎤 Community",
      "🎮 Gaming",
      "📢 PPS Live",
      "🕹️ Game Room 1",
      "🕹️ Game Room 2",
      "🕹️ Game Room 3",
      "🎥 Stream Hangout",
    ],
  
    roles: [
      { name: "Admin", color: "#ff0000" },
      { name: "Moderator", color: "#0000ff" },
      { name: "Member", color: "#00ff00" },
      { name: "VIP", color: "#ffcc00" },
    ],
  
    deleteRoles: ["OldRole1", "OldRole2"],

    keepRoles: ["Admin", "Moderator", "Member", "VIP"],
  };*/
  