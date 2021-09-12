<template>
    <v-row>
        <v-col>
            <v-data-table
                dense
                :headers="libSearchTableItem.headers"
                :items="libSearchTableItem.data"
                :loading="libSearchTableLoading"
                :options.sync="libSearchTableOpt"
                :server-items-length="libSearchTableCount">
                <!-- <template
                    #item.libName="{ item }">
                    <a @click="jumpToLibDetailPage(item)">{{ item.libName }}</a>
                </template>
                <template #item.libRatingStr="{ item }">
                    <v-chip :color="getLibRatingColor(item.libRatingStr)">
                        {{ item.libRatingStr }}
                    </v-chip>
                </template> -->
            </v-data-table>
        </v-col>
    </v-row>
</template>
<script>
    export default {
        name: "PageLibManage",
        data: function() {
            return {
                libSearchInfoModel: "",
                libSearchTypeItems: [{
                    text: "名称",
                    value: "name"
                }, {
                    text: "作者",
                    value: "author"
                }],
                libSearchTypeModel: {
                    text: "名称",
                    value: "name"
                },
                libSearchTableItem: {
                    headers: [{
                        text: "名称",
                        value: "libName",
                        align: "center",
                        sortable: false
                    }, {
                        text: "作者",
                        value: "userName",
                        align: "center",
                        sortable: false
                    }, {
                        text: "类型",
                        value: "libType",
                        align: "center",
                        sortable: false
                    }, {
                        text: "下载",
                        value: "libDownloadNum",
                        align: "center",
                        sortable: false
                    }, {
                        text: "评价",
                        value: "libRatingStr",
                        align: "center",
                        sortable: false
                    }],
                    data: []
                },
                libSearchTableLoading: true,
                libSearchTableOpt: {},
                libSearchTableCount: 0,
            }
        }
    }
</script>
<style scoped>

</style>
