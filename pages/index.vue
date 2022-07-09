<template>
  <div>
    <div class="page-wrapper">
      <div class="container">
        <!-- Page title -->
        <div class="page-header d-print-none">
          <div class="row g-2 align-items-center">
            <div class="col">
              <!-- Page pre-title -->
              <div class="page-pretitle">Overview</div>
              <h2 class="page-title">Simple Additive Weighting</h2>
            </div>
            <!-- Page title actions -->
            <div class="col-12 col-md-auto ms-auto d-print-none">
              <div class="btn-list">
                <a
                  href="https://github.com/ashtav/simple_additive_weighting.git"
                  class="btn"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i class="ti ti-brand-github me-2"></i>
                  Source code
                </a>

                <button class="btn btn-primary d-none d-sm-inline-block">
                  <i class="ti ti-upload me-2"></i>
                  Save Result
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="alert">
          <div class="d-flex">
            <div class="me-2">
              <i class="ti ti-info-circle"></i>
            </div>
            <div>
              Silahkan inputkan nilai dari setiap karyawan di bawah ini
              berdasarkan kriteria yang telah ditentukan.
            </div>
          </div>
        </div>

        <!-- FORMS -->
        <div class="row">
          <div class="col-md-6 col-lg-4">
            <div class="card card-stacked">
              <div class="card-header">
                <div>
                  <h3 class="card-title mb-0" v-text="current.name"></h3>
                  <p
                    class="text-muted card-subtitle"
                    v-text="current.position"
                  ></p>
                </div>
                <div class="card-actions text-muted me-2">
                  <span v-text="emp_selected + 1"></span> /
                  <span v-text="employees.length"></span>
                </div>
              </div>
              <div class="card-body">
                <div class="mb-3" v-for="(d, i) in criteria" :key="i">
                  <div class="form-label" v-text="d.name"></div>
                  <div>
                    <label
                      class="form-check form-check-inline"
                      v-for="(o, j) in options"
                      :key="j"
                    >
                      <input
                        class="form-check-input"
                        type="radio"
                        :value="o.value"
                        :name="`option_${i}`"
                        v-model="current.values[i]"
                      />
                      <span class="form-check-label" v-text="o.name"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div class="card-footer">
                <div class="d-flex">
                  <button
                    type="button"
                    class="btn btn-outline-primary ms-auto"
                    @click="_next"
                  >
                    Next <i class="ti ti-chevron-right ms-2 mt-1"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-8 col-lg-5">
            <div class="card">
              <div class="card-body">
                <div v-if="show_chart">
                  Karyawan terbaik jatuh pada karyawan atas nama
                  <b>{{ best_employee?.name }}</b> dengan nilai
                  <b>{{ best_employee?.value?.toFixed(2) }}</b>
                </div>
                <div v-else>
                  Hasil akan ditampilkan dalam bentuk diagram setelah penilaian
                  selesai dilakukan.
                </div>

                <div
                  class="my-5"
                  v-if="show_chart"
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  <client-only>
                    <apexchart
                      width="380"
                      type="donut"
                      :options="chart.options"
                      :series="chart.series"
                    ></apexchart>
                  </client-only>
                </div>
              </div>
            </div>

            <div class="card mt-3">
              <div class="card-header">
                <h3 class="card-title">Details</h3>

              </div>
              <div class="card-body p-0">
                <div class="list-group list-group-flush list-group-hoverable p-0">
                  <div
                    class="list-group-item"
                    v-for="(d, i) in all_result"
                    :key="i"
                  >
                    <div class="row align-items-center">
                      <div class="col-auto">
                        <span class="avatar"> <i class="ti ti-user"></i> </span>
                      </div>
                      <div class="col text-truncate">
                        <b class="text-reset d-block" v-text="d.name"></b>
                      </div>
                      <div class="col-auto">
                        <b v-text="d.value?.toFixed(2)"></b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer footer-transparent d-print-none">
      <div class="container-xl">
        <div class="row text-center align-items-center flex-row-reverse">
          <div class="col-lg-auto ms-lg-auto">
            <ul class="list-inline list-inline-dots mb-0">
              <li class="list-inline-item">
                <a
                  href="https://github.com/ashtav"
                  class="link-primary text-primary"
                  >by Ashta</a
                >
              </li>
            </ul>
          </div>
          <div class="col-12 col-lg-auto mt-3 mt-lg-0">
            <ul class="list-inline list-inline-dots mb-0">
              <li class="list-inline-item">
                Template by
                <a href="https://preview.tabler.io/" class="link-primary"
                  >Tabler</a
                >. &copy; 2022, All rights reserved.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  //   components: {
  //     [process.browser && "apexchart"]: () => import("vue-apexcharts"),
  //   },
  data() {
    return {
      chart: {
        series: [0, 0, 0, 0, 0, 0],
        options: {
          labels: [
            "Disiplin",
            "Kebersihan",
            "Kejujuran",
            "Komunikasi",
            "Kerjasama",
            "Tanggung Jawab",
          ],
          grid: {
            strokeDashArray: 4,
          },
          colors: [
            "#206bc4",
            "#4263eb",
            "#d63939",
            "#f59f00",
            "#0ca678",
            "#17a2b8",
          ],
          legend: {
            show: true,
            position: "bottom",
            offsetY: 12,
            markers: {
              width: 10,
              height: 10,
              radius: 100,
            },
            itemMargin: {
              horizontal: 8,
              vertical: 8,
            },
          },
          tooltip: {
            fillSeriesColor: false,
            y: {
              formatter: function (val) {
                return "";
              },
              title: {
                formatter: function (seriesName, opts) {
                  return seriesName;
                },
              },
            },
          },
          fill: {
            opacity: 1,
          },
          chart: {
            type: "donut",
            fontFamily: "inherit",
            height: 240,
            sparkline: {
              //   enabled: true,
            },
            animations: {
              enabled: true,
            },
          },
        },
      },

      criteria: [
        { name: "Disiplin", value: 0 },
        { name: "Kebersihan", value: 0 },
        { name: "Kejujuran", value: 0 },
        { name: "Komunikasi", value: 0 },
        { name: "Kerjasama", value: 0 },
        { name: "Tanggung Jawab", value: 0 },
      ],

      options: [
        { name: "Sangat Rendah", value: 1 },
        { name: "Rendah", value: 2 },
        { name: "Cukup", value: 3 },
        { name: "Tinggi", value: 4 },
        { name: "Sangat Tinggi", value: 5 },
      ],

      employees: [
        {
          name: "Yohanes Aditia Merta M",
          position: "FrontEnd Developer",
          values: [0, 0, 0, 0, 0, 0],
        },
        {
          name: "Gusti Ida Adiyoga",
          position: "Manager",
          values: [0, 0, 0, 0, 0, 0],
        },
        {
          name: "Agus Gunawan",
          position: "FrontEnd Developer",
          values: [0, 0, 0, 0, 0, 0],
        },
      ],

      current: { name: "", position: "", values: [0, 0, 0, 0, 0, 0] },
      emp_selected: 0,

      best_employee: null,
      all_result: [],
      show_chart: false,
    };
  },

  methods: {
    _next() {
      if (this.emp_selected >= this.employees.length - 1) {
        // calculate score
        const criteria = [
          { label: "Disiplin", value: 20 },
          { label: "Kebersihan", value: 15 },
          { label: "Kejujuran", value: 15 },
          { label: "Komunikasi", value: 10 },
          { label: "Kerjasama", value: 20 },
          { label: "Tanggung Jawab", value: 20 },
        ];

        let data = {
          criteria: criteria,
          employees: this.employees,
        };

        let calculate = this.$simple_additive_weighting(data, true);
        this.best_employee = calculate.top;

        this.best_employee = calculate.details[0];
        this.chart.series = calculate.details[0].criteria;
        this.all_result = calculate.details;
        this.show_chart = true;
      } else {
        let values = this.current.values;

        // check if all values are filled
        if (values.filter((v) => v === 0).length > 0) {
          alert("Please fill all values");
          return;
        }

        this.employees[this.emp_selected].values = this.current.values;

        this.emp_selected++;
        this.current = this.employees[this.emp_selected];
      }
    },
  },

  mounted() {
    this.current = this.employees[0];
  },
};
</script>

<style lang="scss" scoped>
</style>