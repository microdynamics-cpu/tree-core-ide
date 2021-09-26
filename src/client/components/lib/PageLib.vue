<template>
    <v-main>
        <v-container fluid>
            <v-row no-gutters>
                <v-col md="12">
                    <v-tabs
                        v-model="libTabsModel"
                        color="lime darken-2">
                        <v-tab>未安装</v-tab>
                        <v-tab @click="$jumpToPageByLinkQuery('history', '/lib/manage')">已安装</v-tab>
                    </v-tabs>
                    <v-tabs-items
                        v-model="libTabsModel"
                        dark>
                        <v-tab-item>
                            <v-card outlined id="libBrief">
                                <router-view></router-view>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card outlined id="libManage">
                                <!-- <router-view></router-view> -->
                            </v-card>
                        </v-tab-item>
                    </v-tabs-items>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>
<script>
    export default {
        name: "PageLib",
        data: function() {
            return {
                libTabsModel: null
            };
        },
        watch: {
            // libTabsModel: function(val) {
            //     console.log(val);
            //     if (val === 0) {
            //         // $("#libManage").find("router-view").remove();
            //         console.log(this.$("#libManage"));
            //     }
            //     else {
            //         // $("#libBrief").find("router-view").remove();
            //     }
            // }
        },
        created: function() {
            console.log(this.$("#libBrief"));
            console.log(this.$("body"));
        },
        mounted: function() {
            console.log(this.$("#libBrief"));
            console.log(this.$("body"));
        },
        methods: {
        }
    }
</script>
