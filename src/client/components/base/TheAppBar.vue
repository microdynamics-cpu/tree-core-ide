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
            :title="i18n.ideGoBack"
            class="ml-10 mr-2">
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn
            @click="$jumpToPageByIndex(1)"
            outlined
            small
            :title="i18n.ideGoForward"
            class="mr-2">
            <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
            fab
            outlined
            small
            :title="i18n.ideModuleSettingUser">
            <v-icon>mdi-account</v-icon>
        </v-btn>
    </v-app-bar>
</template>
<script>
    import config from "@client/configs/index";

    export default {
        name: "TheAppBar",
        data: function() {
            return {
                i18n: config.i18n,
                appBarItems: config.comp.ideAppBarItems
            };
        }
    }
</script>
