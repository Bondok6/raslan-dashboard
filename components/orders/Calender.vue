<template>
  <div class="popup">
    <div class="popup__inner">
      <div class="popup__exit">
        <button
          @click="$emit('update:calenderTrigger')"
          type="button"
          class="exit-icon"
        >
          &times;
        </button>
      </div>
      <el-calendar v-model="dateInput" class="calender"> </el-calendar>

      <!-- <el-form class="p-5">
        <el-form-item>
          <label class="d-block">اختر الحالة</label>
          <el-select v-model="caseInput" placeholder="اختر الحالة">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <label>مكان الحجز</label>
          <el-input v-model="input"></el-input>
        </el-form-item>

        <el-form-item label=" ">
          <label class="d-block">اختر الفترة الزمنية</label>
          <el-time-select
            placeholder="من"
            v-model="startTime"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30',
            }"
          >
          </el-time-select>
          <el-time-select
            placeholder="الى"
            v-model="endTime"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30',
              minTime: startTime,
            }"
          >
          </el-time-select>
        </el-form-item>
      </el-form> -->

      <button class="secondary-btn w-50 mb-2 me-4">تأكيد</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["calenderTrigger"],
  emits: ["update:calenderTrigger"],
  data() {
    return {
      dateInput: new Date(),
      options: [
        {
          value: "Option1",
          label: "Option1",
        },
        {
          value: "Option2",
          label: "Option2",
        },
        {
          value: "Option3",
          label: "Option3",
        },
        {
          value: "Option4",
          label: "Option4",
        },
        {
          value: "Option5",
          label: "Option5",
        },
      ],
      caseInput: "",
      startTime: "",
      endTime: "",
    };
  },
};
</script>
