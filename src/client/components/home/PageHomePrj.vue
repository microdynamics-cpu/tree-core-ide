<template>
    <v-card
        height="100%"
        outlined>
            <v-card-title>
            <v-icon
                color="lime darken-2"
                small>mdi-square
            </v-icon>
            <span class="tc-card-title-span-20px">{{ i18n.ideModuleProject }}</span>
        </v-card-title>
        <v-card-text>
            <v-row
                v-for="(item, index) in prjButtonItems"
                :key="index"
                justify="center">
                <v-col md="6">
                    <v-btn
                        large
                        outlined
                        width="100%">
                        <v-icon color="lime darken-2"
                                class="tc-icon-text">
                            {{ item.icon }}
                        </v-icon>
                        {{ item.title }}
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script>
    import config from "@client/configs/index"

    export default {
        name: "PageHomePrj",
        data: function() {
            return {
                i18n: config.i18n,
                prjButtonItems: [{
                    title: config.i18n.idePrjNew,
                    icon: "mdi-plus-box",
                }, {
                    title: config.i18n.idePrjOpen,
                    icon: "mdi-folder",
                }, {
                    title: config.i18n.idePrjExample,
                    icon: "mdi-file-multiple",
                }]
            }
        }
    }
</script>