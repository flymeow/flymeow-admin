<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style lang="scss">
::-webkit-scrollbar-track {
  border-radius: 9px;
  background-color: #fff;
}

::-webkit-scrollbar {
  width: 12px;
  background-color: #fff;
}

::-webkit-scrollbar-thumb {
  background: rgba(200, 200, 200, 0.9);
  border-radius: 9px;
}
#app {
  .el-date-editor .el-range-separator {
    width: 6%;
  }
  .el-table {
    border: 1px solid rgba(231, 231, 231, 1);
    border-bottom: 0;
    tr.el-table__row--striped td {
      background-color: rgba(22, 99, 254, 0.05);
    }
    td div {
      color: #333;
    }
    thead {
      tr {
        th {
          background-color: #f5f6f9;
          color: #333;
        }
      }
    }
  }
}
.bgImg {
  background-repeat: no-repeat;
  background-position: top;
  background-size: cover;
  transition: background-image 0.5s ease-out;
  min-height: 600px;
  // @include base-background-image();
}
.home-index {
  flex-direction: column;
  background: #fff;
  height: 100%;
  border: 1px solid rgba(204, 211, 220, 0.3);
  padding: 24px;
}
.table-pannel {
  padding: 24px;
  border: 1px solid rgba(204, 211, 220, 0.3);
  border-radius: 3px;
}
</style>
