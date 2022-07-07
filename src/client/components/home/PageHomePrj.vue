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
                                                :rules="[homePrjRules.required, homePrjRules.prjName]"
                                                outlined
                                                persistent-hint>
                                            </v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            md="12">
                                            <v-text-field
                                                v-model="homePrjDirModel"
                                                :error-messages="homePrjDirErrorMsg"
                                                dense
                                                :hint="i18n.idePrjNewWinHint1B"
                                                :label="i18n.idePrjNewWinLabel1B"
                                                :readonly="homePrjReadonly"
                                                :rules="[homePrjRules.required]"
                                                outlined
                                                persistent-hint
                                                @click="getHomePrjFileDirPath('dir')">
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
                                                outlined
                                                persistent-hint
                                                return-object
                                                :rules="[homePrjRules.required]">
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
                                                outlined
                                                persistent-hint
                                                :rules="[homePrjRules.required]">
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
                    <v-icon left>mdi-arrow-left</v-icon>{{ i18n.ideButtonPrev }}
                </v-btn>
                <v-btn
                    v-model="homePrjNewNextModel"
                    color="green"
                    dark
                    small
                    @click="handleHomePrjNewData('next')">
                    <div v-if="homePrjNewStepperModel < homePrjNewStepperNum">
                        <v-icon left>mdi-arrow-right</v-icon>{{ i18n.ideButtonNext }}
                    </div>
                    <div v-else>
                        <v-icon left>mdi-check</v-icon>{{ i18n.ideButtonConfirm }}
                    </div>
                </v-btn>
                <v-btn
                    color="red"
                    dark
                    small
                    @click="closeDialog">
                    <v-icon left>mdi-cancel</v-icon>{{ i18n.ideButtonCancel }}
                </v-btn>
            </template>
        </BaseDialog>
        <BaseDialog
            ref="dialogHomePrjWizard"
            :dialogShow="homePrjWizardModel"
            dialogType="edit"
            :dialogText="i18n.idePrjWizardWin"
            dialogWidth="500px"
            @handleDialogClose="closeDialog"
            @handleDialogYes="() => {}"
            @handleDialogNo="() => {}">
            <template #body>
                <v-col
                    cols="12"
                    md="12">
                    <v-carousel
                        :cycle="true"
                        :show-arrows="false"
                        height="250px"
                        :hide-delimiter-background="true"
                        interval="10000">
                        <v-carousel-item>
                            <v-card
                                height="100%"
                                outlined
                                class="tc-elem-back-color-grey">
                                <v-card-title>
                                    <v-icon left>mdi-information-outline</v-icon>
                                    <span>重要提示</span>
                                </v-card-title>
                                <v-card-text>第一次初始化可能需要联网下载依赖的第三方库，请耐心等候！</v-card-text>
                            </v-card>
                        </v-carousel-item>
                        <v-carousel-item>
                            <v-card
                                height="100%"
                                outlined
                                class="tc-elem-back-color-grey">
                                <v-card-title>
                                    <v-icon left>mdi-information-outline</v-icon>
                                    <span>工程结构</span>
                                </v-card-title>
                                <v-card-text>
                                    <span>木心工程主要包含以下几个项目：</span>
                                    <v-row
                                        dense
                                        class="mt-3">
                                        <v-col cols="12">
                                            <v-icon left>mdi-folder-outline</v-icon>
                                            <span class="tc-code-back-highlight">lib</span>
                                            <span>:</span>
                                            <span>存放工程使用的第三方库文件</span>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-icon left>mdi-folder-outline</v-icon>
                                            <span class="tc-code-back-highlight">sim</span>
                                            <span>:</span>
                                            <span>存放工程使用的第三方库文件</span>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-icon left>mdi-file-outline</v-icon>
                                            <span class="tc-code-back-highlight">project.json</span>
                                            <span>:</span>
                                            <span>记录工程所有配置信息的文件</span>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-carousel-item>
                    </v-carousel>
                </v-col>
            </template>
            <template #button>
                <v-btn
                    color="green"
                    dark
                    disabled
                    small
                    @click="closeDialog">
                    <v-progress-circular
                        color="primary"
                        indeterminate
                        size="18"
                        width="2"
                        class="mr-3">
                    </v-progress-circular>{{ i18n.ideButtonProgess }}
                </v-btn>
                <v-btn
                    color="red"
                    dark
                    small
                    @click="closeDialog">
                    <v-icon left>mdi-cancel</v-icon>{{ i18n.ideButtonCancel }}
                </v-btn>
            </template>
        </BaseDialog>
        <BaseDialog
            ref="dialogHomePrjOpen"
            :dialogShow="homePrjOpenModel"
            dialogType="edit"
            :dialogText="i18n.idePrjOpenWin"
            dialogWidth="500px"
            @handleDialogClose="closeDialog"
            @handleDialogYes="() => {}"
            @handleDialogNo="() => {}" />
        <BaseDialog
            ref="dialogHomePrjExample"
            :dialogShow="homePrjExampleModel"
            dialogType="edit"
            :dialogText="i18n.idePrjExampleWin"
            dialogWidth="500px"
            @handleDialogClose="closeDialog"
            @handleDialogYes="() => {}"
            @handleDialogNo="() => {}">
            <template #body>
                <v-col
                    cols="12"
                    md="12">
                    <v-stepper
                        v-model="homePrjExampleStepperModel"
                        alt-labels
                        class="tc-border-shadow-none">
                        <v-stepper-header
                            class="tc-border-bottom-shadow-none"
                            style="justify-content:center;">
                            <v-stepper-step
                                color="lime darken-2"
                                :complete="homePrjExampleStepperModel > 1"
                                step="1">
                                {{ i18n.idePrjExampleWinStep1 }}
                            </v-stepper-step>
                        </v-stepper-header>
                        <v-stepper-items>
                            <v-stepper-content step="1">
                                <v-form
                                    ref="homePrjExampleForm1"
                                    lazy-validation>
                                    <v-row>
                                        <v-col
                                            cols="12"
                                            md="12"
                                            class="pt-5">
                                            <v-autocomplete
                                                v-model="homePrjNameModel"
                                                dense
                                                hide-no-data
                                                :hint="i18n.idePrjExampleWinHint1A"
                                                :items="homePrjExampleItems"
                                                item-text="text"
                                                item-value="value"
                                                :label="i18n.idePrjExampleWinLabel1A"
                                                outlined
                                                persistent-hint
                                                return-object
                                                :rules="[homePrjRules.required]">
                                            </v-autocomplete>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            md="12">
                                            <v-text-field
                                                v-model="homePrjDirModel"
                                                :error-messages="homePrjDirErrorMsg"
                                                dense
                                                :hint="i18n.idePrjExampleWinHint1B"
                                                :label="i18n.idePrjExampleWinLabel1B"
                                                :readonly="homePrjReadonly"
                                                outlined
                                                persistent-hint
                                                :rules="[homePrjRules.required]"
                                                @click="getHomePrjFileDirPath('dir')">
                                            </v-text-field>
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
                    color="green"
                    dark
                    small
                    @click="handleHomePrjExampleData('next')">
                    <v-icon left>mdi-check</v-icon>{{ i18n.ideButtonConfirm }}
                </v-btn>
                <v-btn
                    color="red"
                    dark
                    small
                    @click="closeDialog">
                    <v-icon left>mdi-cancel</v-icon>{{ i18n.ideButtonCancel }}
                </v-btn>
            </template>
        </BaseDialog>
    </v-card>
