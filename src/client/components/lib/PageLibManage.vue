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
                :loading="libManageTableLoading">
                <!-- :options.sync="libManageTableOpt"
                :server-items-length="libManageTableCount"> -->
                <template #item.actions="{ item }">
                    <v-btn
                        color="blue"
                        small
                        @click="viewLibData(item)">
                        <v-icon left>mdi-view-list</v-icon>浏览
                    </v-btn>
                    <v-btn
                        color="green"
                        small
                        @click="editLibData(item)"
                        class="tc-lib-manage-btn">
                        <v-icon left>mdi-content-save-edit</v-icon>编辑
                    </v-btn>
                    <v-btn
                        color="red"
                        small
                        @click="openDialogDelete(item)"
                        class="tc-lib-manage-btn">
                        <v-icon left>mdi-delete</v-icon>删除
                    </v-btn>
                </template>
                <template #top>
                    <BaseDialog
                        :dialogShow="libManageDeleteModel"
                         dialogType="alertError"
                         dialogText="确定要删除当前库吗？"
                         @handleDialogNo="closeDialogDelete" />
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
                        text: "库作者",
                        value: "userName",
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
                        value: "prjName",
                        align: "center",
                        sortable: false,
                        width: 250
                    }, {
                        text: "操作",
                        value: "actions",
                        align: "center",
                        sortable: false
                    }],
                    data: [{
                        libName: "111",
                        userName: "张三",
                        libType: "基础模块",
                        prjName: "测试工程111"
                    }, {
                        libName: "222",
                        userName: "李四",
                        libType: "外设模块",
                        prjName: "测试工程222"
                    }]
                },
                libManageTableLoading: false,
                // libManageTableOpt: {},
                // libManageTableCount: 0,
                libManageDeleteModel: false
            }
        },
        methods: {
            openDialogDelete: function(item) {
                this.libManageDeleteModel = true;
            },
            closeDialogDelete: function() {
                this.libManageDeleteModel = false;
            },





            deleteLibData: function(item) {
            },
            editLibData: function(item) {

            },
            searchLibData: function() {

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
