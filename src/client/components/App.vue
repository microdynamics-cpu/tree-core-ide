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
            this.$axios.get("http://localhost:3000/lib/brief/getLibInfoData").then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            });
        }
    }
</script>
<style scoped>
    @import "../css/client.css";
</style>
