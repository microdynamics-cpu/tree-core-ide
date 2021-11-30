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
        <v-card-text class="mt-4">
            <v-row
                v-for="(item, index) in homePrjButtonItems"
                :key="index"
                justify="center">
                <v-col
                    cols="6"
                    md="6">
                    <v-btn
                        large
                        outlined
                        width="100%"
                        @click="() => { homePrjNewModel = true; }">
                        <v-icon color="lime darken-2"
                                class="tc-icon-text">
                            {{ item.icon }}
                        </v-icon>
                        {{ item.title }}
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-text>
        <BaseDialog
            ref="dialogHomePrjNew"
            :dialogShow="homePrjNewModel"
            dialogType="edit"
            dialogText="工程向导窗口"
            dialogWidth="500px"
            @handleDialogClose="closeDialog"
            @handleDialogYes="saveHomePrjData"
            @handleDialogNo="closeDialog">
            <template #body>
                <v-col
                    cols="12"
                    md="12">
                    <v-stepper
                        v-model="homePrjNewStepperModel"
                        alt-labels
                        class="tc-border-shadow-none">
                        <v-stepper-header class="tc-border-bottom-shadow-none">
                            <v-stepper-step
                                color="lime darken-2"
                                :complete="homePrjNewStepperModel > 1"
                                step="1">
                                基础信息
                            </v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step
                                color="lime darken-2"
                                :complete="homePrjNewStepperModel > 2"
                                step="2">
                                第三方库
                            </v-stepper-step>
                        </v-stepper-header>
                        <v-stepper-items>
                            <v-stepper-content step="1">
                                <v-row>
                                    <v-col
                                        cols="12"
                                        md="12">
                                        <v-text-field
                                            dense
                                            hint="请填写工程名称"
                                            label="工程名称："
                                            required
                                            outlined
                                            persistent-hint>
                                        </v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        md="12">
                                        <v-text-field
                                            dense
                                            hint="请选择工程目录"
                                            label="工程目录："
                                            required
                                            outlined
                                            persistent-hint>
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                            </v-stepper-content>
                        </v-stepper-items>
                    </v-stepper>
                </v-col>
                <!-- <v-col
                    cols="12"
                    md="12">
                    <v-text-field
                        dense
                        hint="请填写工程名称"
                        label="工程名称："
                        required
                        outlined
                        persistent-hint>
                    </v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    md="12">
                    <v-text-field
                        dense
                        hint="请填写工程名称"
                        label="工程目录："
                        required
                        outlined
                        persistent-hint>
                    </v-text-field>
                </v-col> -->
            </template>
        </BaseDialog>
        <BaseDialog
            ref="dialogHomePrjOpen"
            :dialogShow="homePrjOpenModel"
            dialogType="edit"
            dialogText="工程打开窗口"
            @handleDialogClose="closeDialog"
            @handleDialogYes="openHomePrjData"
            @handleDialogNo="closeDialog" />
        <BaseDialog
            ref="dialogHomePrjExample"
            :dialogShow="homePrjExampleModel"
            dialogType="edit"
            dialogText="工程示例窗口"
            @handleDialogClose="closeDialog"
            @handleDialogYes="openHomePrjExampleData"
            @handleDialogNo="closeDialog" />
    </v-card>
</template>
<script>
    import config from "@client/configs/index";
    import BaseDialog from "@client/components/base/BaseDialog";

    export default {
        name: "PageHomePrj",
        components: {
            BaseDialog
        },
        data: function() {
            return {
                i18n: config.i18n,
                homePrjNewModel: false,
                homePrjOpenModel: false,
                homePrjExampleModel: false,
                homePrjButtonItems: [{
                    title: config.i18n.idePrjNew,
                    icon: "mdi-plus-box",
                }, {
                    title: config.i18n.idePrjOpen,
                    icon: "mdi-folder",
                }, {
                    title: config.i18n.idePrjExample,
                    icon: "mdi-file-multiple",
                }],
                homePrjNewStepperModel: 1
            }
        },
        methods: {
            saveHomePrjData: function() {
                this.homePrjNewModel = false;
            },
            openHomePrjData: function() {
                this.homePrjOpenModel = false;
            },
            openHomePrjExampleData:function() {
                this.homePrjExampleModel = false;
            },
            closeDialog: function() {
                this.homePrjNewModel = false;
                this.homePrjOpenModel = false;
                this.homePrjExampleModel = false;
            }
        }
    }
</script>