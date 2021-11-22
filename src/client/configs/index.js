const lang = "zh-cn";
const i18nObj = {
    "zh-cn": {
        ideGoBack: "后退",
        ideGoForward: "前进",
        ideModuleHome: "插件主页",
        ideModuleProject: "工程管理",
        ideModuleTool: "调试工具",
        ideModuleLib: "库管理",
        ideModuleSetting: "系统设置",
        ideModuleSettingUser: "个人账户",
        ideTeam: "团队",
        ideTeamAboutUs: "关于我们",
        ideTeamContactUs: "联系我们",
        ideTeamBlog: "团队博客",
        ideDevelop: "开发",
        ideSupport: "支持",
        ideSupportDoc: "项目文档",
        ideSupportWiki: "项目维基",
        ideSupportAskQuestion: "咨询问题",
        ideSupportReportBug: "报告错误",
        ideSupportDonate: "慷慨捐赠",
        ideCommunity: "社区",
        projectWebsite: "项目网站",
        projectForum: "项目论坛",
        projectGitHub: "代码仓库",
        projectTagline: "下一代处理器集成开发环境",
        teamEmail: "团队邮箱",
    },
    "en": {
        ideGoBack: "Go Back",
        ideGoForward: "Go Forward",
        ideModuleHome: "Home",
        ideModuleProject: "Projects",
        ideModuleTool: "Tools",
        ideModuleLib: "Libraries",
        ideModuleSetting: "Settings",
        ideModuleSettingUser: "User Settings",
        ideTeam: "Team",
        ideTeamAboutUs: "About Us",
        ideTeamContactUs: "Contact Us",
        ideTeamBlog: "Team Blog",
        ideDevelop: "Development",
        ideSupport: "Support",
        ideSupportDoc: "Doc",
        ideSupportWiki: "Wiki",
        ideSupportAskQuestion: "Ask Question",
        ideSupportReportBug: "Report Bug",
        ideSupportDonate: "Donate",
        ideCommunity: "Community",
        projectWebsite: "Project Website",
        projectForum: "Project Forum",
        projectGitHub: "Project GitHub",
        projectTagline: "The next generation integrated development environment for processor",
        teamEmail: "Team E-mail",
    }
}
const i18n = i18nObj[lang];

const base = {
    projectWebsiteUrl: "https://treecore.xyz",
    orgGitHubUrl: "https://github.com/microdynamics-cpu",
    teamEmail: "microdynamics@126.com",
}
const baseComp = {
    ideModuleItems: [{
        title: i18n.ideModuleHome,
        icon: "mdi-home",
        link: "/home"
    }, {
        title: i18n.ideModuleProject,
        icon: "mdi-code-greater-than-or-equal",
        link: "/prj"
    }, {
        title: i18n.ideModuleTool,
        icon: "mdi-toolbox",
        link: "/tool"
    }, {
        title: i18n.ideModuleLib,
        icon: "mdi-book",
        link: "/lib/brief"
    }, {
        title: i18n.ideModuleSetting,
        icon: "mdi-cog",
        link: "/setting"
    }],
    ideCommItems: [{
        title: i18n.projectWebsite,
        icon: "mdi-web",
        href: base.projectWebsiteUrl
    }, {
        title: i18n.projectForum,
        icon: "mdi-forum",
        href: ""
    }, {
        title: i18n.projectGitHub,
        icon: "mdi-github",
        href: base.orgGitHubUrl
    }, {
        title: i18n.teamEmail,
        icon: "mdi-email",
        href: `mailto:${base.teamEmail}`
    }]
}

export default {
    i18n: i18n,
    base: base,
    comp: {
        ideAppBarItems: baseComp.ideCommItems,
        ideNavListItems: baseComp.ideModuleItems,
        ideFooterItems: [{
            title: i18n.ideTeam,
            list: [{
                title: i18n.ideTeamAboutUs,
                icon: ""
            }, {
                title: i18n.ideTeamContactUs,
                icon: ""
            }, {
                title: i18n.ideTeamBlog,
                icon: ""
            }]
        }, {
            title: i18n.ideDevelop,
            list: baseComp.ideModuleItems
        }, {
            title: i18n.ideSupport,
            list: [{
                title: i18n.ideSupportDoc,
                icon: ""
            }, {
                title: i18n.ideSupportWiki,
                icon: ""
            }, {
                title: i18n.ideSupportAskQuestion,
                icon: ""
            }, {
                title: i18n.ideSupportReportBug,
                icon: ""
            }, {
                title: i18n.ideSupportDonate,
                icon: ""
            }]
        }, {
            title: i18n.ideCommunity,
            list: baseComp.ideCommItems
        }]
    }
}
