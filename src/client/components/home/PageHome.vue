<template>
    <v-main>
        <v-container fluid>
            <v-row no-gutters>
                <v-col md="12">
                    <v-row>
                        <v-col md="6">
                            <v-card
                                height="100%"
                                outlined>
                                <v-card-text class="text-md-center">
                                    <v-avatar
                                        size="200px"
                                        tile>
                                        <!-- <v-img :src="require('../../../../resources/images/logos/treecore_logo_main.svg').default"></v-img> -->
                                        <v-img :src="base.projectLogo"></v-img>
                                    </v-avatar>
                                    <div class="mt-8 text-md-h5 font-weight-bold white--text">{{ i18n.ideName }}</div>
                                    <div class="mt-2 text-md-body-1 white--text">{{ i18n.ideTagline }}</div>
                                    <v-checkbox
                                        v-model="homeCheckBoxModel"
                                        color="lime darken-2"
                                        :label="i18n.ideHomeShowAtStartup"
                                        style="">
                                    </v-checkbox>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col md="6">
                            <PageHomePrj />
                        </v-col>
                        <v-col md="6">
                            <PageHomeTool />
                        </v-col>
                        <v-col md="6">
                           <PageHomeLib />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>
<script>
    import config from "@client/config/index";
    import view from "@native/utils/view";
    import PageHomePrj from "@client/components/home/PageHomePrj";
    import PageHomeTool from "@client/components/home/PageHomeTool";
    import PageHomeLib from "@client/components/home/PageHomeLib";

    const webDebug = config.flag.webDebug;
    const vscodeLite = config.code;

    export default {
        name: "PageHome",
        components: {
            PageHomePrj,
            PageHomeTool,
            PageHomeLib
        },
        data: function() {
            return {
                base: config.base,
                i18n: config.i18n,
                homeCheckBoxModel: true
            }
        },
        watch: {
            homeCheckBoxModel: function(val) {
                if (!webDebug) {
                    view.sendViewMsgToExtn(
                        "setExtnConfig", {
                            key: "treecore.config.showHomePageAtStartup",
                            val: val,
                            show: false
                        }, (res) => {
                        },
                        vscodeLite);
                }
            }
        },
        mounted: function() {
            window.addEventListener("message", (event) => {
                view.handleViewMsgFromExtn(event);
            });
            if (!webDebug) {
                view.sendViewMsgToExtn(
                    "getExtnConfig", {
                        key: "treecore.config.showHomePageAtStartup",
                    }, (res) => {
                        this.homeCheckBoxModel = res;
                    },
                    vscodeLite);
            }
        },
    }
</script>
