<template>
    <v-row>
        <v-col>
            <v-text-field
                v-model="libSearchInfoModel"
                clearable
                dense
                label="请输入库名称"
                outlined
                class="mt-3 mx-4">
                <template #append-outer>
                    <v-btn
                        outlined
                        class="tc-text-field-x"
                        @click="searchLibData">
                        <v-icon left>mdi-book-search</v-icon>搜索
                    </v-btn>
                </template>
            </v-text-field>
            <v-data-table
                dense
                :headers="libManageTableItem.headers"
                :items="libManageTableItem.data"
                :loading="libManageTableLoading"
                :options.sync="libManageTableOpt"
                :server-items-length="libManageTableCount">
                <template #item.actions="{ item }">
                    <v-btn
                        color="blue"
                        small
                        @click.stop="viewLibData(item)">
                        <v-icon left>mdi-view-list</v-icon>浏览
                    </v-btn>
                    <v-btn
                        color="green"
                        small
                        @click.stop="openDialog('edit', item)"
                        class="tc-lib-manage-btn">
                        <v-icon left>mdi-content-save-edit</v-icon>编辑
                    </v-btn>
                    <v-btn
                        color="red"
                        small
                        @click.stop="openDialog('delete', item)"
                        class="tc-lib-manage-btn">
                        <v-icon left>mdi-delete</v-icon>删除
                    </v-btn>
                </template>
                <template #top>
                    <BaseDialog
                        ref="dialogDelete"
                        :dialogShow="libManageDeleteModel"
                        dialogType="confirm"
                        dialogText="确定要删除当前库吗？"
                        @handleDialogYes="deleteLibData"
                        @handleDialogNo="closeDialog('delete')" />
                    <BaseDialog
                        ref="dialogEdit"
                        :dialogShow="libManageEditModel"
                        dialogType="edit"
                        dialogText="库编辑窗口"
                        dialogWidth="500px"
                        @handleDialogYes="editLibData"
                        @handleDialogNo="closeDialog('edit')">
                        <template #body>
                            <v-col
                                cols="6"
                                md="12">
                                <v-select
                                    v-model="libManageItem.libVersion"
                                    dense
                                    hint="更改软件库的版本"
                                    :items="libVersionItems"
                                    label="库版本："
                                    :loading="libVersionLoading"
                                    required
                                    outlined
                                    persistent-hint>
                                </v-select>
                            </v-col>
                            <v-col
                                cols="6"
                                md="12">
                                <v-select
                                    v-model="libManageItem.prjDir"
                                    dense
                                    hint="更改软件库所关联的项目工程"
                                    :items="libPrjDirItems"
                                    label="库工程："
                                    :loading="libPrjDirLoading"
                                    outlined
                                    persistent-hint>
                                 </v-select>
                            </v-col>
                        </template>
                    </BaseDialog>
                    <BaseDialog
                        ref="dialogMsgSuccess"
                        :dialogShow="libManageMsgSuccessModel"
                        dialogType="msg"
                        dialogText="操作成功！"
                        dialogWidth="250px"
                        @handleDialogYes="() => {
                            libManageMsgSuccessModel = false;
                        }"
                        @handleDialogNo="() => {}" />
                    <BaseDialog
                        ref="dialogMsgError"
                        :dialogShow="libManageMsgErrorModel"
                        dialogType="alertError"
                        dialogText="操作失败！"
                        dialogWidth="250px"
                        @handleDialogYes="() => {
                            libManageMsgErrorModel = false;
                        }"
                        @handleDialogNo="() => {}" />
                </template>
            </v-data-table>
        </v-col>
    </v-row>
