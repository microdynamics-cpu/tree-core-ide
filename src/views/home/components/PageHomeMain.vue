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
                            <PageHomeBrief/>
                            <TheDivider/>
                            <PageHomeNews/>
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
import TheAppBar from "../../commons/components/TheAppBar";
import TheDivider from "../../commons/components/TheDivider.vue";
import TheFooter from "../../commons/components/TheFooter.vue";
import TheNavDrawer from "../../commons/components/TheNavDrawer.vue"
import PageHomeBrief from "./PageHomeBrief.vue";
import PageHomeNews from "./PageHomeNews.vue";

export default {
    name: "PageHomeMain",
    components: {
        TheAppBar,
        TheDivider,
        TheFooter,
        TheNavDrawer,
        PageHomeBrief,
        PageHomeNews
    },
    data: function() {
        return {};
    }
}
</script>
<style scoped>
    @import "../../commons/css/view.css";
</style>
