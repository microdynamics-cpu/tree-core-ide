<template>
    <v-app-bar app
               height="60px">
        <div v-for="item in appBarItems"
             :key="item.title">
            <v-btn
                :href="item.href"
                outlined
                small
                target="_blank"
                :title="item.title"
                class="mr-2">
                <v-icon>{{ item.icon }}</v-icon>
            </v-btn>
        </div>
        <v-btn
            @click="$jumpToPageByIndex(-1)"
            outlined
            small
            title="后退"
            class="ml-10 mr-2">
            <!-- title="Go back"
            class="ml-10 mr-2"> -->
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn
            @click="$jumpToPageByIndex(1)"
            outlined
            small
            title="前进"
            class="mr-2">
            <!-- title="Go forward"
            class="mr-2"> -->
            <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
            fab
            outlined
            small
            title="个人账户">
            <!-- title="Personal Account"> -->
            <v-icon>mdi-account</v-icon>
        </v-btn>
    </v-app-bar>
</template>
<script>
    export default {
        name: "TheAppBar",
        data: function() {
            return {
                appBarItems: [{
                    // title: "Project Website",
                    title: "项目网站",
                    icon: "mdi-web",
                    href: "https://treecore.xyz"
                }, {
                    // title: "Project Forum",
                    title: "项目论坛",
                    icon: "mdi-forum",
                    href: ""
                }, {
                    // title: "Project GitHub",
                    title: "代码仓库",
                    icon: "mdi-github",
                    href: "https://github.com/microdynamics-cpu"
                }, {
                    // title: "Team E-mail",
                    title: "电子邮箱",
                    icon: "mdi-email",
                    href: "mailto:microdynamics@126.com"
                }]
            };
        },

    }
</script>
