<template>
  <div class="subject">
    <section class="subject_top">
      <ul class="ul_input">
        <li class="li_input">
          <p class="div_p">区 域：</p>
          <div class="div_input">
            <el-cascader
              size="mini"
              clearable
              :options="regionDate"
              v-model="regionModel"
              :props="regionProps"
              change-on-select>>
            </el-cascader>
          </div>
        </li>
        <li class="li_input">
          <p class="div_p">设备类型：</p>
          <div class="div_input">
            <el-cascader
              size="mini"
              clearable
              change-on-select
              v-model="equipmentDate"
              :options="equipment"
              :props="equipmentProps"
            ></el-cascader>
          </div>
        </li>
        <li class="li_input">
          <p class="div_p">审核状态：</p>
          <div class="div_inputTwo">
            <el-select size="small" v-model="Auditstatus" multiple placeholder="" :disabled="true">
              <el-option
                v-for="item in AuditstatusDate"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </li>
      </ul>
      <div class="button">
        <!--查询-->
        <div @click.stop="query" class="query">
          查 询
        </div>
        <div @click.stop="query" class="query">
          导出Excel
        </div>
      </div>
    </section>
  </div>
</template>
<script>
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/file"
</style>