</template>
<script>
    import config from "@client/config/index";
    import view from "@native/utils/view";
    import BaseDialog from "@client/components/base/BaseDialog";

    const webDebug = config.flag.webDebug;
    const vscodeLite = config.code;

    export default {
        name: "PageHomePrj",
        components: {
            BaseDialog
        },
        data: function() {
            return {
                i18n: config.i18n,
                homePrjNewModel: false,
                homePrjButtonItems: [{
                    title: config.i18n.idePrjNew,
                    icon: "mdi-plus-box",
                    func: () => {
                        this.handleHomePrjNewData();
                    }
                }, {
                    title: config.i18n.idePrjOpen,
                    icon: "mdi-folder",
                    func: () => {
                        this.handleHomePrjOpenData();
                    }
                }, {
                    title: config.i18n.idePrjExample,
                    icon: "mdi-file-multiple",
                    func: () => {
                        this.handleHomePrjExampleData()
                    }
                }],
                homePrjNewStepperModel: 1,
                homePrjNewStepperNum: 2,
                homePrjReadonly: webDebug,
                homePrjRules: {
                    required: (val) => {
                        if (typeof val === "object") {
                            val = val.value;
                        }
                        return ((val || "").length > 0) || this.i18n.ideRuleFieldNoEmpty;
                    },
                    prjName: (val) => {
                        const pattern = /^[a-zA-Z0-9_\-]*$/;
                        return pattern.test(val) || this.i18n.ideRuleFieldNameValid;
                    }
                },
                homePrjNameModel: "",
                homePrjDirModel: "",
                homePrjDirFlag: true,
                homePrjDirErrorMsg: "",
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
                homePrjLangItems: ["verilog", "chisel"],
                homePrjLibModel: [],
                homePrjLibDisabled: false,
                homePrjLibItems: ["verilator", "difftest", "nemu"],
                homePrjNewPrevBtn: false,
                homePrjNewNextModel: "",
                homePrjWizardModel: false,
                homePrjOpenModel: false,
                homePrjExampleModel: false,
                homePrjExampleStepperModel: 1,
                homePrjExampleNameModel: "",
                homePrjExampleItems: [{
                    text: "示例A",
                    value: "ExampleA",
                }, {
                    text: "示例B",
                    value: "ExampleB"
                }],
                homePrjExampleDirModel: ""
            }
        },
        watch: {
            homePrjTempModel: function(val) {
                console.log(val);
                if (val.value === "ysyx") {
                    this.homePrjLangModel = "chisel";
                    this.homePrjLibModel = ["verilator", "difftest"];
                    this.homePrjLibDisabled = true;
                }
                else {
                    this.homePrjLangModel = "verilog";
                    this.homePrjLibModel = [];
                    this.homePrjLibDisabled = false;
                }
            },
            homePrjNameModel: function(val) {
                this.getHomePrjFileDirPath("name");
            },
            homePrjDirFlag: function(val) {
                this.homePrjDirErrorMsg = val ? "" : this.i18n.ideRuleFileDirExist;
            }
        },
        mounted: function() {
        },
        methods: {
            handleHomePrjNewData: function(dir) {
                if (dir === "next") {
                    if (this.homePrjNewStepperModel === 1 &&
                       !this.$refs.homePrjNewForm1.validate()) {
                        return;
                    }
                    if (this.homePrjNewStepperModel === 1 &&
                       !this.homePrjDirFlag) {
                        return;
                    }
                    if (this.homePrjNewStepperModel === 2 &&
                       !this.$refs.homePrjNewForm2.validate()) {
                        return;
                    }

                    this.homePrjNewStepperModel++;
                    if (this.homePrjNewStepperModel >
                        this.homePrjNewStepperNum + 1) {
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
                    this.homePrjLibModel = [];
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
                    this.homePrjNewStepperNum + 1) {
                        this.homePrjNewModel = false;
                        this.homePrjWizardModel = true;
                        if (!webDebug) {
                            let path = this.homePrjDirModel + "/" +
                                       this.homePrjNameModel;
                            view.sendViewMsgToExtn(
                                "addExtnProjectDir", {
                                    name: this.homePrjNameModel,
                                    path: path,
                                    temp: this.homePrjTempModel,
                                    lang: this.homePrjLangModel,
                                    libs: this.homePrjLibModel
                                }, (res) => {
                                    if (res) {
                                        setTimeout(() => {
                                            this.homePrjWizardModel = false;
                                        }, 3000);
                                    }
                                },
                                vscodeLite);
                        }
                }
            },
            handleHomePrjOpenData: function() {
                if (!webDebug) {
                    view.sendViewMsgToExtn(
                        "openExtnProjectDir", {
                        }, (res) => {
                        },
                        vscodeLite);
                }
            },
            handleHomePrjExampleData: function(dir) {
                if (dir === "next") {
                    if (this.homePrjNewStepperModel === 1 &&
                       !this.$refs.homePrjExampleForm1.validate()) {
                        return;
                    }

                    this.homePrjExampleModel = false;
                    this.homePrjWizardModel = true;
                    // if (!webDebug) {
                    //     let path = this.homePrjDirModel + "/" +
                    //                this.homePrjNameModel.value;
                    //     view.sendViewMsgToExtn(
                    //         "addExtnProjectDir", {
                    //             path: path
                    //         }, (res) => {
                    //             if (res) {
                    //                 setTimeout(() => {
                    //                     this.homePrjWizardModel = false;
                    //                 }, 3000);
                    //             }
                    //         },
                    //         vscodeLite);
                    // }
                }
                else {
                    this.homePrjExampleStepperModel = 1;
                    this.homePrjNameModel = {};
                    this.homePrjDirModel = "",
                    this.homePrjExampleModel = true;
                    this.$nextTick(() => {
                        this.$refs.homePrjExampleForm1.resetValidation();
                    });
                }
            },
            getHomePrjFileDirPath: function(type) {
                if (!webDebug) {
                    view.sendViewMsgToExtn(
                        "getExtnFileDirPath", {
                            type: type,
                            name: this.homePrjNameModel.value ?
                                  this.homePrjNameModel.value :
                                  this.homePrjNameModel,
                            path: this.homePrjDirModel
                        }, (res) => {
                            this.homePrjDirFlag = res.flag;
                            if (type === "dir") {
                                this.homePrjDirModel = res.path;
                            }
                        },
                        vscodeLite);
                }
            },
            closeDialog: function() {
                this.homePrjNewModel = false;
                this.homePrjOpenModel = false;
                this.homePrjExampleModel = false;
                this.homePrjWizardModel = false;
            }
        }
    }
</script>
