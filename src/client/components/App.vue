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
            this.$jumpToPage("/home");
        }
    }
</script>
<style scoped>
    @import "../css/client.css";
</style>
