<template>
    <v-navigation-drawer
        app
        mini-variant
        mini-variant-width="60px"
        permanent>
        <v-list>
            <v-list-item class="px-0">
                <v-list-item-avatar tile>
                    <v-img :src="require('../../../resources/logos/treecore_logo_main.svg').default"></v-img>
                </v-list-item-avatar>
            </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list dense>
            <v-list-item-group>
                <v-list-item
                    color="lime darken-2"
                    v-for="item in tcNavListItems"
                    :key="item.title"
                    class="px-0 text-center">
                    <v-list-item-content>
                        <v-list-item-icon class="mb-0 ml-4">
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title style="font-size:0.75rem;">{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</template>
<script>
export default {
    name: "TheNavDrawer",
    data: function() {
        return {
            tcNavListItems: [{
                title: "Home",
                icon: "mdi-home"
            }, {
                title: "Projects",
                icon: "mdi-code-greater-than-or-equal"
            }, {
                title: "Tools",
                icon: "mdi-toolbox"
            }, {
                title: "Libraries",
                icon: "mdi-book"
            }, {
                title: "Settings",
                icon: "mdi-cog"
            }]
        };
    }
}
</script>
