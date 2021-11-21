<template>
    <v-col md="12">
        <v-footer
            color="#1e1e1e"
            padless>
            <v-row
                justify-md="center"
                no-gutters>
                <v-col
                    v-for="item in footerItems"
                    :key="item.title"
                    md="2">
                    <v-list dense>
                        <div class="mb-2 text-md-h6">{{ item.title }}</div>
                        <v-list-item-group>
                            <v-list-item
                                v-for="it in item.list"
                                :key="it.title"
                                class="pl-0"
                                style="min-height:30px;">
                                <v-list-item-icon
                                    v-if="it.icon"
                                    class="mr-3"
                                    style="height:10px;">
                                    <v-icon>{{ it.icon }}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>{{ it.title }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-col>
                <v-col
                    md="12"
                    class="py-2 text-md-center">
                    <div class="text-md-body1">
                        <!-- The next generation integrated development environment for processor. -->
                        下一代处理器集成开发环境
                    </div>
                    <div class="text-md-body1">
                        2021-{{ new Date().getFullYear() }} Developed by
                        <strong>Team MicroDyanmics</strong>
                    </div>
                </v-col>
            </v-row>
        </v-footer>
    </v-col>
</template>
<script>
    export default {
        name: "TheFooter",
        data: function() {
            return {
                footerItems: [{
                    // title: "Team",
                    title: "团队",
                    list: [{
                        // title: "About Us",
                        title: "关于我们",
                        icon: ""
                    }, {
                        // title: "Contact Us",
                        title: "联系我们",
                        icon: ""
                    }, {
                        // title: "Team Blog",
                        title: "团队博客",
                        icon: ""
                    }]
                }, {
                    // title: "Development",
                    title: "开发",
                    list: [{
                        // title: "TreeCore IDE",
                        title: "插件主页",
                        icon: ""
                    }, {
                        // title: "Projects",
                        title: "工程管理",
                        icon: ""
                    }, {
                        // title: "Libraries",
                        title: "库管理",
                        icon: ""
                    }, {
                        // title: "Settings",
                        title: "系统设置",
                        icon: ""
                    }]
                }, {
                    // title: "Support",
                    title: "支持",
                    list: [{
                        // title: "Documents",
                        title: "项目文档",
                        icon: ""
                    }, {
                        // title: "WiKi",
                        title: "项目维基",
                        icon: ""
                    }, {
                        // title: "Ask Questions",
                        title: "咨询问题",
                        icon: ""
                    }, {
                        // title: "Report Bugs",
                        title: "报告错误",
                        icon: ""
                    }, {
                        // title: "Donate",
                        title: "慷慨捐赠",
                        icon: ""
                    }]
                }, {
                    // title: "Community",
                    title: "社区",
                    list: [{
                        // title: "Website",
                        title: "项目网站",
                        icon: "mdi-web"
                    }, {
                        // title: "Forum",
                        title: "项目论坛",
                        icon: "mdi-forum"
                    }, {
                        // title: "GitHub",
                        title: "代码仓库",
                        icon: "mdi-github",
                    }, {
                        // title: "E-mail",
                        title: "电子邮箱",
                        icon: "mdi-email"
                    }]
                }]
            };
        }
    }
</script>
