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
                        @click="item.func()">
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
            :dialogText="i18n.idePrjNewWin"
            dialogWidth="500px"
            @handleDialogClose="closeDialog"
            @handleDialogYes="() => {}"
            @handleDialogNo="() => {}">
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
                                {{ i18n.idePrjNewWinStep1 }}
                            </v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step
                                color="lime darken-2"
                                :complete="homePrjNewStepperModel > 2"
                                step="2">
                                {{ i18n.idePrjNewWinStep2 }}
                            </v-stepper-step>
                        </v-stepper-header>
                        <v-stepper-items>
                            <v-stepper-content step="1">
                                <v-form
                                    ref="homePrjNewForm1"
                                    lazy-validation>
                                    <v-row>
                                        <v-col
                                            cols="12"
                                            md="12"
                                            class="pt-5">
                                            <v-text-field
                                                v-model="homePrjNameModel"
                                                dense
                                                :hint="i18n.idePrjNewWinHint1A"
                                                :label="i18n.idePrjNewWinLabel1A"
                                                :rules="homePrjRules"
                                                outlined
                                                persistent-hint>
                                            </v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            md="12">
                                            <v-text-field
                                                v-model="homePrjDirModel"
                                                dense
                                                :hint="i18n.idePrjNewWinHint1B"
                                                :label="i18n.idePrjNewWinLabel1B"
                                                readonly
                                                :rules="homePrjRules"
                                                outlined
                                                persistent-hint
                                                @click="getHomePrjFileDirPath">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-stepper-content>
                            <v-stepper-content step="2">
                                <v-form
                                    ref="homePrjNewForm2"
                                    lazy-validation>
                                    <v-row>
                                        <v-col
                                            cols="12"
                                            md="12"
                                            class="pt-5">
                                            <v-select
                                                v-model="homePrjTempModel"
                                                dense
                                                :hint="i18n.idePrjNewWinHint2A"
                                                :items="homePrjTempItems"
                                                item-text="text"
                                                item-value="value"
                                                :label="i18n.idePrjNewWinLabel2A"
                                                return-object
                                                :rules="homePrjRules"
                                                outlined
                                                persistent-hint>
                                            </v-select>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            md="12">
                                            <v-select
                                                v-model="homePrjLangModel"
                                                dense
                                                :disabled="homePrjLangDisabled"
                                                :hint="i18n.idePrjNewWinHint2B"
                                                :items="homePrjLangItems"
                                                :label="i18n.idePrjNewWinLabel2B"
                                                :rules="homePrjRules"
                                                outlined
                                                persistent-hint>
                                            </v-select>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            md="12">
                                            <v-autocomplete
                                                v-model="homePrjLibModel"
                                                chips
                                                deletable-chips
                                                dense
                                                :disabled="homePrjLibDisabled"
                                                hide-no-data
                                                :hint="i18n.idePrjNewWinHint2C"
                                                :items="homePrjLibItems"
                                                :label="i18n.idePrjNewWinLabel2C"
                                                multiple
                                                outlined
                                                persistent-hint
                                                small-chips>
                                            </v-autocomplete>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-stepper-content>
                        </v-stepper-items>
                    </v-stepper>
                </v-col>
            </template>
            <template #button>
                <v-btn
                    v-show="homePrjNewPrevBtn"
                    color="green"
                    dark
                    small
                    @click="handleHomePrjNewData('prev')">
                    <v-icon left>mdi-arrow-left</v-icon>上一步
                </v-btn>
                <v-btn
                    v-model="homePrjNewNextModel"
                    color="green"
                    dark
                    small
                    @click="handleHomePrjNewData('next')">
                    <div v-if="homePrjNewStepperModel < homePrjNewStepperNum">
                        <v-icon left>mdi-arrow-right</v-icon>下一步
                    </div>
                    <div v-else>
                        <v-icon left>mdi-check</v-icon>确定
                    </div>
                </v-btn>
                <v-btn
                    color="red"
                    dark
                    small
                    @click="closeDialog">
                    <v-icon left>mdi-cancel</v-icon>取消
                </v-btn>
            </template>
        </BaseDialog>
        <BaseDialog
            ref="dialogHomePrjOpen"
            :dialogShow="homePrjOpenModel"
            dialogType="edit"
            dialogText="工程打开窗口"
            @handleDialogClose="closeDialog"
            @handleDialogYes="handleHomePrjOpenData"
            @handleDialogNo="closeDialog" />
        <BaseDialog
            ref="dialogHomePrjExample"
            :dialogShow="homePrjExampleModel"
            dialogType="edit"
            dialogText="工程示例窗口"
            @handleDialogClose="closeDialog"
            @handleDialogYes="handleHomePrjExampleData"
            @handleDialogNo="closeDialog" />
    </v-card>
