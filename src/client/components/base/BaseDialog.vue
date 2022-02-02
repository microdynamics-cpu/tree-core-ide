<template>
    <v-dialog
        v-model="dialogModel"
        dark
        :max-width="dialogWidth"
        persistent>
        <v-card outlined>
            <v-toolbar
                dense
                class="tc-border-bottom-shadow-none tc-dialog-toolbar">
                <v-toolbar-title class="text-md-body-1">
                    <span v-if="dialogType !== 'edit'">{{ dialogAlert.title }}</span>
                    <span v-else>{{ dialogText }}</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn
                        icon
                        @click="handleDialogClose">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-card-text class="py-6">
                <v-alert
                    v-if="dialogType !== 'edit'"
                    outlined
                    text
                    :type="dialogAlert.type"
                    class="mb-0">
                    {{ dialogText }}
                </v-alert>
                <v-container
                    v-else
                    class="px-0 py-0">
                    <v-row>
                        <slot name="body"></slot>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions class="pt-0 pr-6 pb-6">
                <v-spacer></v-spacer>
                <slot name="button">
                    <v-btn
                        color="green"
                        dark
                        small
                        @click="handleDialogYes">
                        <v-icon left>mdi-check</v-icon>确定
                    </v-btn>
                    <v-btn
                        v-if="dialogType === 'confirm' ||
                              dialogType === 'edit'"
                        color="red"
                        dark
                        small
                        @click="handleDialogNo">
                        <v-icon left>mdi-cancel</v-icon>取消
                    </v-btn>
                </slot>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
    export default {
        name: "BaseDialog",
        props: {
            dialogShow: {
                type: Boolean,
                default: false
            },
            dialogType: {
                type: String,
                default: "alert"
            },
            dialogText: {
                type: String,
                default: ""
            },
            dialogWidth: {
                type: String,
                default: "400px"
            },
        },
        data: function() {
            return {
                dialogAlert: {
                    title: "信息",
                    type: "info"
                },
                dialogModel: false
            }
        },
        watch: {
            dialogShow: function(val) {
                this.dialogModel = val;
            }
        },
        mounted: function() {
            this.initDialogAlert();
        },
        methods: {
            handleDialogClose: function() {
                this.$emit("handleDialogClose");
            },
            handleDialogYes: function() {
                this.$emit("handleDialogYes");
            },
            handleDialogNo: function() {
                this.$emit("handleDialogNo");
            },
            initDialogAlert: function() {
                if (this.dialogType !== "edit") {
                    let dialogAlertObj = {
                        "alertInfo": {
                            title: "信息",
                            type: "info"
                        },
                        "alertWarn": {
                            title: "警告",
                            type: "warning"
                        },
                        "alertError": {
                            title: "错误",
                            type: "error"
                        },
                        "confirm": {
                            title: "警告",
                            type: "warning"
                        },
                        "msg": {
                            title: "消息",
                            type: "success"
                        }
                    }
                    this.dialogAlert = dialogAlertObj[this.dialogType];
                }
            }
        }
    }
</script>
<style scoped>
    /* .tc-dialog-toolbar .v-toolbar__content {
        padding-left: 24px;
        padding-right: 10px;
    } */
</style>
