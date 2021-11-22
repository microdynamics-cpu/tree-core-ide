<template>
    <v-card
        height="100%"
        outlined>
            <v-card-title>
            <v-icon
                color="lime darken-2"
                small>mdi-square
            </v-icon>
            <span class="tc-card-title-span-20px">{{ i18n.ideModuleLib }}</span>
        </v-card-title>
        <v-card-text>

        </v-card-text>
    </v-card>
</template>
<script>
    import config from "@client/configs/index"

    export default {
        name: "PageHomeLib",
        data: function() {
            return {
                i18n: config.i18n
            }
        }
    }
</script>