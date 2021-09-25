<template>
    <v-dialog
        v-model="dialogShow"
        persistent
        max-width="400px">
        <v-card outlined>
            <v-card-title>{{ dialogAlert.title }}</v-card-title>
            <v-card-text style="padding-bottom:0px;">
                <v-alert
                    outlined
                    :type="dialogAlert.type">
                    {{ dialogText }}
                </v-alert>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="green"
                    dark
                    small
                    @click="handleDialogYes">
                    <v-icon left>mdi-check</v-icon>确定
                </v-btn>
                <v-btn
                    v-if="dialogType === 'confirm'"
                    color="red"
                    dark
                    small
                    @click="handleDialogNo">
                    <v-icon left>mdi-cancel</v-icon>取消
                </v-btn>
                <v-spacer></v-spacer>
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
            }
        },
        data: function() {
            return {
                dialogAlert: {
                    title: "信息",
                    type: "info"
                },
                dialogModel: true
            }
        },
        watch: {
        },
        mounted: function() {
            this.initDialogAlert();
        },
        methods: {
            handleDialogYes: function() {
                this.$emit("handleDialogYes");
            },
            handleDialogNo: function() {
                this.dialogModel = false;
                this.dialogShow = false;
                this.$emit("handleDialogNo");
            },
            initDialogAlert: function() {
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
</script>
<style scoped>

</style>
