<template>
    <v-col md="12">
        <v-footer
            color="#1e1e1e"
            padless>
            <v-row
                justify-md="center"
                no-gutters>
                <v-col
                    md="2"
                    v-for="item in footerItems"
                    :key="item.title">
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
                        The next generation integrated development environment for processor.
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
    export default {
        name: "TheFooter",
        data: function() {
            return {
                footerItems: [{
                    title: "Team",
                    list: [{
                        title: "About Us",
                        icon: ""
                    }, {
                        title: "Contact Us",
                        icon: ""
                    }, {
                        title: "Team Blog",
                        icon: ""
                    }]
                }, {
                    title: "Development",
                    list: [{
                        title: "TreeCore IDE",
                        icon: ""
                    }, {
                        title: "Projects",
                        icon: ""
                    }, {
                        title: "Libraries",
                        icon: ""
                    }, {
                        title: "Settings",
                        icon: ""
                    }]
                }, {
                    title: "Support",
                    list: [{
                        title: "Documents",
                        icon: ""
                    }, {
                        title: "WiKi",
                        icon: ""
                    }, {
                        title: "Ask Questions",
                        icon: ""
                    }, {
                        title: "Report Bugs",
                        icon: ""
                    }, {
                        title: "Donate",
                        icon: ""
                    }]
                }, {
                    title: "Community",
                    list: [{
                        title: "Website",
                        icon: "mdi-web"
                    }, {
                        title: "Forum",
                        icon: "mdi-forum"
                    }, {
                        title: "GitHub",
                        icon: "mdi-github",
                    }, {
                        title: "E-mail",
                        icon: "mdi-email"
                    }]
                }]
            };
        }
    }
</script>
