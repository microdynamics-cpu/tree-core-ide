const lang = "zh-cn";
const i18nObj = {
    "zh-cn": {
        ideButtonConfirm: "确定",
        ideButtonCancel: "取消",
        ideButtonPrev: "上一步",
        ideButtonNext: "下一步",
        ideButtonProgess: "处理中",
        ideGoBack: "后退",
        ideGoForward: "前进",
        ideModuleHome: "系统主页",
        ideModuleProject: "工程管理",
        ideModuleTool: "开发工具",
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
        ideName: "木心集成开发环境",
        ideTagline: "下一代处理器集成开发环境",
        ideHomeShowAtStartup: "是否在启动时显示主页",
        ideRuleFieldNoEmpty: "字段不能为空！",
        ideRuleFieldNameValid: "字段只能是字母、数字、下划线或短横线的组合！",
        ideRuleFileDirExist: "文件目录已经存在！",

        idePrjNew: "新建工程",
        idePrjNewWin: "工程创建窗口",
        idePrjNewWinStep1: "基础信息",
        idePrjNewWinStep2: "工程配置",
        idePrjNewWinLabel1A: "工程名称",
        idePrjNewWinLabel1B: "工程目录",
        idePrjNewWinLabel2A: "标准模板",
        idePrjNewWinLabel2B: "语言类型",
        idePrjNewWinLabel2C: "第三方库",
        idePrjNewWinHint1A: "请填写工程名称。",
        idePrjNewWinHint1B: "请选择工程目录。",
        idePrjNewWinHint2A: "请选择标准模板。",
        idePrjNewWinHint2B: "请选择语言类型。",
        idePrjNewWinHint2C: "请选择第三方库。",
        idePrjWizardWin: "工程向导窗口",
        idePrjOpen: "打开工程",
        idePrjOpenWin: "工程打开窗口",
        idePrjExample: "参考示例",
        idePrjExampleWin: "工程示例窗口",
        idePrjExampleWinStep1: "基础信息",
        idePrjExampleWinLabel1A: "工程示例",
        idePrjExampleWinLabel1B: "工程目录",
        idePrjExampleWinHint1A: "请选择工程示例。",
        idePrjExampleWinHint1B: "请选择工程目录。",

        projectWebsite: "项目网站",
        projectForum: "项目论坛",
        projectGitHub: "代码仓库",
        teamEmail: "团队邮箱",
    },
    "en": {
        ideButtonConfirm: "Confirm",
        ideButtonCancel: "Cancel",
        ideButtonPrev: "Prev",
        ideButtonNext: "Next",
        ideButtonProgess: "Progess",
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
        ideName: "TreeCore IDE",
        ideTagline: "The next generation IDE for processor",
        ideHomeShowAtStartup: "Show at startup",
        ideRuleFieldNoEmpty: "Field cannot be empty!",
        ideRuleFieldNameValid: "Field can only be a combination of letters, numbers, underscores or dashes!",
        ideRuleFileDirExist: "File directory already exists!",

        idePrjNew: "New Project",
        idePrjNewWin: "Project New Window",
        idePrjNewWinStep1: "Base Info",
        idePrjNewWinStep2: "Settings",
        idePrjNewWinLabel1A: "Project Name",
        idePrjNewWinLabel1B: "Project Dir",
        idePrjNewWinLabel2A: "Template",
        idePrjNewWinLabel2B: "Language",
        idePrjNewWinLabel2C: "Libraries",
        idePrjNewWinHint1A: "Please input project's name.",
        idePrjNewWinHint1B: "Please select project's dir.",
        idePrjNewWinHint2A: "Please select template.",
        idePrjNewWinHint2B: "Please select languate.",
        idePrjNewWinHint2C: "Please select libraries.",
        idePrjWizardWin: "Project Wizard Window",
        idePrjOpen: "Open Project",
        idePrjOpenWin: "Project Open Window",
        idePrjExample: "Project Examples",
        idePrjExampleWin: "Project Examples Window",
        idePrjExampleWinStep1: "Base Info",
        idePrjExampleWinLabel1A: "Example Name",
        idePrjExampleWinLabel1B: "Project Dir",
        idePrjExampleWinHint1A: "Please select example's name.",
        idePrjExampleWinHint1B: "Please select project's dir.",

        projectWebsite: "Project Website",
        projectForum: "Project Forum",
        projectGitHub: "Project GitHub",
        teamEmail: "Team E-mail",
    }
}
const i18n = i18nObj[lang];

const base = {
    projectWebsiteUrl: "https://treecore.xyz",
    projectLogo: "https://myyerrol-1257317595.cos.ap-beijing.myqcloud.com/project/treecore/logos/treecore_logo_main.svg",
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

const webDebug = false;
// @ts-ignore
const vscodeLite = webDebug ? {} : acquireVsCodeApi();

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
    },
    flag: {
        webDebug: webDebug
    },
    code: vscodeLite
}
