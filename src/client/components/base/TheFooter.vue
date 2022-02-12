<template>
    <v-col md="12">
        <v-footer
            color="#1e1e1e"
            padless>
            <v-row
                justify-md="center"
                no-gutters>
                <v-col
                    v-for="item in footerItems"
                    :key="item.title"
                    md="2">
                    <v-list dense>
                        <div class="mb-2 text-md-h6">{{ item.title }}</div>
                        <v-list-item-group>
                            <v-list-item
                                v-for="it in item.list"
                                :key="it.title"
                                class="pl-0"
                                style="min-height:30px;">
                                <v-list-item-icon
                                    v-if="it.icon"
                                    class="mr-3"
                                    style="height:10px;">
                                    <v-icon>{{ it.icon }}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>{{ it.title }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-col>
                <v-col
                    md="12"
                    class="py-2 text-md-center">
                    <div class="text-md-body1">
                       {{ i18n.ideTagline }}
                    </div>
                    <div class="text-md-body1">
                        2021-{{ new Date().getFullYear() }} Developed by
                        <strong>Team MicroDyanmics</strong>
                    </div>
                </v-col>
            </v-row>
        </v-footer>
    </v-col>
</template>
<script>
    import config from "@client/config/index";

    export default {
        name: "TheFooter",
        data: function() {
            return {
                i18n: config.i18n,
                footerItems: config.comp.ideFooterItems
            };
        }
    }
</script>