</template>
<script>
    import config from "@client/configs/index";
    import view from "@native/utils/view";
    import BaseDialog from "@client/components/base/BaseDialog";

    const webDebugFlag = true;
    const vscodeLite = webDebugFlag ? {} : acquireVsCodeApi();

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
                    func: () => {
                        this.handleHomePrjNewData();
                        // this.homePrjNewModel = true;
                    }
                }, {
                    title: config.i18n.idePrjOpen,
                    icon: "mdi-folder",
                }, {
                    title: config.i18n.idePrjExample,
                    icon: "mdi-file-multiple",
                }],
                homePrjNewStepperModel: 1,
                homePrjNewStepperNum: 2,
                homePrjRules: [
                    (val) => {
                        if (typeof val === "object") {
                            val = val.value;
                        }
                        return (val || "").length > 0 || this.i18n.ideLimitFieldNoEmpty
                    }
                ],
                homePrjNameModel: "",
                homePrjDirModel: "",
                homePrjTempModel: "",
                homePrjTempItems: [{
                    text: "无",
                    value: "none"
                }, {
                    text: "一生一芯",
                    value: "ysyx"
                }],
                homePrjLangModel: "",
                homePrjLangDisabled: false,
                homePrjLangItems: ["Verilog", "Chisel"],
                homePrjLibModel: "",
                homePrjLibDisabled: false,
                homePrjLibItems: ["Verilator", "Difftest", "NEMU"],
                homePrjNewPrevBtn: false,
                homePrjNewNextModel: "",
            }
        },
        watch: {
            homePrjTempModel: function(val) {
                console.log(val);
                if (val.value === "ysyx") {
                    this.homePrjLangModel = "Chisel";
                    this.homePrjLibModel = ["Verilator", "Difftest"];
                    this.homePrjLibDisabled = true;
                }
                else {
                    this.homePrjLangModel = "Verilog";
                    this.homePrjLibModel = [];
                    this.homePrjLibDisabled = false;
                }
            }
        },
        mounted: function() {
            window.addEventListener("message", (event) => {
                view.handleMessageFromExtension(event);
            });
        },
        methods: {
            handleHomePrjNewData: function(dir) {
                if (dir === "next") {
                    if (this.homePrjNewStepperModel === 1 &&
                       !this.$refs.homePrjNewForm1.validate()) {
                        return;
                    }
                    if (this.homePrjNewStepperModel === 2 &&
                       !this.$refs.homePrjNewForm2.validate()) {
                        return;
                    }

                    this.homePrjNewStepperModel++;
                    if (this.homePrjNewStepperModel >
                        this.homePrjNewStepperNum) {
                        this.homePrjNewStepperModel =
                            this.homePrjNewStepperNum;
                    }
                }
                else if (dir === "prev") {
                    this.homePrjNewStepperModel--;
                    if (this.homePrjNewStepperModel < 1) {
                        this.homePrjNewStepperModel = 1;
                    }
                }
                else {
                    this.homePrjNewStepperModel = 1;
                    this.homePrjNameModel = "";
                    this.homePrjDirModel = "",
                    this.homePrjTempModel = "";
                    this.homePrjLangModel = "";
                    this.homePrjLibModel = "";
                    this.homePrjNewModel = true;
                    this.$nextTick(() => {
                        this.$refs.homePrjNewForm1.resetValidation();
                        this.$refs.homePrjNewForm2.resetValidation();
                    });
                }

                console.log("homePrjNewStepperModel: " +
                            this.homePrjNewStepperModel);

                if (this.homePrjNewStepperModel !== 1) {
                    this.homePrjNewPrevBtn = true;
                }
                else {
                    this.homePrjNewPrevBtn = false;
                }

                if (this.homePrjNewStepperModel ===
                    this.homePrjNewStepperNum) {

                }
            },
            handleHomePrjOpenData: function() {
                this.homePrjOpenModel = false;
            },
            handleHomePrjExampleData: function() {
                this.homePrjExampleModel = false;
            },
            getHomePrjFileDirPath: function() {
                view.sendDataToExtension("getExtnFileDirPath", (result) => {
                    console.log(result);
                    if (result.length > 0) {
                        this.homePrjDirModel = result[0].path;
                    }
                },
                vscodeLite);
            },
            closeDialog: function() {
                this.homePrjNewModel = false;
                this.homePrjOpenModel = false;
                this.homePrjExampleModel = false;
            }
        }
    }
</script>
