<template>
    <v-navigation-drawer
        app
        mini-variant
        mini-variant-width="60px"
        permanent>
        <v-list>
            <v-list-item class="px-0">
                <v-list-item-avatar tile>
                    <v-img :src="require('../../../../resources/images/logos/treecore_logo_main.svg').default"></v-img>
                </v-list-item-avatar>
            </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list dense>
            <v-list-item-group v-model="nvSelectedIndex">
                <v-list-item
                    v-for="item in navListItems"
                    :key="item.title"
                    color="lime darken-2"
                    class="px-0 text-center">
                    <v-list-item-content @click="$jumpToPageByLink('history', item.link)">
                        <v-list-item-icon class="mb-1 ml-4">
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title style="font-size:0.75rem;">{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</template>
<script>
    export default {
        name: "TheNavDrawer",
        data: function() {
            return {
                nvSelectedIndex: 0,
                navListItems: [{
                    // title: "Home",
                    title: "插件主页",
                    icon: "mdi-home",
                    link: "/home"
                }, {
                    // title: "Projects",
                    title: "工程管理",
                    icon: "mdi-code-greater-than-or-equal",
                    link: "/prj"
                }, {
                    // title: "Tools",
                    title: "调试工具",
                    icon: "mdi-toolbox",
                    link: "/tool"
                }, {
                    // title: "Libraries",
                    title: "库管理",
                    icon: "mdi-book",
                    link: "/lib/brief"
                }, {
                    // title: "Settings",
                    title: "系统设置",
                    icon: "mdi-cog",
                    link: "/setting"
                }]
            };
        },
        mounted: function() {
        }
    }
</script>
