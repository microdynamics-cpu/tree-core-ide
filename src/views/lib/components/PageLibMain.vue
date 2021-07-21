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
                            <PageLib/>
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
import PageLib from "./PageLib.vue";

export default {
    name: "PageLibMain",
    components: {
        TheAppBar,
        TheDivider,
        TheFooter,
        TheNavDrawer,
        PageLib
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