</template>
<script>
    import BaseDialog from "@client/components/base/BaseDialog";

    export default {
        name: "PageLibManage",
        components: {
            BaseDialog
        },
        data: function() {
            return {
                libSearchInfoModel: "",
                libManageTableItem: {
                    headers: [{
                        text: "库名称",
                        value: "libName",
                        align: "center",
                        sortable: false,
                        width: 250
                    }, {
                        text: "库版本",
                        value: "libVersion",
                        align: "center",
                        sortable: false,
                        width: 250
                    }, {
                        text: "库类型",
                        value: "libType",
                        align: "center",
                        sortable: false,
                        width: 250
                    }, {
                        text: "库工程",
                        value: "prjDir",
                        align: "center",
                        sortable: false,
                        width: 250
                    }, {
                        text: "操作",
                        value: "actions",
                        align: "center",
                        sortable: false
                    }],
                    data: []
                },
                libManageTableLoading: false,
                libManageTableOpt: {},
                libManageTableCount: 0,
                libManageDeleteModel: false,
                libManageMsgSuccessModel: false,
                libManageMsgErrorModel: false,
                libManageEditModel: false,
                libManageItem: {},
                libVersionItems: [],
                libVersionLoading: false,
                libPrjDirItems: [],
                libPrjDirLoading: false
            }
        },
        watch: {
            libManageTableOpt: function() {
                this.searchLibData();
            }
        },
        mounted: function() {
        },
        methods: {
            openDialog: function(type, item) {
                this.libManageItem = item;
                if (type === "delete") {
                    this.libManageDeleteModel = true;
                }
                else if (type === "edit") {
                    this.libManageEditModel = true;
                    this.getLibVersionData();
                    this.getLibPrjDirData();
                }
            },
            closeDialog: function(type) {
                if (type === "delete") {
                    this.libManageDeleteModel = false;
                }
                else if (type === "edit") {
                    this.libManageEditModel = false;
                }
            },
            deleteLibData: function() {
                this.libManageDeleteModel = false;
                this.$store.dispatch("deleteLibManageData", {
                    id: this.libManageItem.id
                }).then((status) => {
                    if (status) {
                        this.libManageMsgSuccessModel = true;
                        this.searchLibData();
                    }
                    else {
                        this.libManageMsgErrorModel = true;
                    }
                });
            },
            editLibData: function() {

            },
            searchLibData: function() {
                let searchKey = "libName";
                let searchVal = this.libSearchInfoModel;
                console.log("searchKey: " + searchKey);
                console.log("searchVal: " + searchVal);

                let that = this;
                this.libManageTableLoading = true;
                this.$store.dispatch("getLibManageData", {
                    searchKey: searchKey,
                    searchVal: searchVal,
                    tableOpt: this.libManageTableOpt
                }).then((status) => {
                    that.libManageTableLoading = false;
                    if (status) {
                        that.libManageTableItem.data =
                            that.$store.state.libManageTableData;
                        that.libManageTableCount =
                            that.$store.state.libManageTableCount;
                    }
                    else {
                        that.libManageTableItem.data = [];
                        that.libManageTableCount = 0;
                    }
                });
            },
            getLibVersionData: function() {
                let that = this;
                this.libVersionLoading = true;
                this.$store.dispatch("getLibVersionData", {
                    libId: this.libManageItem.libId
                }).then((status) => {
                    that.libVersionLoading = false;
                    if (status) {
                        that.libVersionItems =
                            that.$store.state.libVersionItems;
                    }
                    else {
                        that.libVersionItems = [];
                    }
                });
            },
            getLibPrjDirData: function() {
                let that = this;
                this.libPrjDirLoading = true;
                this.$store.dispatch("getPrjDirData", {
                }).then((status) => {
                    that.libPrjDirLoading = false;
                    if (status) {
                        that.libPrjDirItems =
                            that.$store.state.libPrjDirItems;
                    }
                    else {
                        that.libPrjDirItems = [];
                    }
                });
            },
            viewLibData: function(item) {
            }
        }
    }
</script>
<style scoped>
    .tc-lib-manage-btn {
        margin-left: 5px;
    }
</style>
