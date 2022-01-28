<template>
  <div>
    <AddPromotionForm></AddPromotionForm>
    <AddPromotionJson></AddPromotionJson>
    <DialogWebForm></DialogWebForm>
    <GetPromotion></GetPromotion>
    <IdCards></IdCards>
    <GetTable></GetTable>
  </div>
</template>

<script>
import AddPromotionForm from '../components/tools2/AddPromotionForm'
import AddPromotionJson from '../components/tools2/AddPromotionJson'
import DialogWebForm from '../components/tools2/DialogWebForm'
import GetPromotion from '../components/tools2/GetPromotion'
import IdCards from '../components/tools2/IdCards'
import GetTable from '../components/tools2/GetTable'
// import axios from 'axios'
export default {
  components: {
    AddPromotionForm,
    AddPromotionJson,
    DialogWebForm,
    GetPromotion,
    IdCards,
    GetTable
  }
}
</script>
