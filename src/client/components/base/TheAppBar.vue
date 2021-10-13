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
            title="Go back"
            class="ml-10 mr-2">
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn
            @click="$jumpToPageByIndex(1)"
            outlined
            small
            title="Go forward"
            class="mr-2">
            <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
            fab
            outlined
            small
            title="Personal Account">
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
                    title: "Project Website",
                    icon: "mdi-web",
                    href: ""
                }, {
                    title: "Project Forum",
                    icon: "mdi-forum",
                    href: ""
                }, {
                    title: "Project GitHub",
                    icon: "mdi-github",
                    href: "https://github.com/microdynamics-cpu"
                }, {
                    title: "Team E-mail",
                    icon: "mdi-email",
                    href: "mailto:microdynamics@126.com"
                }]
            };
        },

    }
</script>
