<template>
  <div>
    <el-dialog
      title="物流详情"
      :visible.sync="logisticsVisible "
      width="50%"
      :before-close="closeDel"
      center
    >
      <div class="logistics-info">
        <div class="receiver">
          <div class="receiver-left">收货信息</div>
          <div class="receiver-right">
            <p>收货人：{{logisticsMessage.receiver}}</p>
            <p>收货人电话：{{logisticsMessage.receiverMobilephone}}</p>
            <p>收货人地址：{{logisticsMessage.receivedArea |clearUnderline}}{{logisticsMessage.address}}</p>
          </div>
        </div>
        <div class="logistics">
          <div class="logistics-left">配送信息</div>
          <div class="logistics-right">
            <p>物流公司：{{deliver.logisticsCompany | setString(35)}}</p>
            <p>物流单号：{{deliver.logisticsCode}}</p>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="submitDel()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'logistics-info',
    props:{
      logisticsVisible:{
        type:Boolean,
        default:false
      },
      logisticsMessage:{
        type:Object,
        default:()=>{}
      },
      deliver:{
        type:Object,
        default:()=>{}
      }
    },
    data(){
      return{
        logisticsCompany:'德邦物流',
        add:'201908186765'
      }
    },
    methods:{
      closeDel(){
        this.$emit('closeLogistics')
      },
      submitDel(){
        this.$emit('submitLogistics')
      }
    }
  }
</script>

<style lang="less" scoped>
.logistics-info{
  border: 1px solid #d2d2d2;
  .receiver{
    display: flex;
    border-bottom:1px solid #d2d2d2 ;
    .receiver-left{
      align-self: center;
      margin-left: 5px;
    }
    .receiver-right{
      align-self: center;
      margin-left: 10px;
      border-left:1px solid #d2d2d2 ;
      p{
        line-height: 36px;
        text-indent: 8px;
      }
    }
  }
  .logistics{
    display: flex;

    .logistics-left{
      align-self: center;
      margin-left: 5px;
    }
    .logistics-right{
      align-self: center;
      margin-left: 10px;
      border-left:1px solid #d2d2d2 ;

      p{
        line-height: 36px;
        text-indent: 8px;
      }

    }
  }
}
</style>
