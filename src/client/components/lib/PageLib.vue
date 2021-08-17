<template>
    <v-main>
        <v-container fluid>
            <v-row no-gutters>
                <v-col md="12">
                    <v-tabs
                        v-model="libTabsModel"
                        color="lime darken-2">
                        <v-tab>未安装</v-tab>
                        <v-tab>已安装</v-tab>
                    </v-tabs>
                    <v-tabs-items
                        v-model="libTabsModel"
                        dark>
                        <v-tab-item height="200px">
                            <v-card outlined>
                                <!-- <router-view v-if="libPageType != 'libManage'"></router-view> -->
                                <router-view></router-view>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <!-- <v-card outlined>
                                <router-view v-if="libPageType != 'libBrief'"></router-view>
                            </v-card> -->
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
                libTabsModel: null,
                libPageType: "libBrief",
            };
        }
    }
</script>
