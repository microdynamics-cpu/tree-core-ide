<template>
    <v-app>
        <v-card
            app
            dark
            height="100%">
            <TheNavDrawer/>
            <TheAppBar/>
            <router-view></router-view>
            <TheFooter/>
        </v-card>
    </v-app>
</template>
<script>
    import TheAppBar from "@client/components/base/TheAppBar";
    // import TheAppBar from "./base/TheAppBar.vue";
    import TheFooter from "./base/TheFooter.vue";
    import TheNavDrawer from "./base/TheNavDrawer.vue";

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
            this.$jumpToPage("/home");
        }
    }
</script>
<style scoped>
    @import "../css/client.css";
</style>
