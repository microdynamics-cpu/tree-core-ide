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
                            <PageLibDetail/>
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
import PageLibDetail from "./PageLibDetail.vue";

export default {
    name: "PageLibDetailMain",
    components: {
        TheAppBar,
        TheDivider,
        TheFooter,
        TheNavDrawer,
        PageLibDetail
    },
    data: function() {
        return {};
    },
    created() {
    }
}
</script>
<style scoped>
    @import "../../commons/css/view.css";
</style>
