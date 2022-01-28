<template>
  <div>
    <sms-code></sms-code>
    <date-count></date-count>
    <customer-info></customer-info>
    <save-url></save-url>
    <open-page></open-page>
    <custo-mock></custo-mock>
  </div>
</template>

<script>
import CustomerInfo from '../components/tools1/CustomerInfo'
import DateCount from '../components/tools1/DateCount'
import SaveUrl from '../components/tools1/SaveUrl'
import OpenPage from '../components/tools1/OpenPage'
import CustoMock from '../components/tools1/CustomMock'
// import axios from 'axios'
export default {
  components: {
    DateCount,
    CustomerInfo,
    SaveUrl,
    OpenPage,
    CustoMock
  }
}
</script>
