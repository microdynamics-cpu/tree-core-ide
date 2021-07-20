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
import TheAppBar from "../../commons/components/TheAppBar.vue";
import TheDivider from "../../commons/components/TheDivider.vue";
import TheFooter from "../../commons/components/TheFooter.vue";
import TheNavDrawer from "../../commons/components/TheNavDrawer.vue"
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
    @import "../../commons/css/view.css";
</style>
