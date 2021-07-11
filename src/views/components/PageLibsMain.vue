<template>
    <div id="app">
        <v-app>
            <v-card
                app
                dark
                height="100%">
                <TheNavDrawer/>
                <TheAppBar/>
                <v-main>
                    <v-container fluid>
                        <v-row no-gutters>
                            <PageLibs/>
                            <TheDivider/>
                            <TheFooter/>
                        </v-row>
                    </v-container>
                </v-main>
            </v-card>
        </v-app>
    </div>
</template>
<script>
import TheAppBar from "./TheAppBar.vue";
import TheDivider from "./TheDivider.vue";
import TheFooter from "./TheFooter.vue";
import TheNavDrawer from "./TheNavDrawer.vue"
import PageLibs from "./PageLibs.vue";

export default {
    name: "PageLibsMain",
    components: {
        TheAppBar,
        TheDivider,
        TheFooter,
        TheNavDrawer,
        PageLibs
    },
    data: function() {
        return {};
    },
    created() {
        console.log("test");
    }
}
</script>
<style scoped>
    @import "../css/common.css";
</style>
