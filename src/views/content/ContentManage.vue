<template>

  <div class="contentContainer">

    <div class="top">

      <el-table :data="passages" empty-text="无数据" border v-loading>

        <el-table-column v-for="(title,index) in contentStore.passageTitles" :label="title" :min-width="200"
                         align="center" :prop="contentStore.passageProperties[index]"
                         sortable show-overflow-tooltip>

        </el-table-column>
        <el-table-column label="操作" :min-width="200" align="center" fixed="right" sortable resizable
                         show-overflow-tooltip>

          <template #default="scope">

            <el-button link>查看</el-button>
            <el-button type="primary" link>编辑</el-button>
            <el-button type="danger" link>删除</el-button>

          </template>

        </el-table-column>

      </el-table>


    </div>
    <div class="bottom">

      <el-pagination
          :current-page="currentPageNum"
          :page-size="10"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalPassageNum"
          @size-change="size=>{totalPageNum = totalPassageNum/size}"
          @current-change=""
          background
      />

    </div>

  </div>


</template>


<script setup lang="ts">


import {ContentStore} from "@/store/content";
import Passage from "@/entity/passage";
import {Ref} from "vue";

const contentStore = ContentStore();
const passages: Ref<Array<Passage>> = ref([]);
const currentPageNum = ref(1);
const totalPageNum = ref(60);
const totalPassageNum = ref(600);


</script>


<style scoped lang="scss">

@import "src/style/system";

.contentContainer {

  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;

  .top {

    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: white;
    margin: 0;
    flex: 1;

    :deep(.el-scrollbar__thumb) {

      @extend .scrollBar;

    }

  }

  .bottom {

    background-color: white;
    display: flex;
    justify-content: flex-end;
    margin: 10px 10px 10px 0;

  }

}

</style>
