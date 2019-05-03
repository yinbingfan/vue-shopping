<template>
  <div class="shop-order">
    <div class="shop-order-middle">
      <div
        class="order-middle-address"
        v-for="(item,key) in addressList"
        :key="key"
      >
        <div class="order-address-setting">
          <el-button size="small" type="text" v-if="item.isdef===1">默认地址</el-button>
          <el-button size="small" type="text" v-else @click="setDefAddress(item)">设为默认地址</el-button>
          <el-button size="small" type="text" @click="editUAddress(item)">修改</el-button>
          <el-button size="small" type="text" @click="delAddress(item)">删除</el-button>
        </div>
        <div class="name">{{item.receiver}}</div>
        <div class="phone">{{item.receiverMobilephone}}</div>
        <div class="province">{{item.receivedArea|clearUnderline}}</div>
        <div class="street">{{item.address|setString(80)}}
        </div>
      </div>
      <div class="addAddress" @click="addAddress">
        <add-address @refreshAddress="refreshAddress"/>
      </div>
    </div>
    <del-address
      :deleteAddress="deleteAddress"
      :addressInfo="addressInfo"
      @closeDel="closeDel"
      @submitDel="submitDel"
    />
    <edit-address
      :addressInfo="addressInfo"
      :editAddress="editAddress"
      @closeEdit="closeEdit"
      @submitEdit="submitEdit"
    />
    <set-default
      :setAddress="setAddress"
      :addressInfo="addressInfo"
      @submitSet="submitSet"
      @closeSet="closeSet"
    />
  </div>
</template>

<script>
  import addAddress from '../../shopCar/add-address.vue'
  import delAddress from './del-address'
  import editAddress from './edit-address'
  import setDefault from './set-default'

  export default {
    name: 'recipient-address',
    components: {
      addAddress,
      delAddress,
      editAddress,
      setDefault
    },
    props: {
      addressList: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        address: '科技路西口临界商铺11111号',
        province: '陕西省西安市雁塔区鱼化寨街道办',
        addAddressVisible: false,
        deleteAddress: false,
        editAddress: false,
        setAddress: false,
        addressInfo: {}
      }
    },
    methods: {
      editUAddress(item) {
        let str = item.receivedArea.split(/_/)
        item.province = str[0]
        item.city = str[1]
        item.area = str[2]
        this.editAddress = true
        this.addressInfo = item
      },
      submitEdit(param) {
        this.editAddress = false
        this.modifyAddressList(param)
      },
      async modifyAddressList(param) {
        param={
           agentCode: JSON.parse(this.$cookie.get('userInfo')).id,
          ...param
        }
        let del = await this.$store.dispatch('FETCH_MODIFY_ADDRESS', {
          param:param
        })
        if (del.code === 200) {
          this.$message({
            message: '地址修改成功',
            type: 'success'
          })
          this.$emit('refreshModifyAddress', del.code)
        } else {
          this.$message({
            message: '网络链接错误，请重试',
            type: 'error'
          })
        }
      },
      setDefAddress(item) {
        this.setAddress = true
        this.addressInfo = item
      },
      closeSet() {
        this.setAddress = false
      },
      submitSet(id) {
        this.setAddress = false
        this.setAddressList(id)
      },
      async setAddressList(id) {
        let set = await this.$store.dispatch('FETCH_SET_ADDRESS', {
          agentCode: JSON.parse(this.$cookie.get('userInfo')).id,
          id: id
        })
        if (set.code === 200) {
          this.$message({
            message: '设置成功',
            type: 'success'
          })
          this.$emit('refreshSetAddress', set.code)
        } else {
          this.$message({
            message:set.message,
            type: 'error'
          })
        }
      },
      closeEdit() {
        this.editAddress = false
      },
      delAddress(item) {
        this.deleteAddress = true
        this.addressInfo = item
      },
      submitDel(id) {
        this.deleteAddress = false
        this.delAddressList(id)
      },
      async delAddressList(id) {
        let del = await this.$store.dispatch('FETCH_DEL_ADDRESS', {
          agentCode: JSON.parse(this.$cookie.get('userInfo')).id,
          id: id
        })
        if (del.code === 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.$emit('refreshDelAddress', del.code)
        } else {
          this.$message({
            message:del.message,
            type: 'error'
          })
        }
      },

      closeDel() {
        this.deleteAddress = false
      },
      addAddress() {
        this.addAddressVisible = true
      },
      closeAdd() {
        this.addAddressVisible = false
      },
      submitAdd() {
        this.addAddressVisible = true
      },
      refreshAddress(code) {
        this.$emit('refreshAddressList', code)
      }
    }
  }
</script>

<style lang="less" scoped>
  .shop-order {
    .shop-order-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #6f7180;
      font-size: 14px;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #d2d2d2;

      .address {
        color: #3a8ee6;
      }
    }

    .shop-order-middle {
      display: flex;
      flex-flow: wrap;
      margin-bottom: 20px;

      .activeAddress {
        border: 1px dashed #f42424 !important;
      }

      .order-middle-address {
        width: 280px;
        height: 200px;
        border: 1px dashed #d2d2d2;
        font-size: 14px;
        padding: 20px;
        color: #6f7180;
        position: relative;
        margin: 0px 20px 20px 0;

        .order-address-setting {
          display: flex;
          justify-content: flex-end;
        }

        .name {
          line-height: 35px;
        }

        .phone {
          line-height: 35px;
        }

        .province {
          line-height: 35px;
        }

        .street {
          width: 250px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .check {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 20px;
          height: 20px;

          i {
            color: #f42424;
            font-size: 20px;
          }
        }

      }

      .addAddress {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column;
        width: 280px;
        height: 200px;
        border: 1px dashed #d2d2d2;
        font-size: 14px;
        padding: 20px;
        color: #6f7180;
        cursor: pointer;
      }
    }
  }
</style>
