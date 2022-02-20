<template>
    <v-app>
        <v-card
            app
            dark
            height="100%">
            <TheNavDrawer/>
            <TheAppBar/>
            <transition mode="out-in">
                <router-view></router-view>
            </transition>
            <TheFooter/>
        </v-card>
    </v-app>
</template>
<script>
    import router from "../router/index";
    import TheAppBar from "@client/components/base/TheAppBar.vue";
    import TheFooter from "@client/components/base/TheFooter.vue";
    import TheNavDrawer from "@client/components/base/TheNavDrawer.vue";

    export default {
        name: "App",
        components: {
            TheAppBar,
            TheFooter,
            TheNavDrawer,
        },
        data: function() {
            return {};
        },
        mounted: function() {
            // 暂时通过手动设置跳转到主页模块
            // Jump to the home page module through manual setting
            router.push("/home");
        }
    }
</script>
<style scoped>
    @import "../css/client.css";
</style>
